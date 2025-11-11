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
            $table->text('firma_digital')->nullable()->after('descripcion'); // Imagen base64 o ruta
            $table->string('firma_tipo')->default('texto')->after('firma_digital'); // 'imagen', 'texto', 'canvas'
            $table->timestamp('firma_actualizada_en')->nullable()->after('firma_tipo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('credenciales_firmas', function (Blueprint $table) {
            $table->dropColumn(['firma_digital', 'firma_tipo', 'firma_actualizada_en']);
        });
    }
};
