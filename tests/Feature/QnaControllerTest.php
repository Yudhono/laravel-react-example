<?php

namespace Tests\Feature;

use App\Models\Qna;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class QnaControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_index_displays_qnas()
    {
        $qnas = Qna::factory()->count(3)->create();

        $response = $this->get(route('qnas.index'));

        $response->assertStatus(200);
        $response->assertViewHas('qnas', $qnas);
    }

    public function test_store_creates_qna()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $data = [
            'question' => 'What is Laravel?',
            'answer' => 'Laravel is a PHP framework.',
            'author_id' => $user->id,
            'answered_at' => now(),
        ];

        $response = $this->post(route('qnas.store'), $data);

        $response->assertRedirect(route('qnas.index'));
        $this->assertDatabaseHas('qna', $data);
    }

    public function test_show_displays_qna()
    {
        $qna = Qna::factory()->create();

        $response = $this->get(route('qnas.show', $qna));

        $response->assertStatus(200);
        $response->assertViewHas('qna', $qna);
    }

    public function test_update_modifies_qna()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $qna = Qna::factory()->create();

        $data = [
            'question' => 'Updated question?',
            'answer' => 'Updated answer.',
            'author_id' => $user->id,
            'answered_at' => now(),
        ];

        $response = $this->put(route('qnas.update', $qna), $data);

        $response->assertRedirect(route('qnas.index'));
        $this->assertDatabaseHas('qna', $data);
    }

    public function test_destroy_deletes_qna()
    {
        $qna = Qna::factory()->create();

        $response = $this->delete(route('qnas.destroy', $qna));

        $response->assertRedirect(route('qnas.index'));
        $this->assertDatabaseMissing('qna', ['id' => $qna->id]);
    }
}