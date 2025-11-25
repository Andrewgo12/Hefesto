import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { tokens } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { Key, Plus, Trash2, Copy, Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface Token {
    id: number;
    name: string;
    abilities: string[];
    last_used_at: string | null;
    created_at: string;
}

const SCOPES = [
    { id: "read", label: "Lectura", description: "Permite leer datos" },
    { id: "write", label: "Escritura", description: "Permite crear y modificar datos" },
    { id: "admin", label: "Administración", description: "Acceso total al sistema" },
];

export default function ApiKeysTab() {
    const [activeTokens, setActiveTokens] = useState<Token[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [newTokenName, setNewTokenName] = useState("");
    const [selectedScopes, setSelectedScopes] = useState<string[]>(["read"]);
    const [generatedToken, setGeneratedToken] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchTokens();
    }, []);

    const fetchTokens = async () => {
        try {
            setLoading(true);
            const response = await tokens.listar();
            setActiveTokens(response.data);
        } catch (error) {
            console.error("Error fetching tokens:", error);
            toast({
                title: "Error",
                description: "No se pudieron cargar los tokens activos",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCreateToken = async () => {
        if (!newTokenName.trim()) {
            toast({
                title: "Nombre requerido",
                description: "Por favor ingrese un nombre para el token",
                variant: "destructive",
            });
            return;
        }

        if (selectedScopes.length === 0) {
            toast({
                title: "Permisos requeridos",
                description: "Seleccione al menos un permiso",
                variant: "destructive",
            });
            return;
        }

        try {
            const response = await tokens.crear({
                name: newTokenName,
                abilities: selectedScopes,
            });

            setGeneratedToken(response.data.accessToken);
            fetchTokens();
            toast({
                title: "Token Generado",
                description: "El token se ha creado exitosamente",
            });
        } catch (error) {
            console.error("Error creating token:", error);
            toast({
                title: "Error",
                description: "No se pudo crear el token",
                variant: "destructive",
            });
        }
    };

    const handleRevokeToken = async (id: number) => {
        if (!confirm("¿Está seguro de revocar este token? Esta acción no se puede deshacer y las aplicaciones que lo usen dejarán de funcionar.")) {
            return;
        }

        try {
            await tokens.revocar(id);
            setActiveTokens(prev => prev.filter(t => t.id !== id));
            toast({
                title: "Token Revocado",
                description: "El token ha sido eliminado correctamente",
            });
        } catch (error) {
            console.error("Error revoking token:", error);
            toast({
                title: "Error",
                description: "No se pudo revocar el token",
                variant: "destructive",
            });
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast({
            title: "Copiado",
            description: "Token copiado al portapapeles",
        });
    };

    const toggleScope = (scopeId: string) => {
        setSelectedScopes(prev =>
            prev.includes(scopeId)
                ? prev.filter(s => s !== scopeId)
                : [...prev, scopeId]
        );
    };

    const closeCreateModal = () => {
        setIsCreateModalOpen(false);
        setNewTokenName("");
        setSelectedScopes(["read"]);
        setGeneratedToken(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-medium text-slate-900">Tokens de Acceso Personal</h3>
                    <p className="text-sm text-slate-500">Gestione las llaves de API para integraciones externas</p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Generar Nuevo Token
                </Button>
            </div>

            {/* Lista de Tokens */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Permisos (Scopes)</TableHead>
                                <TableHead>Último Uso</TableHead>
                                <TableHead>Creado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        Cargando tokens...
                                    </TableCell>
                                </TableRow>
                            ) : activeTokens.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                                        No hay tokens activos. Genere uno para comenzar.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                activeTokens.map((token) => (
                                    <TableRow key={token.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Key className="w-4 h-4 text-slate-400" />
                                                {token.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-1 flex-wrap">
                                                {token.abilities.map((ability) => (
                                                    <Badge key={ability} variant="secondary" className="text-xs">
                                                        {ability}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {token.last_used_at
                                                ? new Date(token.last_used_at).toLocaleDateString()
                                                : "Nunca"}
                                        </TableCell>
                                        <TableCell>
                                            {new Date(token.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRevokeToken(token.id)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Modal de Creación */}
            <Dialog open={isCreateModalOpen} onOpenChange={closeCreateModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Generar Nuevo Token API</DialogTitle>
                        <DialogDescription>
                            Cree un token para acceder a la API de Hefesto desde aplicaciones externas.
                        </DialogDescription>
                    </DialogHeader>

                    {!generatedToken ? (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nombre del Token</Label>
                                <Input
                                    id="name"
                                    placeholder="Ej: Integración Facturación"
                                    value={newTokenName}
                                    onChange={(e) => setNewTokenName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <Label>Niveles de Seguridad (Scopes)</Label>
                                <div className="space-y-2 border rounded-lg p-3 bg-slate-50">
                                    {SCOPES.map((scope) => (
                                        <div key={scope.id} className="flex items-start space-x-3 p-2 hover:bg-white rounded transition-colors">
                                            <Checkbox
                                                id={scope.id}
                                                checked={selectedScopes.includes(scope.id)}
                                                onCheckedChange={() => toggleScope(scope.id)}
                                            />
                                            <div className="grid gap-1.5 leading-none">
                                                <label
                                                    htmlFor={scope.id}
                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                                >
                                                    {scope.label}
                                                </label>
                                                <p className="text-xs text-slate-500">
                                                    {scope.description}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 py-4">
                            <Alert className="bg-green-50 border-green-200">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <AlertTitle className="text-green-800">Token Generado Exitosamente</AlertTitle>
                                <AlertDescription className="text-green-700">
                                    Copie este token ahora. Por seguridad, no podrá verlo nuevamente.
                                </AlertDescription>
                            </Alert>

                            <div className="relative">
                                <div className="p-4 bg-slate-900 rounded-lg font-mono text-sm text-green-400 break-all border border-slate-700">
                                    {generatedToken}
                                </div>
                                <Button
                                    size="sm"
                                    className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 text-slate-200"
                                    onClick={() => copyToClipboard(generatedToken)}
                                >
                                    <Copy className="w-3 h-3 mr-1" />
                                    Copiar
                                </Button>
                            </div>

                            <div className="flex items-center gap-2 text-amber-600 text-sm bg-amber-50 p-3 rounded border border-amber-100">
                                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                                <p>Guarde este token en un lugar seguro.</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        {!generatedToken ? (
                            <>
                                <Button variant="outline" onClick={closeCreateModal}>Cancelar</Button>
                                <Button onClick={handleCreateToken}>Generar Token</Button>
                            </>
                        ) : (
                            <Button onClick={closeCreateModal} className="w-full">Entendido, cerrar</Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
