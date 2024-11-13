<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProposalsController extends Controller
{
    public function index()
    {
        $proposals = Proposal::all();
        return Inertia::render('Proposals/Index', ['proposals' => $proposals]);
    }

    public function show($id)
    {
        $proposal = Proposal::find($id);
        if (!$proposal) {
            return redirect()->route('proposals.index')->with('error', 'Proposal not found');
        }
        return Inertia::render('Proposals/Show', ['proposal' => $proposal]);
    }

    public function create()
    {
        return Inertia::render('Proposals/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'proposal_file' => 'required|mimes:doc,docx|max:10240', // 10MB max
        ]);

        if ($request->hasFile('proposal_file')) {
            $filePath = $request->file('proposal_file')->store('proposals');
            $validatedData['proposal_file'] = $filePath;
        }

        Proposal::create($validatedData);
        return redirect()->route('proposals.index')->with('success', 'Proposal created successfully');
    }

    public function edit($id)
    {
        $proposal = Proposal::find($id);
        if (!$proposal) {
            return redirect()->route('proposals.index')->with('error', 'Proposal not found');
        }
        return Inertia::render('Proposals/Edit', ['proposal' => $proposal]);
    }

    public function update(Request $request, $id)
    {
        $proposal = Proposal::find($id);
        if (!$proposal) {
            return redirect()->route('proposals.index')->with('error', 'Proposal not found');
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'status' => 'sometimes|required|string',
            'contact_name' => 'sometimes|required|string|max:255',
            'contact_email' => 'sometimes|required|email|max:255',
            'proposal_file' => 'sometimes|mimes:doc,docx|max:10240', // 10MB max
        ]);

        if ($request->hasFile('proposal_file')) {
            // Delete the old file
            if ($proposal->proposal_file) {
                Storage::delete($proposal->proposal_file);
            }
            $filePath = $request->file('proposal_file')->store('proposals');
            $validatedData['proposal_file'] = $filePath;
        }

        $proposal->update($validatedData);
        return redirect()->route('proposals.index')->with('success', 'Proposal updated successfully');
    }

    public function destroy($id)
    {
        $proposal = Proposal::find($id);
        if (!$proposal) {
            return redirect()->route('proposals.index')->with('error', 'Proposal not found');
        }

        // Delete the file
        if ($proposal->proposal_file) {
            Storage::delete($proposal->proposal_file);
        }

        $proposal->delete();
        return redirect()->route('proposals.index')->with('success', 'Proposal deleted successfully');
    }
}