<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\MascotaDonada;
use App\Models\Donante;

class MascotaDonadaApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test para obtener todas las mascotas donadas.
     */
    public function test_puede_obtener_todas_las_mascotas_donadas(): void
    {
        // Crear algunos donantes y mascotas donadas de prueba
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

        MascotaDonada::create([
            'donante_id' => $donante->id,
            'mascota_id' => 1,
            'fecha_donacion' => '2023-06-08',
            'motivo_donacion' => 'Motivo 1',
            'estado_revision' => 'Pendiente',
        ]);

        $response = $this->getJson('/api/mascotas-donadas');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'donante_id',
                            'mascota_id',
                            'fecha_donacion',
                            'motivo_donacion',
                            'estado_revision',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]);
    }

    /**
     * Test para crear una nueva mascota donada.
     */
    public function test_puede_crear_mascota_donada(): void
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
        
        $mascotaDonadaData = [
            'donante_id' => $donante->id,
            'mascota_id' => 1,
            'fecha_donacion' => '2023-06-08',
            'motivo_donacion' => 'Me mudo a un apartamento que no permite mascotas',
            'estado_revision' => 'Pendiente',
        ];

        $response = $this->postJson('/api/mascotas-donadas', $mascotaDonadaData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'donante_id',
                        'mascota_id',
                        'fecha_donacion',
                        'motivo_donacion',
                        'estado_revision',
                        'created_at',
                        'updated_at'
                    ]
                ]);

        $this->assertDatabaseHas('mascotas_donadas', [
            'donante_id' => $donante->id,
            'mascota_id' => 1,
            'motivo_donacion' => 'Me mudo a un apartamento que no permite mascotas'
        ]);
    }

    /**
     * Test para validación de datos requeridos.
     */
    public function test_validacion_datos_requeridos(): void
    {
        $response = $this->postJson('/api/mascotas-donadas', []);

        $response->assertStatus(400)
                ->assertJsonStructure([
                    'success',
                    'message'
                ]);
    }
}
