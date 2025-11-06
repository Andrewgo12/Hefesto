<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('historial_solicitudes', function (Blueprint $table) {
            // Eliminar la foreign key constraint
            $table->dropForeign(['usuario_id']);
            
            // Modificar la columna para que sea nullable
            $table->foreignId('usuario_id')->nullable()->change()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('historial_solicitudes', function (Blueprint $table) {
            // Revertir: hacer NOT NULL nuevamente
            $table->dropForeign(['usuario_id']);
            $table->foreignId('usuario_id')->nullable(false)->change()->constrained('users')->onDelete('cascade');
        });
    }
};
