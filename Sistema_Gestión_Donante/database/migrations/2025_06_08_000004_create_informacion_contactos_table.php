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
        Schema::create('informacion_contactos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('donante_id')->constrained('donantes')->onDelete('cascade');
            $table->string('nombre_contacto');
            $table->string('telefono');
            $table->string('relacion');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('informacion_contactos');
    }
};
