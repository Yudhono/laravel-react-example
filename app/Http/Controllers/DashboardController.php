<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Proposal;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DashboardController extends Controller
{
    public function getStatistics()
    {
        try {
            $totalProposals = Proposal::count();

            $proposalsByStatus = Proposal::select(DB::raw('count(*) as count, status'))
                ->groupBy('status')
                ->get()
                ->pluck('count', 'status')
                ->toArray();

            $proposalsByMonth = Proposal::select(DB::raw('count(*) as count, EXTRACT(MONTH FROM created_at) as month'))
                ->groupBy('month')
                ->get()
                ->pluck('count', 'month')
                ->toArray();

            $proposalsByUniversity = Proposal::select(DB::raw('count(*) as count, university'))
                ->groupBy('university')
                ->get()
                ->pluck('count', 'university')
                ->toArray();

            // $proposalsByFaculty = Proposal::select(DB::raw('count(*) as count, faculty'))
            //     ->groupBy('faculty')
            //     ->get()
            //     ->pluck('count', 'faculty')
            //     ->toArray();

            return response()->json([
                'totalProposals' => $totalProposals,
                'proposalsByStatus' => $proposalsByStatus,
                'proposalsByMonth' => $proposalsByMonth,
                'proposalsByUniversity' => $proposalsByUniversity,
                // 'proposalsByFaculty' => $proposalsByFaculty,
                'labels' => array_keys($proposalsByUniversity),
                'datasets' => [
                    [
                        'data' => array_values($proposalsByUniversity),
                        'backgroundColor' => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
                    ]
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching statistics: ' . $e->getMessage());
            return response()->json(['error' => 'Error fetching statistics'], 500);
        }
    }
}