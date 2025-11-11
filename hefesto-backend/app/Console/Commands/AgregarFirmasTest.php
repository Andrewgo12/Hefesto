<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Database\Seeders\FirmasDigitalesTestSeeder;

class AgregarFirmasTest extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'firmas:agregar-test';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Agregar firmas digitales de prueba a todas las solicitudes administrativas y de historia clínica';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('🖊️  Iniciando proceso de agregar firmas digitales de prueba...');
        $this->newLine();
        
        // Ejecutar el seeder
        $seeder = new FirmasDigitalesTestSeeder();
        $seeder->setCommand($this);
        $seeder->run();
        
        $this->newLine();
        $this->info('✅ Proceso completado. Ahora puedes descargar los Excel y PDF para verificar las firmas.');
        
        return Command::SUCCESS;
    }
}
