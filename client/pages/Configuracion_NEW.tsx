import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * NOTA: Este componente redirige a Movimientos
 * Configuracion.tsx anterior estaba corrupto y fue reemplazado
 */
export default function Configuracion() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/configuracion/movimientos', { replace: true });
  }, [navigate]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-slate-600">Redirigiendo...</p>
    </div>
  );
}
