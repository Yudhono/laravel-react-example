<?php

namespace App\Http\Controllers;

use App\Models\Qna;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QnaController extends Controller
{
    public function index()
    {
        $qnas = Qna::all();
        return Inertia::render('Qnas/Index', ['qnas' => $qnas]);
    }

    public function create()
    {
        return Inertia::render('Qnas/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
        'question' => 'required|string|max:255',
        'answer' => 'required|string',
        ]);

        // Ensure the author_id is set
        $validatedData['author_id'] = auth()->id();

        Qna::create($validatedData);

        return redirect()->route('qnas.index')->with('success', 'QnA created successfully.');
    }

    public function show(Qna $qna)
    {
        return Inertia::render('Qnas/Show', ['qna' => $qna]);
    }

    public function edit(Qna $qna)
    {
        return Inertia::render('Qnas/Edit', ['qna' => $qna]);
    }

    public function update(Request $request, Qna $qna)
    {
        $request->validate([
            'question' => 'required|string|max:255',
            'answer' => 'required|string',
        ]);

        $qna->update($request->all());

        return redirect()->route('qnas.index')->with('success', 'QnA updated successfully.');
    }

    public function destroy(Qna $qna)
    {
        $qna->delete();

        return redirect()->route('qnas.index')->with('success', 'QnA deleted successfully.');
    }
}