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
        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->morphs('archivable'); // Relación polimórfica (solicitud_id, solicitud_type)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nombre_original'); // Nombre del archivo original
            $table->string('nombre_guardado'); // Nombre con el que se guardó
            $table->string('ruta'); // Ruta completa del archivo
            $table->string('tipo_archivo'); // pdf, excel, imagen, word
            $table->string('mime_type'); // application/pdf, image/jpeg, etc.
            $table->integer('tamano')->unsigned(); // Tamaño en bytes
            $table->string('categoria')->nullable(); // documento_identidad, certificado, soporte, etc.
            $table->text('descripcion')->nullable();
            $table->boolean('validado')->default(false);
            $table->timestamp('fecha_validacion')->nullable();
            $table->foreignId('validado_por')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
            $table->softDeletes(); // Para eliminación lógica
            
            // morphs() ya crea el índice para archivable_type y archivable_id
            $table->index('tipo_archivo');
            $table->index('categoria');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos');
    }
};
