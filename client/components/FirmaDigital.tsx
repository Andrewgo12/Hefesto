import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Check, Type } from 'lucide-react';
import { validarCredencial, CREDENCIALES } from '@/lib/credenciales';
import { SIGNATURE_FONTS, parseSignature, createSignature, getFontById } from '@/lib/signatureFonts';
import '@/styles/signature-fonts.css';

interface FirmaDigitalProps {
  cargo: string;
  credencialRequerida?: string;
  onFirmaCompleta: (firma: string, usuario: string) => void;
  firmaActual?: string;
  trigger?: React.ReactNode;
  nombrePorDefecto?: string;
}

export default function FirmaDigital({ cargo, credencialRequerida, onFirmaCompleta, firmaActual, trigger, nombrePorDefecto }: FirmaDigitalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState(nombrePorDefecto || '');
  const [credencial, setCredencial] = useState('');
  const [error, setError] = useState('');
  const [selectedFontId, setSelectedFontId] = useState('brush-script');
  const [fontSize, setFontSize] = useState(24);

  // Cargar preferencia de fuente desde localStorage
  useEffect(() => {
    const savedFont = localStorage.getItem('hefesto_signature_font');
    if (savedFont) {
      setSelectedFontId(savedFont);
    }
  }, []);

  // Actualizar nombre cuando cambie nombrePorDefecto o se abra el modal
  useEffect(() => {
    if (nombrePorDefecto) {
      setUsuario(nombrePorDefecto);
    }
  }, [nombrePorDefecto]);

  // Cuando se abre el modal, usar el nombre por defecto
  useEffect(() => {
    if (isOpen && nombrePorDefecto && !usuario) {
      setUsuario(nombrePorDefecto);
    }
  }, [isOpen, nombrePorDefecto]);

  const handleGuardarFirma = async () => {
    // Validar credencial si es requerida
    if (credencialRequerida) {
      console.log('🔐 Validando credencial:', {
        cargo: credencialRequerida,
        credencialIngresada: credencial,
        credencialEsperada: CREDENCIALES[credencialRequerida]?.clave
      });
      // Usar validación local en lugar de API para evitar problemas de sesión
      if (!validarCredencial(credencialRequerida, credencial)) {
        setError(`Credencial incorrecta para: ${credencialRequerida}`);
        return;
      }
    }

    if (!usuario.trim()) {
      setError('Debe ingresar su nombre');
      return;
    }

    // Crear firma de texto con estilo
    const firmaData = createSignature(usuario, selectedFontId, fontSize);
    // Guardar preferencia de fuente
    localStorage.setItem('hefesto_signature_font', selectedFontId);

    onFirmaCompleta(firmaData, usuario);
    setIsOpen(false);
    limpiarFormulario();
  };

  const limpiarFormulario = () => {
    setUsuario(nombrePorDefecto || '');
    setCredencial('');
    setError('');
  };

  // Renderizar firma actual - SOLO NOMBRE
  const renderFirmaActual = () => {
    if (!firmaActual) return null;

    const parsedSignature = parseSignature(firmaActual);

    if (parsedSignature.type === 'text') {
      return (
        <div className="text-center text-blue-800 font-semibold">
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
