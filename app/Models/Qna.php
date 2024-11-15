<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qna extends Model
{
    use HasFactory;

    protected $table = 'qna';

    protected $fillable = [
        'question',
        'answer',
        'author_id',
        'answered_at',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}