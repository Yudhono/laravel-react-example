<?php

namespace Database\Factories;

use App\Models\Qna;
use Illuminate\Database\Eloquent\Factories\Factory;

class QnaFactory extends Factory
{
    protected $model = Qna::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'question' => $this->faker->sentence,
            'answer' => $this->faker->paragraph,
            'author_id' => \App\Models\User::factory(),
            'answered_at' => $this->faker->dateTime,
        ];
    }
}