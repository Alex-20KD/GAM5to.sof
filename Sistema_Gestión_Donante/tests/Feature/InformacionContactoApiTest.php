<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\InformacionContacto;
use App\Models\Donante;

class InformacionContactoApiTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test para obtener toda la información de contactos.
     */
    public function test_puede_obtener_toda_la_informacion_contactos(): void
    {
        // Crear algunos donantes e información de contactos de prueba
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

        InformacionContacto::create([
            'donante_id' => $donante->id,
            'nombre_contacto' => 'Pedro García',
            'telefono' => '555-0201',
            'relacion' => 'Hermano',
        ]);

        $response = $this->getJson('/api/informacion-contactos');

        $response->assertStatus(200)
                ->assertJsonStructure([
                    'success',
                    'data' => [
                        '*' => [
                            'id',
                            'donante_id',
                            'nombre_contacto',
                            'telefono',
                            'relacion',
                            'created_at',
                            'updated_at'
                        ]
                    ]
                ]);
    }

    /**
     * Test para crear nueva información de contacto.
     */
    public function test_puede_crear_informacion_contacto(): void
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
        
        $informacionContactoData = [
            'donante_id' => $donante->id,
            'nombre_contacto' => 'Pedro García',
            'telefono' => '555-0201',
            'relacion' => 'Hermano',
        ];

        $response = $this->postJson('/api/informacion-contactos', $informacionContactoData);

        $response->assertStatus(201)
                ->assertJsonStructure([
                    'success',
                    'message',
                    'data' => [
                        'id',
                        'donante_id',
                        'nombre_contacto',
                        'telefono',
                        'relacion',
                        'created_at',
                        'updated_at'
                    ]
                ]);

        $this->assertDatabaseHas('informacion_contactos', [
            'donante_id' => $donante->id,
            'nombre_contacto' => 'Pedro García',
            'telefono' => '555-0201',
            'relacion' => 'Hermano'
        ]);
    }

    /**
     * Test para validación de datos requeridos.
     */
    public function test_validacion_datos_requeridos(): void
    {
        $response = $this->postJson('/api/informacion-contactos', []);

        $response->assertStatus(400)
                ->assertJsonStructure([
                    'success',
                    'message'
                ]);
    }
}
