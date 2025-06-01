<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\HistorialColaboracion;
use App\Models\Donante;

class HistorialColaboracionApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test para obtener todo el historial de colaboraciones.
     */
    public function test_puede_obtener_todo_el_historial_colaboraciones(): void
    {
        // Crear algunos donantes e historial de colaboraciones de prueba
        $donante = Donante::create([
            'nombre' => 'Juan Pérez',
            'correo' => 'juan@example.com',
            'telefono' => '123456789',
            'direccion' => 'Calle Principal 123',
            'tipo_documento' => 'DNI',
            'numero_documento' => '12345678',
            'fecha_registro' => '2023-06-08',
            'estado' => 'Activo',
        ]);

        HistorialColaboracion::create([
            'donante_id' => $donante->id,
            'tipo_colaboracion' => 'Económica',
            'descripcion' => 'Descripción 1',
            'fecha_colaboracion' => '2023-06-08',
        ]);

        $response = $this->getJson('/api/historial-colaboraciones');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'donante_id',
                            'tipo_colaboracion',
                            'descripcion',
                            'fecha_colaboracion',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]);
    }

    /**
     * Test para crear una nueva colaboración.
     */
    public function test_puede_crear_historial_colaboracion(): void
    {
        $donante = Donante::create([
            'nombre' => 'Juan Pérez',
            'correo' => 'juan@example.com',
            'telefono' => '123456789',
            'direccion' => 'Calle Principal 123',
            'tipo_documento' => 'DNI',
            'numero_documento' => '12345678',
            'fecha_registro' => '2023-06-08',
            'estado' => 'Activo',
        ]);
        
        $historialColaboracionData = [
            'donante_id' => $donante->id,
            'tipo_colaboracion' => 'Económica',
            'descripcion' => 'Donación de $100 para alimento de mascotas',
            'fecha_colaboracion' => '2023-06-08',
        ];

        $response = $this->postJson('/api/historial-colaboraciones', $historialColaboracionData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'donante_id',
                        'tipo_colaboracion',
                        'descripcion',
                        'fecha_colaboracion',
                        'created_at',
                        'updated_at'
                    ]
                ]);

        $this->assertDatabaseHas('historial_colaboraciones', [
            'donante_id' => $donante->id,
            'tipo_colaboracion' => 'Económica',
            'descripcion' => 'Donación de $100 para alimento de mascotas'
        ]);
    }

    /**
     * Test para validación de datos requeridos.
     */
    public function test_validacion_datos_requeridos(): void
    {
        $response = $this->postJson('/api/historial-colaboraciones', []);

        $response->assertStatus(400)
                ->assertJsonStructure([
                    'success',
                    'message'
                ]);
    }
}
