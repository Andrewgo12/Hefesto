import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    HiSearch,
    HiUserAdd,
    HiFilter,
    HiDotsVertical,
    HiPencil,
    HiTrash,
    HiKey,
    HiChevronLeft,
    HiChevronRight
} from "react-icons/hi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "@/contexts/AppContext";
import { toast } from "@/lib/toast";
import ModalUsuario from "@/components/ModalUsuario";

export default function UsuariosView() {
    const { usuarios } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("Todos");
    const [statusFilter, setStatusFilter] = useState("Todos");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userToEdit, setUserToEdit] = useState<any>(null);

    // Advanced Filtering
    const filteredUsers = useMemo(() => {
        return usuarios.filter(user => {
            const matchesSearch =
                user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRole = roleFilter === "Todos" || user.rol === roleFilter;
            const matchesStatus = statusFilter === "Todos" || user.estado === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [usuarios, searchTerm, roleFilter, statusFilter]);

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const paginatedUsers = filteredUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();
    };

    const getRandomGradient = (username: string) => {
        const gradients = [
            "from-blue-500 to-cyan-500",
            "from-purple-500 to-pink-500",
            "from-green-500 to-emerald-500",
            "from-orange-500 to-amber-500",
            "from-indigo-500 to-violet-500"
        ];
        const index = username.length % gradients.length;
        return gradients[index];
    };

    const handleNewUser = () => {
        setUserToEdit(null);
        setIsModalOpen(true);
    };

    const handleEditUser = (user: any) => {
        setUserToEdit(user);
        setIsModalOpen(true);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h2>
                </div>
                <Button
                    onClick={handleNewUser}
                    className="bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                    <HiUserAdd className="w-5 h-5 mr-2" />
                    Nuevo Usuario
                </Button>
            </div>

            {/* Filters Bar */}
            <Card className="p-4 border-slate-200 shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            placeholder="Buscar por nombre, usuario o correo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-4">
                        <div className="relative min-w-[150px]">
                            <select
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                            >
                                <option value="Todos">Todos los Roles</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Usuario">Usuario</option>
                                <option value="Supervisor">Supervisor</option>
                            </select>
                            <HiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        </div>
                        <div className="relative min-w-[150px]">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="w-full pl-3 pr-10 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white text-sm"
                            >
                                <option value="Todos">Todos los Estados</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                            <HiFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </Card>

            {/* Data Grid */}
            <Card className="border-slate-200 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Rol</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha Creación</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <AnimatePresence>
                                {paginatedUsers.map((user) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="hover:bg-slate-50 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getRandomGradient(user.username)} flex items-center justify-center text-white font-bold shadow-sm`}>
                                                    {getInitials(user.nombre)}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-900">{user.nombre}</p>
                                                    <p className="text-xs text-slate-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                {user.rol}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.estado === 'Activo'
                                                ? 'bg-green-50 text-green-700 border-green-100'
                                                : 'bg-slate-100 text-slate-600 border-slate-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.estado === 'Activo' ? 'bg-green-500' : 'bg-slate-400'
                                                    }`} />
                                                {user.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            {new Date(user.fechaCreacion).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <HiDotsVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem onClick={() => handleEditUser(user)}>
                                                        <HiPencil className="mr-2 h-4 w-4" /> Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => toast.info("Contraseña", "Enviar reset de contraseña")}>
                                                        <HiKey className="mr-2 h-4 w-4" /> Resetear Password
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600" onClick={() => toast.error("Eliminar", "Acción no permitida en demo")}>
                                                        <HiTrash className="mr-2 h-4 w-4" /> Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
                    <p className="text-sm text-slate-500">
                        Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, filteredUsers.length)} de {filteredUsers.length} usuarios
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <HiChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <HiChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </Card>

            <ModalUsuario
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                userToEdit={userToEdit}
            />
        </motion.div>
    );
}
