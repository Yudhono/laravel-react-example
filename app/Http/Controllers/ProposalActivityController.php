<?php

namespace App\Http\Controllers;

use App\Models\ProposalActivity;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Proposal;

class ProposalActivityController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $proposalActivities = ProposalActivity::with('timeSlots')->paginate($perPage);

        return Inertia::render('ProposalActivities/Index', [
            'proposalActivities' => $proposalActivities->items(),
            'currentPage' => $proposalActivities->currentPage(),
            'lastPage' => $proposalActivities->lastPage(),
            'perPage' => $perPage,
            'total' => $proposalActivities->total()
        ]);
    }

    public function show($id)
    {
        $activity = ProposalActivity::with(['proposal', 'timeSlots'])->findOrFail($id);
        return Inertia::render('ProposalActivities/Show', [
            'activity' => $activity,
            'proposal' => $activity->proposal,
            'timeSlots' => $activity->timeSlots
        ]);
    }
}