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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('cargo_id')->nullable()->after('estado')->constrained('cargos')->onDelete('set null');
            $table->foreignId('area_id')->nullable()->after('cargo_id')->constrained('areas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['cargo_id']);
            $table->dropForeign(['area_id']);
            $table->dropColumn(['cargo_id', 'area_id']);
        });
    }
};
