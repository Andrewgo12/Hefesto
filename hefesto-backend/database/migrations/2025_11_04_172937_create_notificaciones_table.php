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
        Schema::create('notificaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('tipo'); // info, warning, error, success
            $table->string('titulo');
            $table->text('mensaje');
            $table->string('icono')->nullable();
            $table->string('url')->nullable(); // URL para acción
            $table->json('datos_adicionales')->nullable();
            $table->boolean('leida')->default(false);
            $table->timestamp('fecha_lectura')->nullable();
            $table->boolean('importante')->default(false);
            $table->timestamp('expira_en')->nullable();
            $table->timestamps();
            
            $table->index(['user_id', 'leida']);
            $table->index('tipo');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificaciones');
    }
};
