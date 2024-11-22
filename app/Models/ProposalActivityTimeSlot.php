
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProposalActivityTimeSlot extends Model
{
    use HasFactory;

    protected $table = 'proposal_activity_time_slots';

    protected $fillable = [
        'proposal_activity_id',
        'start_time',
        'end_time',
    ];

    public function proposalActivity()
    {
        return $this->belongsTo(ProposalActivity::class);
    }
}