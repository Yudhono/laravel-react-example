<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProposalActivitiesTable extends Migration
{
    public function up()
    {
        Schema::create('proposal_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained('proposals')->onDelete('cascade');
            $table->string('collaborator_pic_name');
            $table->string('collaborator_pic_phone');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('proposal_activities');
    }
}