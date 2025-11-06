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
        Schema::create('cargos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre')->unique();
            $table->string('codigo')->unique()->nullable();
            $table->text('descripcion')->nullable();
            $table->foreignId('area_id')->nullable()->constrained('areas')->onDelete('set null');
            $table->enum('tipo', ['administrativo', 'medico', 'tecnico', 'otro'])->default('administrativo');
            $table->boolean('activo')->default(true);
            $table->timestamps();
            
            $table->index('tipo');
            $table->index('activo');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cargos');
    }
};
