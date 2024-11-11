<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Drop the existing constraint if it exists
        DB::statement("ALTER TABLE proposals DROP CONSTRAINT IF EXISTS status_check");
        
        // Change the column type and add the new constraint
        DB::statement("ALTER TABLE proposals ALTER COLUMN status DROP DEFAULT");
        DB::statement("ALTER TABLE proposals ALTER COLUMN status TYPE VARCHAR(255) USING status::text");
        DB::statement("ALTER TABLE proposals ADD CONSTRAINT status_check CHECK (status IN ('PROPOSED', 'PENDING', 'REJECTED', 'APPROVED'))");
        DB::statement("ALTER TABLE proposals ALTER COLUMN status SET DEFAULT 'PROPOSED'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the existing constraint if it exists
        DB::statement("ALTER TABLE proposals DROP CONSTRAINT IF EXISTS status_check");
        
        // Change the column type and add the old constraint
        DB::statement("ALTER TABLE proposals ALTER COLUMN status DROP DEFAULT");
        DB::statement("ALTER TABLE proposals ALTER COLUMN status TYPE VARCHAR(255) USING status::text");
        DB::statement("ALTER TABLE proposals ADD CONSTRAINT status_check CHECK (status IN ('Proposed', 'Pending', 'Rejected', 'Approved'))");
        DB::statement("ALTER TABLE proposals ALTER COLUMN status SET DEFAULT 'Proposed'");
    }
};