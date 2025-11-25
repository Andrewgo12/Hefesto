import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/lib/toast";

interface ModalUsuarioProps {
    isOpen: boolean;
    onClose: () => void;
    userToEdit?: any; // Replace with proper User type
}

export default function ModalUsuario({ isOpen, onClose, userToEdit }: ModalUsuarioProps) {
    const { agregarUsuario, actualizarUsuario } = useApp();
    const [formData, setFormData] = useState({
        nombre: "",
        username: "",
        email: "",
        rol: "Usuario",
        estado: "Activo" as "Activo" | "Inactivo"
    });

    useEffect(() => {
        if (userToEdit) {
            setFormData({
                nombre: userToEdit.nombre,
                username: userToEdit.username,
                email: userToEdit.email,
                rol: userToEdit.rol,
                estado: userToEdit.estado
            });
        } else {
            setFormData({
                nombre: "",
                username: "",
                email: "",
                rol: "Usuario",
                estado: "Activo"
            });
        }
    }, [userToEdit, isOpen]);

    const handleSubmit = async () => {
        if (!formData.nombre || !formData.username || !formData.email) {
            toast.error("Error", "Todos los campos son obligatorios");
            return;
        }

        try {
            if (userToEdit) {
                await actualizarUsuario(userToEdit.id, formData);
                toast.success("Usuario actualizado", "Los datos del usuario han sido guardados.");
            } else {
                await agregarUsuario(formData);
                toast.success("Usuario creado", "El nuevo usuario ha sido registrado.");
            }
            onClose();
        } catch (error) {
            toast.error("Error", "No se pudo guardar el usuario.");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{userToEdit ? "Editar Usuario" : "Nuevo Usuario"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="nombre">Nombre Completo</Label>
                        <Input
                            id="nombre"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="Juan Pérez"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Nombre de Usuario</Label>
                        <Input
                            id="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            placeholder="jperez"
                            disabled={!!userToEdit} // Username usually immutable
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="juan.perez@hospital.local"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="rol">Rol</Label>
                            <Select
                                value={formData.rol}
                                onValueChange={(val) => setFormData({ ...formData, rol: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar rol" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Administrador">Administrador</SelectItem>
                                    <SelectItem value="Supervisor">Supervisor</SelectItem>
                                    <SelectItem value="Usuario">Usuario</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="estado">Estado</Label>
                            <Select
                                value={formData.estado}
                                onValueChange={(val: "Activo" | "Inactivo") => setFormData({ ...formData, estado: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activo">Activo</SelectItem>
                                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancelar</Button>
                    <Button onClick={handleSubmit}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
