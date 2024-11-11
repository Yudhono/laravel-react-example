<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::dropIfExists('proposals');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->enum('status', ['Proposed', 'Pending', 'Rejected', 'Approved'])->default('Proposed');
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('proposal_file');
            $table->foreignId('reviewed_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }
};