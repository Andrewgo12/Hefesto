import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RegistroAdministrativo from "./pages/RegistroAdministrativo";
import RegistroHistoriaClinica from "./pages/RegistroHistoriaClinica";
import Control from "./pages/Control";
import ControlAprobacion from "./pages/ControlAprobacion";
import Configuracion from "./pages/Configuracion";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

// Componente para proteger rutas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('auth_token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Ruta pública de login */}
          <Route path="/login" element={<Login />} />

          {/* Rutas protegidas */}
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />

          {/* Formularios compactos estilo Excel */}
          <Route path="/registro/administrativo" element={<ProtectedRoute><RegistroAdministrativo /></ProtectedRoute>} />
          <Route path="/registro/historia-clinica" element={<ProtectedRoute><RegistroHistoriaClinica /></ProtectedRoute>} />

          {/* Registro routes */}
          <Route path="/registro" element={<Navigate to="/registro/administrativo" replace />} />
          <Route path="/registro/:view" element={<ProtectedRoute><Registro /></ProtectedRoute>} />

          {/* Control routes */}
          <Route path="/control" element={<Navigate to="/control/aprobacion" replace />} />
          <Route path="/control/aprobacion" element={<ProtectedRoute><ControlAprobacion /></ProtectedRoute>} />
          <Route path="/control/:view" element={<ProtectedRoute><Control /></ProtectedRoute>} />

          {/* Configuración routes */}
          <Route path="/configuracion" element={<Navigate to="/configuracion/roles" replace />} />
          <Route path="/configuracion/:view" element={<ProtectedRoute><Configuracion /></ProtectedRoute>} />

          {/* Perfil routes */}
          <Route path="/perfil" element={<Navigate to="/perfil/personal" replace />} />
          <Route path="/perfil/:view" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
