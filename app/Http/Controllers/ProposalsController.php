<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

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

    public function createForUser()
    {
        return Inertia::render('CreateProposal', ['isAdmin' => false]);
    }

    public function storeForUser(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'proposal_file' => 'required|mimes:doc,docx|max:10240', // 10MB max
            'contact_phone' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'faculty' => 'required|string|max:255',
            'study_program' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'personal_identification_number' => 'required|string|max:255',
        ]);

        Log::info('Validated Data:', $validatedData);

        if ($request->hasFile('proposal_file')) {
            $filePath = $request->file('proposal_file')->store('proposals');
            $validatedData['proposal_file'] = basename($filePath);
        }

        $validatedData['proposal_submit_id'] = $this->generateProposalSubmitId($validatedData);
        $validatedData['status'] = 'PROPOSED';

        Log::info('Final Data to be Saved:', $validatedData);

        Proposal::create($validatedData);

        Log::info('Proposal Created Successfully');

        return redirect()->route('proposals.index')->with('success', 'Proposal created successfully');
    }

    public function createForAdmin()
    {
        return Inertia::render('Proposals/Create', ['isAdmin' => true]);
    }

    public function storeForAdmin(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'contact_name' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'proposal_file' => 'required|mimes:doc,docx|max:10240', // 10MB max
            'contact_phone' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'faculty' => 'required|string|max:255',
            'study_program' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'personal_identification_number' => 'required|string|max:255',
        ]);

        Log::info('Validated Data:', $validatedData);

        if ($request->hasFile('proposal_file')) {
            $filePath = $request->file('proposal_file')->store('proposals');
            $validatedData['proposal_file'] = basename($filePath);
        }

        $validatedData['proposal_submit_id'] = $this->generateProposalSubmitId($validatedData);
        $validatedData['status'] = 'PROPOSED';

        Log::info('Final Data to be Saved:', $validatedData);

        Proposal::create($validatedData);

        Log::info('Proposal Created Successfully');

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
            'contact_phone' => 'sometimes|required|string|max:255',
            'university' => 'sometimes|required|string|max:255',
            'faculty' => 'sometimes|required|string|max:255',
            'study_program' => 'sometimes|required|string|max:255',
            'organization' => 'sometimes|required|string|max:255',
            'personal_identification_number' => 'sometimes|required|string|max:255',
        ]);

        if ($request->hasFile('proposal_file')) {
            // Delete the old file
            if ($proposal->proposal_file) {
                Storage::delete($proposal->proposal_file);
            }
            $filePath = $request->file('proposal_file')->store('proposals');
            $validatedData['proposal_file'] = $filePath;
        }

        $validatedData['proposal_submit_id'] = $this->generateProposalSubmitId($validatedData);

        $proposal->update($validatedData);
        return redirect()->route('proposals.index')->with('success', 'Proposal updated successfully');
    }

    public function updateStatus(Request $request, $id)
    {
        $proposal = Proposal::find($id);
        if (!$proposal) {
            return redirect()->route('proposals.index')->with('error', 'Proposal not found');
        }

        $validatedData = $request->validate([
            'status' => 'required|string|in:PENDING,REJECTED,APPROVED',
        ]);

        $proposal->update(['status' => $validatedData['status']]);
        return redirect()->route('proposals.index')->with('success', 'Proposal status updated successfully');
    }

    private function generateProposalSubmitId($data)
    {
        do {
            $university = $data['university'];
            $lastThreeDigitsOfPhone = substr($data['contact_phone'], -3);
            $randomString = strtoupper(Str::random(5)); // Ensure the random string is in all capital letters
            $currentDate = date('dmY'); // Current date in day-month-year format

            $proposalSubmitId = "{$university}{$lastThreeDigitsOfPhone}{$randomString}{$currentDate}";
        } while (Proposal::where('proposal_submit_id', $proposalSubmitId)->exists());

        return $proposalSubmitId;
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