<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\VerificacionDonante;
use App\Models\Donante;

class VerificacionDonanteApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test para obtener todas las verificaciones de donantes.
     */
    public function test_puede_obtener_todas_las_verificaciones_donantes(): void
    {
        // Crear algunos donantes y verificaciones de prueba
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

        VerificacionDonante::create([
            'donante_id' => $donante->id,
            'fecha_verificacion' => '2023-06-08',
            'resultado' => 'Aprobado',
            'observaciones' => 'Documentos en orden',
        ]);

        $response = $this->getJson('/api/verificaciones-donantes');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'donante_id',
                            'fecha_verificacion',
                            'resultado',
                            'observaciones',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]);
    }

    /**
     * Test para crear nueva verificación de donante.
     */
    public function test_puede_crear_verificacion_donante(): void
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
        
        $verificacionDonanteData = [
            'donante_id' => $donante->id,
            'fecha_verificacion' => '2023-06-08',
            'resultado' => 'Aprobado',
            'observaciones' => 'Documentos en orden, domicilio verificado',
        ];

        $response = $this->postJson('/api/verificaciones-donantes', $verificacionDonanteData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'donante_id',
                        'fecha_verificacion',
                        'resultado',
                        'observaciones',
                        'created_at',
                        'updated_at'
                    ]
                ]);

        $this->assertDatabaseHas('verificaciones_donantes', [
            'donante_id' => $donante->id,
            'resultado' => 'Aprobado',
            'observaciones' => 'Documentos en orden, domicilio verificado'
        ]);
    }

    /**
     * Test para validación de datos requeridos.
     */
    public function test_validacion_datos_requeridos(): void
    {
        $response = $this->postJson('/api/verificaciones-donantes', []);

        $response->assertStatus(400)
                ->assertJsonStructure([
                    'success',
                    'message'
                ]);
    }
}
