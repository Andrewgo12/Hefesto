import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Registro from "./pages/Registro";
import Control from "./pages/Control";
import Configuracion from "./pages/Configuracion";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />

          {/* Registro routes */}
          <Route path="/registro" element={<Navigate to="/registro/administrativo" replace />} />
          <Route path="/registro/:view" element={<Registro />} />

          {/* Control routes */}
          <Route path="/control" element={<Navigate to="/control/aprobacion" replace />} />
          <Route path="/control/:view" element={<Control />} />

          {/* Configuración routes */}
          <Route path="/configuracion" element={<Navigate to="/configuracion/roles" replace />} />
          <Route path="/configuracion/:view" element={<Configuracion />} />

          {/* Perfil routes */}
          <Route path="/perfil" element={<Navigate to="/perfil/personal" replace />} />
          <Route path="/perfil/:view" element={<Perfil />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
