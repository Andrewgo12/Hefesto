import { useRef, useState, useEffect } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Check, Type } from 'lucide-react';
import { validarCredencial } from '@/lib/credenciales';
import { SIGNATURE_FONTS, parseSignature, createSignature, getFontById } from '@/lib/signatureFonts';
import '@/styles/signature-fonts.css';

interface FirmaDigitalProps {
  cargo: string;
  credencialRequerida?: string;
  onFirmaCompleta: (firma: string, usuario: string) => void;
  firmaActual?: string;
  trigger?: React.ReactNode;
}

export default function FirmaDigital({ cargo, credencialRequerida, onFirmaCompleta, firmaActual, trigger }: FirmaDigitalProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [credencial, setCredencial] = useState('');
  const [error, setError] = useState('');
  const [modoFirma, setModoFirma] = useState<'canvas' | 'texto'>('canvas');
  const [selectedFontId, setSelectedFontId] = useState('brush-script');
  const [fontSize, setFontSize] = useState(24);

  // Cargar preferencia de fuente desde localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem('hefesto_signature_font');
    if (savedFont) {
      setSelectedFontId(savedFont);
    }
  }, []);

  const handleGuardarFirma = async () => {
    // Validar credencial si es requerida
    if (credencialRequerida) {
      try {
        // Usar la API para validar la credencial dinámicamente
        const { auth } = await import('@/lib/api');
        await auth.verificarCredencialFirma({
          cargo: credencialRequerida,
          credencial
        });
      } catch (error) {
        console.error('Error validando credencial:', error);
        setError('Credencial incorrecta');
        return;
      }
    }

    if (!usuario.trim()) {
      setError('Debe ingresar su nombre');
      return;
    }

    let firmaData = '';
    if (modoFirma === 'canvas') {
      if (sigCanvas.current?.isEmpty()) {
        setError('Debe firmar en el recuadro');
        return;
      }
      firmaData = sigCanvas.current?.toDataURL() || '';
    } else {
      if (!usuario.trim()) {
        setError('Debe ingresar su nombre para firma de texto');
        return;
      }
      // Crear firma de texto con estilo
      firmaData = createSignature(usuario, selectedFontId, fontSize);
      // Guardar preferencia de fuente
      localStorage.setItem('hefesto_signature_font', selectedFontId);
    }

    onFirmaCompleta(firmaData, usuario);
    setIsOpen(false);
    limpiarFormulario();
  };

  const limpiarFirma = () => {
    sigCanvas.current?.clear();
  };

  const limpiarFormulario = () => {
    setUsuario('');
    setCredencial('');
    setError('');
    limpiarFirma();
  };

  // Renderizar firma actual con estilo
  const renderFirmaActual = () => {
    if (!firmaActual) return null;

    const parsedSignature = parseSignature(firmaActual);

    if (parsedSignature.type === 'text') {
      const font = getFontById(parsedSignature.fontId || 'arial');
      return (
        <div
          className="text-center text-blue-800"
          style={{
            fontFamily: font?.family || 'Arial',
            fontSize: `${parsedSignature.fontSize || 24}px`,
            fontStyle: parsedSignature.fontStyle || 'normal'
          }}
        >
          {parsedSignature.name}
        </div>
      );
    }

    return <img src={firmaActual} alt="Firma" className="h-16 mx-auto" />;
  };

  // Obtener fuente seleccionada
  const selectedFont = getFontById(selectedFontId);

  return (
    <>
      {firmaActual ? (
        <div className="relative border-2 border-blue-300 bg-blue-50 p-3 rounded-lg">
          {renderFirmaActual()}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1 hover:bg-red-100 hover:text-red-600"
            onClick={() => {
              onFirmaCompleta('', '');
              setIsOpen(true);
            }}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        trigger ? (
          <div onClick={() => setIsOpen(true)}>{trigger}</div>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(true)}
            className="w-full border-2 border-blue-300 text-blue-700 hover:bg-blue-50 hover:border-blue-400"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Firmar
          </Button>
        )
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Firma Digital - {cargo}</DialogTitle>
            <DialogDescription>
              Complete los campos y firme para autorizar esta solicitud
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Modo de firma */}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={modoFirma === 'canvas' ? 'default' : 'outline'}
                onClick={() => setModoFirma('canvas')}
                className="flex-1"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Dibujar Firma
              </Button>
              <Button
                type="button"
                size="sm"
                variant={modoFirma === 'texto' ? 'default' : 'outline'}
                onClick={() => setModoFirma('texto')}
                className="flex-1"
              >
                <Type className="w-4 h-4 mr-2" />
                Firma de Texto
              </Button>
            </div>

            {/* Canvas de firma o texto */}
            {modoFirma === 'canvas' ? (
              <div className="border border-slate-300 rounded bg-white">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    className: 'w-full h-40',
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={limpiarFirma}
                  className="w-full"
                >
                  <Trash2 className="w-3 h-3 mr-1" />
                  Limpiar
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Selector de fuente */}
                <div>
                  <Label htmlFor="font-select">Estilo de Firma</Label>
                  <Select value={selectedFontId} onValueChange={setSelectedFontId}>
                    <SelectTrigger id="font-select" className="mt-1">
                      <SelectValue placeholder="Seleccione un estilo" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {SIGNATURE_FONTS.map((font) => (
                        <SelectItem key={font.id} value={font.id}>
                          <span style={{ fontFamily: font.family }}>
                            {font.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tamaño de fuente */}
                <div>
                  <Label htmlFor="font-size">Tamaño</Label>
                  <Select value={fontSize.toString()} onValueChange={(v) => setFontSize(parseInt(v))}>
                    <SelectTrigger id="font-size" className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="18">Pequeño (18px)</SelectItem>
                      <SelectItem value="24">Mediano (24px)</SelectItem>
                      <SelectItem value="32">Grande (32px)</SelectItem>
                      <SelectItem value="40">Extra Grande (40px)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Vista previa */}
                <div className="text-center p-6 border-2 border-blue-200 rounded-lg bg-gradient-to-br from-blue-50 to-slate-50">
                  <p className="text-xs text-slate-500 mb-3">Vista previa de su firma:</p>
                  <div
                    className="text-blue-900"
                    style={{
                      fontFamily: selectedFont?.family || 'Arial',
                      fontSize: `${fontSize}px`,
                    }}
                  >
                    {usuario || 'Su nombre aparecerá aquí'}
                  </div>
                </div>
              </div>
            )}

            {/* Usuario */}
            <div>
              <Label htmlFor="usuario">Nombre completo</Label>
              <Input
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Ingrese su nombre completo"
                className="mt-1"
              />
            </div>

            {/* Credencial si es requerida */}
            {credencialRequerida && (
              <div>
                <Label htmlFor="credencial">Credencial de autorización</Label>
                <Input
                  id="credencial"
                  type="password"
                  value={credencial}
                  onChange={(e) => {
                    setCredencial(e.target.value);
                    setError('');
                  }}
                  placeholder="Ingrese su credencial"
                  className="mt-1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Credencial asignada para: {credencialRequerida}
                </p>
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                limpiarFormulario();
              }}
            >
              Cancelar
            </Button>
            <Button type="button" onClick={handleGuardarFirma}>
              <Check className="w-4 h-4 mr-1" />
              Confirmar Firma
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
