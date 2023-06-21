<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tipe')->insert([
            ['name' => 'Front End'],
            ['name' => 'Back End'],
            ['name' => 'Full Stack'],
        ]);
    }
}
