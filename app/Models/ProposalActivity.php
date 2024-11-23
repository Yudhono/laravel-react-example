<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProposalActivity extends Model
{
    use HasFactory;

    protected $table = 'proposal_activities';

    protected $fillable = [
        'proposal_id',
        'collaborator_pic_name',
        'collaborator_pic_phone',
        'remark',
    ];

    public function proposal()
    {
        return $this->belongsTo(Proposal::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(ProposalActivityTimeSlot::class, 'proposal_activity_id');
    }
}