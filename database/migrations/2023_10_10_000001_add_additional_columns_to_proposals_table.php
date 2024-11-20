
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAdditionalColumnsToProposalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('proposals', function (Blueprint $table) {
            $table->string('contact_phone')->nullable()->after('contact_email');
            $table->string('university')->nullable()->after('contact_phone');
            $table->string('faculty')->nullable()->after('university');
            $table->string('study_program')->nullable()->after('faculty');
            $table->string('organization')->nullable()->after('study_program');
            $table->string('personal_identification_number')->nullable()->after('organization');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('proposals', function (Blueprint $table) {
            $table->dropColumn('contact_phone');
            $table->dropColumn('university');
            $table->dropColumn('faculty');
            $table->dropColumn('study_program');
            $table->dropColumn('organization');
            $table->dropColumn('personal_identification_number');
        });
    }
}