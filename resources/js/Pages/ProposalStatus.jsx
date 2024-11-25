import React, { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";

const ProposalStatus = ({ status, proposal_submit_id }) => {
    const [proposalSubmitId, setProposalSubmitId] = useState(
        proposal_submit_id || ""
    );
    const [proposalStatus, setProposalStatus] = useState(status || "");

    useEffect(() => {
        if (proposal_submit_id) {
            setProposalSubmitId(proposal_submit_id);
            setProposalStatus(status);
        }
    }, [proposal_submit_id, status]);

    const handleCheckStatus = () => {
        Inertia.get(
            `/proposal-status/${proposalSubmitId}`,
            {},
            {
                onSuccess: (page) => {
                    setProposalStatus(page.props.status);
                },
            }
        );
    };

    return (
        <div>
            <h1>Proposal Status</h1>
            <input
                type="text"
                value={proposalSubmitId}
                onChange={(e) => setProposalSubmitId(e.target.value)}
                placeholder="Enter Proposal Submit ID"
            />
            <button onClick={handleCheckStatus}>Check Status</button>
            <p>Your proposal status is: {proposalStatus}</p>
            <InertiaLink href="/">Go back to Dashboard</InertiaLink>
        </div>
    );
};

export default ProposalStatus;
