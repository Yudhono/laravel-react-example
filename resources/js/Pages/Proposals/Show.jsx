import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";

const Show = ({ proposal }) => {
    return (
        <div>
            <h1>{proposal.title}</h1>
            <p>{proposal.description}</p>
            <p>Status: {proposal.status}</p>
            <p>Contact Name: {proposal.contact_name}</p>
            <p>Contact Email: {proposal.contact_email}</p>
            <p>
                Proposal File:{" "}
                <a
                    href={route("proposals.download", proposal.proposal_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Download
                </a>
            </p>
            <InertiaLink href={route("proposals.index")}>
                Back to Proposals
            </InertiaLink>
        </div>
    );
};

export default Show;
