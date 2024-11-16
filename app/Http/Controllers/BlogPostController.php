<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::all();
        return Inertia::render('BlogPosts/Index', ['posts' => $posts]);
    }

    public function show($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return redirect()->route('blogposts.index')->with('error', 'Post not found');
        }
        return Inertia::render('BlogPosts/Show', ['post' => $post]);
    }

    public function create()
    {
        return Inertia::render('BlogPosts/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'author_id' => 'required|integer|exists:users,id',
            'banner_image' => 'nullable|image|max:1024', // 1MB Max
        ]);

        if ($request->hasFile('banner_image')) {
            $path = $request->file('banner_image')->store('banner_images', 'public');
            $validatedData['banner_image'] = basename($path); // Store only the file name
        }

        BlogPost::create($validatedData);
        return redirect()->route('blogposts.index')->with('success', 'Post created successfully');
    }

    public function edit($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return redirect()->route('blogposts.index')->with('error', 'Post not found');
        }
        return Inertia::render('BlogPosts/Edit', ['post' => $post]);
    }

    public function update(Request $request, $id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return redirect()->route('blogposts.index')->with('error', 'Post not found');
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'author_id' => 'sometimes|required|integer|exists:users,id',
            'banner_image' => 'nullable|image|max:1024', // 1MB Max
        ]);

        if ($request->hasFile('banner_image')) {
            // Delete the old banner image if it exists
            if ($post->banner_image) {
                Storage::disk('public')->delete('banner_images/' . $post->banner_image);
            }
            $path = $request->file('banner_image')->store('banner_images', 'public');
            $validatedData['banner_image'] = basename($path); // Store only the file name
        }

        $post->update($validatedData);
        return redirect()->route('blogposts.index')->with('success', 'Post updated successfully');
    }

    public function destroy($id)
    {
        $post = BlogPost::find($id);
        if (!$post) {
            return redirect()->route('blogposts.index')->with('error', 'Post not found');
        }

        $post->delete();
        return redirect()->route('blogposts.index')->with('success', 'Post deleted successfully');
    }
}