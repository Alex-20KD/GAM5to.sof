<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\MascotaDonada;
use App\Models\Donante;
use Illuminate\Foundation\Testing\RefreshDatabase;

class MascotaDonadaTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test que verifica la creación de una mascota donada.
     */
    public function test_puede_crear_mascota_donada(): void
    {
        // Crear un donante primero
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

        $mascotaDonada = MascotaDonada::create($mascotaDonadaData);

        $this->assertInstanceOf(MascotaDonada::class, $mascotaDonada);
        $this->assertEquals($donante->id, $mascotaDonada->donante_id);
        $this->assertEquals(1, $mascotaDonada->mascota_id);
        $this->assertEquals('Pendiente', $mascotaDonada->estado_revision);
    }

    /**
     * Test que verifica las relaciones de mascota donada.
     */
    public function test_mascota_donada_tiene_relaciones(): void
    {
        $mascotaDonada = new MascotaDonada();

        $this->assertTrue(method_exists($mascotaDonada, 'donante'));
        $this->assertTrue(method_exists($mascotaDonada, 'mascota'));
    }

    /**
     * Test que verifica los campos fillable.
     */
    public function test_mascota_donada_campos_fillable(): void
    {
        $mascotaDonada = new MascotaDonada();
        $fillable = $mascotaDonada->getFillable();

        $expectedFillable = [
            'donante_id',
            'mascota_id',
            'fecha_donacion',
            'motivo_donacion',
            'estado_revision'
        ];

        $this->assertEquals($expectedFillable, $fillable);
    }
}
