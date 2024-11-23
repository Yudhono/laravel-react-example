<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proposal extends Model
{
    use HasFactory;

    protected $table = 'proposals';

    protected $fillable = [
        'title',
        'description',
        'status',
        'contact_name',
        'contact_email',
        'proposal_file',
        'reviewed_by',
        'proposal_submit_id',
        'contact_phone',
        'university',
        'faculty',
        'study_program',
        'organization',
        'personal_identification_number',
        'remark',
    ];

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    public function activities()
    {
        return $this->hasMany(ProposalActivity::class);
    }
}