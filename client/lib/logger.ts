/**
 * Logger inteligente para desarrollo
 * Solo muestra notificaciones en modo desarrollo
 * En producción, los logs se silencian automáticamente
 */

const isDev = import.meta.env.DEV;

interface LogOptions {
    showToast?: boolean;
    persist?: boolean;
}

export const logger = {
    /**
     * Log informativo (azul)
     */
    info: (message: string, data?: any, options?: LogOptions) => {
        if (isDev) {
            console.log(`ℹ️ ${message}`, data || '');
        }
    },

    /**
     * Log de éxito (verde)
     */
    success: (message: string, data?: any) => {
        if (isDev) {
            console.log(`✅ ${message}`, data || '');
        }
    },

    /**
     * Log de advertencia (amarillo)
     */
    warn: (message: string, data?: any) => {
        if (isDev) {
            console.warn(`⚠️ ${message}`, data || '');
        }
    },

    /**
     * Log de error (rojo) - siempre se muestra
     */
    error: (message: string, error?: any) => {
        console.error(`❌ ${message}`, error || '');
    },

    /**
     * Log de depuración con datos estructurados
     */
    debug: (context: string, data: Record<string, any>) => {
        if (isDev) {
            console.group(`🔍 ${context}`);
            Object.entries(data).forEach(([key, value]) => {
                console.log(`  ${key}:`, value);
            });
            console.groupEnd();
        }
    },

    /**
     * Log de carga de datos
     */
    loading: (message: string) => {
        if (isDev) {
            console.log(`🔄 ${message}`);
        }
    },

    /**
     * Log de datos recibidos
     */
    data: (message: string, data: any) => {
        if (isDev) {
            console.log(`📦 ${message}`, data);
        }
    },

    /**
     * Log de guardado
     */
    save: (message: string, payload?: any) => {
        if (isDev) {
            console.log(`💾 ${message}`, payload || '');
        }
    },

    /**
     * Log de renderizado
     */
    render: (component: string, props?: any) => {
        if (isDev) {
            console.log(`📊 Renderizando ${component}`, props || '');
        }
    },

    /**
     * Log de procesamiento
     */
    process: (message: string, data?: any) => {
        if (isDev) {
            console.log(`⚙️ ${message}`, data || '');
        }
    }
};

export default logger;
