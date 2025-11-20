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
import Control from "./pages/Control";
import ControlAprobacion from "./pages/ControlAprobacion";
import Movimientos from "./pages/Movimientos";
import Perfil from "./pages/Perfil";
import NotFound from "./pages/NotFound";
import Layout from "@/components/Layout";
import GestionCredencialesFirmas from "./pages/GestionCredencialesFirmas";
import Configuracion from "./pages/Configuracion";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <Routes>
            {/* Ruta pública de login */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas con Layout persistente */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Outlet />
                  </Layout>
                </ProtectedRoute>
              }
            >
              <Route index element={<Index />} />

              {/* Registro y Seguimiento */}
              <Route path="registro" element={<Registro />} />
              <Route path="registro/administrativo" element={<RegistroAdministrativo />} />
              <Route path="registro/historia-clinica" element={<RegistroHistoriaClinica />} />

              {/* Control - Solo Administradores */}
              <Route
                path="control/aprobacion"
                element={
                  <ProtectedRoute requireAdmin>
                    <ControlAprobacion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="control/:view"
                element={
                  <ProtectedRoute requireAdmin>
                    <Control />
                  </ProtectedRoute>
                }
              />

              {/* Configuración - Solo Administradores */}
              <Route
                path="configuracion"
                element={
                  <ProtectedRoute requireAdmin>
                    <Configuracion />
                  </ProtectedRoute>
                }
              />
              <Route
                path="configuracion/movimientos"
                element={
                  <ProtectedRoute requireAdmin>
                    <Movimientos />
                  </ProtectedRoute>
                }
              />
              <Route
                path="configuracion/credenciales-firmas"
                element={
                  <ProtectedRoute requireAdmin>
                    <GestionCredencialesFirmas />
                  </ProtectedRoute>
                }
              />
              <Route
                path="configuracion/*"
                element={
                  <ProtectedRoute requireAdmin>
                    <Movimientos />
                  </ProtectedRoute>
                }
              />

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
