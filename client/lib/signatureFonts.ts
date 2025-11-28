// Definiciones de fuentes para firmas digitales
export interface SignatureFont {
    id: string;
    name: string;
    family: string;
    className: string;
    category: 'serif' | 'sans-serif' | 'monospace' | 'cursive' | 'decorative' | 'web';
}

export const SIGNATURE_FONTS: SignatureFont[] = [
    // Fuentes Serif
    { id: 'times', name: 'Times New Roman', family: "'Times New Roman', Times, serif", className: 'signature-font-times', category: 'serif' },
    { id: 'georgia', name: 'Georgia', family: 'Georgia, serif', className: 'signature-font-georgia', category: 'serif' },
    { id: 'garamond', name: 'Garamond', family: "Garamond, 'EB Garamond', serif", className: 'signature-font-garamond', category: 'serif' },
    { id: 'palatino', name: 'Palatino', family: "'Palatino Linotype', 'Book Antiqua', Palatino, serif", className: 'signature-font-palatino', category: 'serif' },
    { id: 'bookman', name: 'Bookman', family: "'Bookman Old Style', serif", className: 'signature-font-bookman', category: 'serif' },
    { id: 'baskerville', name: 'Baskerville', family: "Baskerville, 'Baskerville Old Face', serif", className: 'signature-font-baskerville', category: 'serif' },
    { id: 'bodoni', name: 'Bodoni', family: "'Bodoni MT', Didot, 'Didot LT STD', serif", className: 'signature-font-bodoni', category: 'serif' },
    { id: 'cambria', name: 'Cambria', family: 'Cambria, serif', className: 'signature-font-cambria', category: 'serif' },

    // Fuentes Sans-Serif
    { id: 'arial', name: 'Arial', family: 'Arial, Helvetica, sans-serif', className: 'signature-font-arial', category: 'sans-serif' },
    { id: 'helvetica', name: 'Helvetica', family: 'Helvetica, Arial, sans-serif', className: 'signature-font-helvetica', category: 'sans-serif' },
    { id: 'verdana', name: 'Verdana', family: 'Verdana, Geneva, sans-serif', className: 'signature-font-verdana', category: 'sans-serif' },
    { id: 'tahoma', name: 'Tahoma', family: 'Tahoma, Geneva, sans-serif', className: 'signature-font-tahoma', category: 'sans-serif' },
    { id: 'trebuchet', name: 'Trebuchet MS', family: "'Trebuchet MS', Helvetica, sans-serif", className: 'signature-font-trebuchet', category: 'sans-serif' },
    { id: 'calibri', name: 'Calibri', family: 'Calibri, Candara, Segoe, sans-serif', className: 'signature-font-calibri', category: 'sans-serif' },
    { id: 'franklin', name: 'Franklin Gothic', family: "'Franklin Gothic Medium', Arial, sans-serif", className: 'signature-font-franklin', category: 'sans-serif' },
    { id: 'century', name: 'Century Gothic', family: "'Century Gothic', CenturyGothic, sans-serif", className: 'signature-font-century', category: 'sans-serif' },

    // Fuentes Monospace
    { id: 'courier', name: 'Courier New', family: "'Courier New', Courier, monospace", className: 'signature-font-courier', category: 'monospace' },
    { id: 'consolas', name: 'Consolas', family: 'Consolas, monaco, monospace', className: 'signature-font-consolas', category: 'monospace' },
    { id: 'monaco', name: 'Monaco', family: 'Monaco, Consolas, monospace', className: 'signature-font-monaco', category: 'monospace' },
    { id: 'lucida-console', name: 'Lucida Console', family: "'Lucida Console', Monaco, monospace", className: 'signature-font-lucida-console', category: 'monospace' },

    // Fuentes Cursivas/Script
    { id: 'brush-script', name: 'Brush Script MT', family: "'Brush Script MT', cursive", className: 'signature-font-brush-script', category: 'cursive' },
    { id: 'lucida-handwriting', name: 'Lucida Handwriting', family: "'Lucida Handwriting', 'Apple Chancery', cursive", className: 'signature-font-lucida-handwriting', category: 'cursive' },
    { id: 'edwardian', name: 'Edwardian Script', family: "'Edwardian Script ITC', cursive", className: 'signature-font-edwardian', category: 'cursive' },
    { id: 'freestyle', name: 'Freestyle Script', family: "'Freestyle Script', cursive", className: 'signature-font-freestyle', category: 'cursive' },
    { id: 'french-script', name: 'French Script MT', family: "'French Script MT', cursive", className: 'signature-font-french-script', category: 'cursive' },
    { id: 'vivaldi', name: 'Vivaldi', family: 'Vivaldi, cursive', className: 'signature-font-vivaldi', category: 'cursive' },
    { id: 'kunstler', name: 'Kunstler Script', family: "'Kunstler Script', cursive", className: 'signature-font-kunstler', category: 'cursive' },
    { id: 'mistral', name: 'Mistral', family: 'Mistral, cursive', className: 'signature-font-mistral', category: 'cursive' },

    // Fuentes Decorativas
    { id: 'impact', name: 'Impact', family: 'Impact, Charcoal, sans-serif', className: 'signature-font-impact', category: 'decorative' },
    { id: 'comic-sans', name: 'Comic Sans MS', family: "'Comic Sans MS', cursive, sans-serif", className: 'signature-font-comic-sans', category: 'decorative' },
    { id: 'papyrus', name: 'Papyrus', family: 'Papyrus, fantasy', className: 'signature-font-papyrus', category: 'decorative' },
    { id: 'copperplate', name: 'Copperplate', family: "Copperplate, 'Copperplate Gothic Light', fantasy", className: 'signature-font-copperplate', category: 'decorative' },
    { id: 'stencil', name: 'Stencil', family: 'Stencil, fantasy', className: 'signature-font-stencil', category: 'decorative' },
    { id: 'chiller', name: 'Chiller', family: 'Chiller, fantasy', className: 'signature-font-chiller', category: 'decorative' },

    // Fuentes Web (Google Fonts)
    { id: 'roboto', name: 'Roboto', family: "'Roboto', sans-serif", className: 'signature-font-roboto', category: 'web' },
    { id: 'open-sans', name: 'Open Sans', family: "'Open Sans', sans-serif", className: 'signature-font-open-sans', category: 'web' },
    { id: 'lato', name: 'Lato', family: "'Lato', sans-serif", className: 'signature-font-lato', category: 'web' },
    { id: 'montserrat', name: 'Montserrat', family: "'Montserrat', sans-serif", className: 'signature-font-montserrat', category: 'web' },
    { id: 'raleway', name: 'Raleway', family: "'Raleway', sans-serif", className: 'signature-font-raleway', category: 'web' },
    { id: 'poppins', name: 'Poppins', family: "'Poppins', sans-serif", className: 'signature-font-poppins', category: 'web' },
    { id: 'playfair', name: 'Playfair Display', family: "'Playfair Display', serif", className: 'signature-font-playfair', category: 'web' },
    { id: 'merriweather', name: 'Merriweather', family: "'Merriweather', serif", className: 'signature-font-merriweather', category: 'web' },
    { id: 'dancing-script', name: 'Dancing Script', family: "'Dancing Script', cursive", className: 'signature-font-dancing-script', category: 'web' },
    { id: 'pacifico', name: 'Pacifico', family: "'Pacifico', cursive", className: 'signature-font-pacifico', category: 'web' },
    { id: 'great-vibes', name: 'Great Vibes', family: "'Great Vibes', cursive", className: 'signature-font-great-vibes', category: 'web' },
    { id: 'sacramento', name: 'Sacramento', family: "'Sacramento', cursive", className: 'signature-font-sacramento', category: 'web' },
    { id: 'allura', name: 'Allura', family: "'Allura', cursive", className: 'signature-font-allura', category: 'web' },
    { id: 'tangerine', name: 'Tangerine', family: "'Tangerine', cursive", className: 'signature-font-tangerine', category: 'web' },
];

// Función para parsear firma con estilo
export function parseSignature(firmaData: string): {
    type: 'canvas' | 'text';
    name: string;
    fontId?: string;
    fontSize?: number;
    fontStyle?: string;
} {
    if (firmaData.startsWith('FIRMA_TEXTO:')) {
        const parts = firmaData.split('|');
        const name = parts[0].replace('FIRMA_TEXTO:', '');

        let fontId = 'arial'; // Default
        let fontSize = 24; // Default
        let fontStyle = 'normal'; // Default

        parts.forEach(part => {
            if (part.startsWith('FONT:')) {
                fontId = part.replace('FONT:', '');
            } else if (part.startsWith('SIZE:')) {
                fontSize = parseInt(part.replace('SIZE:', ''));
            } else if (part.startsWith('STYLE:')) {
                fontStyle = part.replace('STYLE:', '');
            }
        });

        return { type: 'text', name, fontId, fontSize, fontStyle };
    }

    return { type: 'canvas', name: '' };
}

// Función para crear firma - SOLO NOMBRE
export function createSignature(name: string, fontId: string, fontSize: number = 24, fontStyle: string = 'normal'): string {
    // Solo guardamos el nombre, sin font ni tamaño
    return `FIRMA_TEXTO:${name}`;
}

// Obtener fuente por ID
export function getFontById(id: string): SignatureFont | undefined {
    return SIGNATURE_FONTS.find(f => f.id === id);
}
