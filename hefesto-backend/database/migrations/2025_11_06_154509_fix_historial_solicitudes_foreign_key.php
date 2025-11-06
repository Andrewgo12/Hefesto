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
            // Eliminar la foreign key constraint antigua
            $table->dropForeign(['usuario_id']);
        });
        
        Schema::table('historial_solicitudes', function (Blueprint $table) {
            // Modificar la columna para que sea nullable
            $table->unsignedBigInteger('usuario_id')->nullable()->change();
            
            // Recrear la foreign key con SET NULL
            $table->foreign('usuario_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('historial_solicitudes', function (Blueprint $table) {
            $table->dropForeign(['usuario_id']);
        });
        
        Schema::table('historial_solicitudes', function (Blueprint $table) {
            $table->unsignedBigInteger('usuario_id')->nullable(false)->change();
            
            $table->foreign('usuario_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');
        });
    }
};
