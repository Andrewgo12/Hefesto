import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="p-6 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">404</h1>
          <p className="text-lg text-slate-700 mb-2">Página no encontrada</p>
          <p className="text-sm text-slate-600 mb-6">
            La ruta <code className="bg-slate-100 px-2 py-1 rounded text-slate-800">{location.pathname}</code> no existe en el sistema.
          </p>
          <Link to="/">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Volver al Inicio
            </Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
};

export default NotFound;
