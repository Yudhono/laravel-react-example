
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProposalActivityTimeSlotsTable extends Migration
{
    public function up()
    {
        Schema::create('proposal_activity_time_slots', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_activity_id')->constrained('proposal_activities')->onDelete('cascade');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('proposal_activity_time_slots');
    }
}