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
        'community',
        'collaborator',
        'start_time',
        'end_time',
        'remark',
    ];

    public function proposal()
    {
        return $this->belongsTo(Proposal::class);
    }

    public function timeSlots()
    {
        return $this->hasMany(ProposalActivityTimeSlot::class);
    }
}