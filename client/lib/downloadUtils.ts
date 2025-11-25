/**
 * Utilidades centralizadas para descarga de archivos con sistema de respaldo
 * Implementa reintentos automáticos, fallbacks y manejo robusto de errores
 */

import axios from 'axios';
import { toast } from './toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface DownloadOptions {
    maxRetries?: number;
    retryDelay?: number;
    timeout?: number;
    onProgress?: (progress: number) => void;
    fallbackFormats?: ('csv' | 'json' | 'pdf')[];
}

interface DownloadResult {
    success: boolean;
    format: string;
    error?: string;
}

/**
 * Espera un tiempo determinado (para reintentos con exponential backoff)
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Descarga un archivo usando axios con reintentos automáticos
 */
async function downloadWithAxios(
    url: string,
    fileName: string,
    options: DownloadOptions = {}
): Promise<boolean> {
    const { timeout = 30000, onProgress } = options;

    try {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get(url, {
            responseType: 'blob',
            timeout,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            onDownloadProgress: (progressEvent) => {
                if (onProgress && progressEvent.total) {
                    const progress = (progressEvent.loaded / progressEvent.total) * 100;
                    onProgress(progress);
                }
            },
        });

        // Crear enlace de descarga
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        return true;
    } catch (error: any) {
        console.error('Error en downloadWithAxios:', error);
        if (error.response) {
            console.error('Detalles del error de backend:', {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers
            });
            toast.error(`Error del servidor: ${error.response.status}`, 'No se pudo generar el archivo');
        } else if (error.request) {
            console.error('No se recibió respuesta del servidor');
            toast.error('Error de conexión', 'El servidor no responde');
        } else {
            console.error('Error de configuración:', error.message);
        }
        throw error;
    }
}

/**
 * Descarga un archivo usando fetch API (método alternativo)
 */
async function downloadWithFetch(
    url: string,
    fileName: string,
    options: DownloadOptions = {}
): Promise<boolean> {
    const { timeout = 30000, onProgress } = options;

    try {
        const token = localStorage.getItem('auth_token');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Leer el stream con progreso
        const reader = response.body?.getReader();
        const contentLength = +(response.headers.get('Content-Length') ?? 0);

        if (!reader) {
            throw new Error('No se pudo obtener el reader del response');
        }

        let receivedLength = 0;
        const chunks: Uint8Array[] = [];

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            chunks.push(value);
            receivedLength += value.length;

            if (onProgress && contentLength) {
                onProgress((receivedLength / contentLength) * 100);
            }
        }

        // Combinar chunks
        const blob = new Blob(chunks as BlobPart[]);
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);

        return true;
    } catch (error) {
        console.error('Error en downloadWithFetch:', error);
        throw error;
    }
}

/**
 * Descarga con reintentos automáticos y exponential backoff
 */
export async function downloadWithRetries(
    url: string,
    fileName: string,
    options: DownloadOptions = {}
): Promise<DownloadResult> {
    const {
        maxRetries = 3,
        retryDelay = 1000,
        fallbackFormats = ['csv', 'json'],
    } = options;

    let lastError: Error | null = null;

    // Intento 1: Axios (método principal)
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`🔄 Intento ${attempt}/${maxRetries} con axios...`);
            await downloadWithAxios(url, fileName, options);
            console.log('✅ Descarga exitosa con axios');
            return { success: true, format: 'excel' };
        } catch (error) {
            lastError = error as Error;
            console.warn(`⚠️ Intento ${attempt} falló:`, error);

            if (attempt < maxRetries) {
                const delay = retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
                console.log(`⏳ Esperando ${delay}ms antes del siguiente intento...`);
                await sleep(delay);
            }
        }
    }

    // Intento 2: Fetch API (método alternativo)
    console.log('🔄 Intentando con fetch API...');
    try {
        await downloadWithFetch(url, fileName, options);
        console.log('✅ Descarga exitosa con fetch');
        toast.warning('Descarga completada', 'Se usó un método alternativo');
        return { success: true, format: 'excel' };
    } catch (error) {
        console.warn('⚠️ Fetch también falló:', error);
        lastError = error as Error;
    }

    // Intento 3: Formatos alternativos (CSV, JSON)
    for (const format of fallbackFormats) {
        try {
            console.log(`🔄 Intentando descargar como ${format.toUpperCase()}...`);
            const fallbackUrl = url.replace('/exportar/', `/exportar/${format}/`);
            const fallbackFileName = fileName.replace('.xlsx', `.${format}`);

            await downloadWithAxios(fallbackUrl, fallbackFileName, options);
            console.log(`✅ Descarga exitosa como ${format.toUpperCase()}`);
            toast.warning(
                'Formato alternativo',
                `El archivo se descargó como ${format.toUpperCase()} debido a problemas con Excel`
            );
            return { success: true, format };
        } catch (error) {
            console.warn(`⚠️ Descarga como ${format} falló:`, error);
        }
    }

    // Todos los métodos fallaron
    console.error('❌ Todos los métodos de descarga fallaron');
    return {
        success: false,
        format: 'none',
        error: lastError?.message || 'Error desconocido en la descarga',
    };
}

/**
 * Descarga solicitud administrativa con todos los respaldos
 */
export async function descargarSolicitudAdministrativa(
    id: number,
    options: DownloadOptions = {}
): Promise<DownloadResult> {
    const url = `${API_URL}/exportar/administrativa/${id}`;
    const fileName = `Solicitud_Administrativa_${id}_${Date.now()}.xlsx`;

    toast.info('Descargando...', 'Preparando archivo para descarga');

    const result = await downloadWithRetries(url, fileName, options);

    if (result.success) {
        toast.success('Descarga completada', `Archivo guardado como ${fileName}`);
    } else {
        toast.error('Error en descarga', result.error || 'No se pudo descargar el archivo');
    }

    return result;
}

/**
 * Descarga solicitud de historia clínica con todos los respaldos
 */
export async function descargarSolicitudHistoriaClinica(
    id: number,
    options: DownloadOptions = {}
): Promise<DownloadResult> {
    const url = `${API_URL}/exportar/historia-clinica/${id}`;
    const fileName = `Solicitud_HistoriaClinica_${id}_${Date.now()}.xlsx`;

    toast.info('Descargando...', 'Preparando archivo para descarga');

    const result = await downloadWithRetries(url, fileName, options);

    if (result.success) {
        toast.success('Descarga completada', `Archivo guardado como ${fileName}`);
    } else {
        toast.error('Error en descarga', result.error || 'No se pudo descargar el archivo');
    }

    return result;
}

/**
 * Descarga genérica según tipo
 */
export async function descargarSolicitud(
    tipo: 'Administrativo' | 'Historia Clínica',
    id: number,
    options: DownloadOptions = {}
): Promise<DownloadResult> {
    if (tipo === 'Administrativo') {
        return descargarSolicitudAdministrativa(id, options);
    } else {
        return descargarSolicitudHistoriaClinica(id, options);
    }
}

/**
 * Verifica si hay una descarga en caché disponible
 */
export async function verificarCache(tipo: string, id: number): Promise<boolean> {
    try {
        const response = await axios.get(`${API_URL}/exportar/cache/check`, {
            params: { tipo, id },
        });
        return response.data.cached === true;
    } catch {
        return false;
    }
}
