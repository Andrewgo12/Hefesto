import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import RegistroAdministrativo from "./pages/RegistroAdministrativo";
import RegistroHistoriaClinica from "./pages/RegistroHistoriaClinica";
import ControlAprobacion from "./pages/ControlAprobacion";
import Control from "./pages/Control";
import Llaves from "./pages/Llaves";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Layout from "@/components/Layout";
// ProtectedRoute removed - using role checks within components instead

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Ruta pública de login */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas con Layout persistente */}
            <Route
              path="/"
              element={
                (() => {
                  // Verificar autenticación
                  const token = localStorage.getItem('auth_token');
                  const user = localStorage.getItem('user');

                  // Si no hay token ni usuario, redirigir a login
                  if (!token && !user) {
                    return <Navigate to="/login" replace />;
                  }

                  return (
                    <Layout>
                      <Outlet />
                    </Layout>
                  );
                })()
              }
            >
              <Route index element={<Index />} />

              {/* Registro y Seguimiento */}
              <Route path="registro" element={<Registro />} />
              <Route path="registro/administrativo" element={<RegistroAdministrativo />} />
              <Route path="registro/historia-clinica" element={<RegistroHistoriaClinica />} />

              {/* Control - Accessible to all users */}
              <Route
                path="control/aprobacion"
                element={<ControlAprobacion />}
              />
              <Route
                path="control/:view"
                element={<Control />}
              />

              {/* Configuración */}
              <Route path="configuracion/llaves" element={<Llaves />} />

              {/* Perfil routes */}
              <Route path="perfil" element={<Navigate to="/perfil/personal" replace />} />
              <Route path="perfil/:view" element={<Perfil />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
// Force rebuild for routing check
