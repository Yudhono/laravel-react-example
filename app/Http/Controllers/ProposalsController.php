<?php

namespace App\Http\Controllers;

use App\Models\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\ProposalActivity;
use App\Models\ProposalActivityTimeSlot;

class ProposalsController extends Controller
{
    public function index(Request $request)
    {
        $page = $request->input('page', 1);
        $perPage = $request->input('perPage', 10);
        $filters = $request->except(['page', 'perPage']);

        // Apply filters and pagination logic
        $query = Proposal::query();

        if (!empty($filters)) {
            // Apply filters to the query
            foreach ($filters as $key => $value) {
                if ($key === 'startDate' && $value) {
                    $query->whereDate('created_at', '>=', $value);
                } elseif ($key === 'endDate' && $value) {
                    $query->whereDate('created_at', '<=', $value);
                } elseif ($value) {
                    $query->where($key, 'like', "%$value%");
                }
            }
        }

        // Order by created_at in descending order
        $query->orderBy('created_at', 'desc');

        $proposals = $query->paginate($perPage, ['*'], 'page', $page);

        return Inertia::render('Proposals/Index', [
            'proposals' => $proposals->items(),
            'total' => $proposals->total(),
            'perPage' => $proposals->perPage(),
            'currentPage' => $proposals->currentPage(),
            'filters' => $filters,
        ]);
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
            'remark' => 'required_if:status,REJECTED|string|max:255',
        ]);

        $proposal->update([
            'status' => $validatedData['status'],
            'remark' => $validatedData['remark'] ?? null,
        ]);

        if ($validatedData['status'] === 'APPROVED') {
            return Inertia::render('Proposals/Edit', ['proposal' => $proposal, 'showModal' => true]);
        }

        return redirect()->route('proposals.index')->with('success', 'Proposal status updated successfully');
    }

    public function addActivity(Request $request, $id)
    {
        Log::info('addActivity called with data:', $request->all());

        $validatedData = $request->validate([
            'proposal_id' => 'required|exists:proposals,id',
            'collaborator_pic_name' => 'required|string|max:255',
            'collaborator_pic_phone' => 'required|string|max:255',
            'activity_dates' => 'required|array',
            'activity_dates.*.start' => 'required|date',
            'activity_dates.*.end' => 'required|date',
        ]);

        $proposalActivity = ProposalActivity::create([
            'proposal_id' => $validatedData['proposal_id'],
            'collaborator_pic_name' => $validatedData['collaborator_pic_name'],
            'collaborator_pic_phone' => $validatedData['collaborator_pic_phone'],
            'remark' => 'default_remark',
        ]);

        foreach ($validatedData['activity_dates'] as $date) {
            ProposalActivityTimeSlot::create([
                'proposal_activity_id' => $proposalActivity->id,
                'start_time' => $date['start'],
                'end_time' => $date['end'],
            ]);
        }

        $proposal = Proposal::find($validatedData['proposal_id']);
        $proposal->update(['status' => 'APPROVED']);

        Log::info('Proposal Activity Time Slot Created');

        return redirect()->route('proposals.index')->with('success', 'Activity added successfully');
    }

    public function proposalStatusView()
    {
        return Inertia::render('ProposalStatus', ['status' => null]);
    }

    public function checkStatus($proposal_submit_id)
    {
        $proposal = Proposal::where('proposal_submit_id', $proposal_submit_id)->first();

        return Inertia::render('ProposalStatus', [
            'status' => $proposal ? $proposal->status : 'No proposal found',
            'proposal_submit_id' => $proposal_submit_id
        ]);
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