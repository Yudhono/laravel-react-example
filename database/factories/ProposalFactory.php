<?php
namespace Database\Factories;

use App\Models\Proposal;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProposalFactory extends Factory
{
    protected $model = Proposal::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'status' => $this->faker->randomElement(['PROPOSED', 'PENDING', 'REJECTED', 'APPROVED']),
            'contact_name' => $this->faker->name,
            'contact_email' => $this->faker->email,
            'proposal_file' => $this->faker->word . '.pdf',
            'reviewed_by' => \App\Models\User::factory(),
        ];
    }
}