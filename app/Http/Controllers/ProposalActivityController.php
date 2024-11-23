<?php

namespace App\Http\Controllers;

use App\Models\ProposalActivity;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Proposal;

class ProposalActivityController extends Controller
{
    public function index()
    {
        $proposalActivities = ProposalActivity::with('timeSlots')->get();
        return Inertia::render('ProposalActivities/Index', [
            'proposalActivities' => $proposalActivities
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