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
        Schema::table('credenciales_firmas', function (Blueprint $table) {
            // Agregar user_id como foreign key solo si no existe
            if (!Schema::hasColumn('credenciales_firmas', 'user_id')) {
                $table->foreignId('user_id')->nullable()->after('id')->constrained('users')->onDelete('cascade');
            }
            
            // Agregar campos de firma digital solo si no existen
            if (!Schema::hasColumn('credenciales_firmas', 'firma_digital')) {
                $table->text('firma_digital')->nullable()->after('descripcion');
            }
            if (!Schema::hasColumn('credenciales_firmas', 'firma_tipo')) {
                $table->string('firma_tipo')->nullable()->after('firma_digital');
            }
            if (!Schema::hasColumn('credenciales_firmas', 'firma_actualizada_en')) {
                $table->timestamp('firma_actualizada_en')->nullable()->after('firma_tipo');
            }
            
            // Hacer campos opcionales para compatibilidad con seeders existentes
            $table->string('nombre_completo')->nullable()->change();
            $table->string('email')->nullable()->change();
            $table->string('tipo_formulario')->nullable()->change();
        });
        
        // Eliminar y recrear unique constraint
        try {
            Schema::table('credenciales_firmas', function (Blueprint $table) {
                $table->dropUnique(['email']);
            });
        } catch (\Exception $e) {
            // Ya fue eliminado
        }
        
        // Recrear unique constraint solo para valores no nulos
        try {
            Schema::table('credenciales_firmas', function (Blueprint $table) {
                $table->unique('email', 'credenciales_firmas_email_unique_not_null');
            });
        } catch (\Exception $e) {
            // Ya existe
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credenciales_firmas', function (Blueprint $table) {
            // Eliminar campos agregados
            $table->dropForeign(['user_id']);
            $table->dropColumn(['user_id', 'firma_digital', 'firma_tipo', 'firma_actualizada_en']);
            
            // Revertir campos a NOT NULL
            $table->string('nombre_completo')->nullable(false)->change();
            $table->string('email')->nullable(false)->change();
            $table->string('tipo_formulario')->nullable(false)->change();
            
            // Restaurar unique constraint original
            $table->dropUnique('credenciales_firmas_email_unique_not_null');
            $table->unique('email');
        });
    }
};
