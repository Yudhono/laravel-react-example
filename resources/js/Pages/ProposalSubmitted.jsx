import React from "react";
import HeaderNavBar from "../Components/HeaderNavBar";

const ProposalSubmitted = ({ proposal_submit_id }) => {
    return (
        <section className="bg-slate-100 dark:bg-gray-900 pt-24">
            <HeaderNavBar />
            <div className="px-10 pb-10">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Proposal Submitted
                </h1>
                <p className="mt-4 text-gray-900 dark:text-white">
                    Your proposal has been submitted and is currently in the
                    proposed status and under review.
                </p>
                <p className="mt-2 text-gray-900 dark:text-white">
                    Your Proposal Submit ID:{" "}
                    <strong>{proposal_submit_id}</strong>
                </p>
                <p className="mt-2 text-gray-900 dark:text-white">
                    You can use this ID to check the status of your proposal.
                </p>
            </div>
        </section>
    );
};

export default ProposalSubmitted;
