import { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil, Trash2, Check } from 'lucide-react';

interface FirmaDigitalProps {
  cargo: string;
  credencialRequerida?: string;
  onFirmaCompleta: (firma: string, usuario: string) => void;
  firmaActual?: string;
}

export default function FirmaDigital({ cargo, credencialRequerida, onFirmaCompleta, firmaActual }: FirmaDigitalProps) {
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [credencial, setCredencial] = useState('');
  const [error, setError] = useState('');
  const [modoFirma, setModoFirma] = useState<'canvas' | 'texto'>('canvas');

  // Credenciales estáticas por cargo (en producción vendrían del backend)
  const credencialesValidas: Record<string, string> = {
    'Jefe inmediato': 'JEFE2024',
    'Jefe de Talento Humano': 'TALENTO2024',
    'Jefe de Gestión de la Información': 'GESTION2024',
    'Coordinador de Facturación o Subgerente Financiero': 'FINANZAS2024',
    'Capacitador de historia clínica': 'CAPACITAHC2024',
    'Capacitador de epidemiología': 'CAPACITAEPI2024',
    'Aval institucional': 'AVAL2024',
  };

  const handleGuardarFirma = () => {
    // Validar credencial si es requerida
    if (credencialRequerida) {
      const credencialCorrecta = credencialesValidas[credencialRequerida];
      if (credencial !== credencialCorrecta) {
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
      // Firma de texto simple
      firmaData = `FIRMA_TEXTO:${usuario}`;
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

  return (
    <>
      {firmaActual ? (
        <div className="relative border border-green-300 bg-green-50 p-2 rounded">
          {firmaActual.startsWith('FIRMA_TEXTO:') ? (
            <div className="text-center font-signature text-lg text-green-800">
              {firmaActual.replace('FIRMA_TEXTO:', '')}
            </div>
          ) : (
            <img src={firmaActual} alt="Firma" className="h-12 mx-auto" />
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute top-1 right-1"
            onClick={() => {
              onFirmaCompleta('', '');
              setIsOpen(true);
            }}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(true)}
          className="w-full"
        >
          <Pencil className="w-3 h-3 mr-1" />
          Firmar
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Firma Digital - {cargo}</DialogTitle>
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
                Dibujar Firma
              </Button>
              <Button
                type="button"
                size="sm"
                variant={modoFirma === 'texto' ? 'default' : 'outline'}
                onClick={() => setModoFirma('texto')}
                className="flex-1"
              >
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
              <div className="text-center p-4 border border-slate-300 rounded bg-slate-50">
                <p className="text-sm text-slate-600 mb-2">Vista previa:</p>
                <p className="font-signature text-2xl text-slate-900">
                  {usuario || 'Su nombre aparecerá aquí'}
                </p>
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
