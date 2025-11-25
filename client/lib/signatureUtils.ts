import { parseSignature } from './signatureFonts';

/**
 * Extrae solo el nombre de una firma digital
 * @param firmaData - Datos de la firma en formato "FIRMA_TEXTO:nombre|FONT:id|SIZE:num|STYLE:style" o base64
 * @returns Solo el nombre de la persona que firmó
 */
export function extractSignatureName(firmaData: string | undefined | null): string {
    if (!firmaData) return '';

    // Si es una firma de texto
    if (firmaData.startsWith('FIRMA_TEXTO:')) {
        const parsed = parseSignature(firmaData);
        return parsed.name;
    }

    // Si es una firma canvas (base64), retornar vacío o un placeholder
    return '';
}
