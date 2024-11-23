<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogPost extends Model
{
    use HasFactory;

    protected $table = 'blog_posts';

    protected $fillable = [
        'title',
        'content',
        'author_id',
        'banner_image',
    ];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}