<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Qna;

class QnaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Qna::factory()->count(10)->create();
    }
}