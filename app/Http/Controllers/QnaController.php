<?php

namespace App\Http\Controllers;

use App\Models\Qna;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Faq;

class QnaController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10); // Default to 10 if not provided
        $qnas = Qna::paginate($perPage);
        return Inertia::render('Qnas/Index', [
            'qnas' => $qnas->items(),
            'links' => [
                'current_page' => $qnas->currentPage(),
                'last_page' => $qnas->lastPage(),
                'per_page' => $qnas->perPage(),
                'total' => $qnas->total(),
            ],
        ]);
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

    public function faq(Request $request)
    {
        $query = Qna::query();

        if ($request->has('search')) {
            $query->where('question', 'ILIKE', '%' . $request->input('search') . '%');
        }

        $faqs = $query->paginate(5); // Adjust the number of items per page as needed

        return Inertia::render('Faq', [
            'faqs' => $faqs,
            'filters' => $request->only(['search']),
        ]);
    }
}