import React, { useEffect, useState } from "react";
import DashboardTemplate from "../Components/DashboardTemplate";
import { Pie, Line } from "react-chartjs-2";
import {
    Chart,
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";
import axios from "axios";

Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

export default function Dashboard() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
            },
        ],
    });

    const [totalProposals, setTotalProposals] = useState(0);
    const [proposalsByStatus, setProposalsByStatus] = useState({});
    const [proposalsByMonth, setProposalsByMonth] = useState({});
    const [proposalsByFaculty, setProposalsByFaculty] = useState({});

    useEffect(() => {
        axios
            .get("/dashboard/statistics")
            .then((response) => {
                setChartData(response.data);
                setTotalProposals(response.data.totalProposals);
                setProposalsByStatus(response.data.proposalsByStatus);
                setProposalsByMonth(response.data.proposalsByMonth);
                setProposalsByFaculty(response.data.proposalsByFaculty);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the statistics!",
                    error
                );
            });
    }, []);

    return (
        <DashboardTemplate>
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <p className="text-lg mb-6">
                                Total Proposals: {totalProposals}
                            </p>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Proposals by Status
                                </h3>
                                <ul className="list-disc list-inside">
                                    {Object.entries(proposalsByStatus).map(
                                        ([status, count]) => (
                                            <li key={status}>
                                                {status}: {count}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>
                            {/* <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Proposals by Faculty
                                </h3>
                                <ul className="list-disc list-inside">
                                    {Object.entries(proposalsByFaculty).map(
                                        ([faculty, count]) => (
                                            <li key={faculty}>
                                                {faculty}: {count}
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div> */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Proposals by University
                                </h3>
                                <div className="w-full max-w-md mx-auto">
                                    <Pie data={chartData} />
                                </div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    Proposals by Month
                                </h3>
                                <div className="w-full max-w-2xl mx-auto">
                                    <Line
                                        data={{
                                            labels: Object.keys(
                                                proposalsByMonth
                                            ),
                                            datasets: [
                                                {
                                                    label: "Proposals by Month",
                                                    data: Object.values(
                                                        proposalsByMonth
                                                    ),
                                                    borderColor: "#36A2EB",
                                                    backgroundColor:
                                                        "rgba(54, 162, 235, 0.2)",
                                                },
                                            ],
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardTemplate>
    );
}
