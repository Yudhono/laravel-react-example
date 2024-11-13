import React from "react";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";

const Index = ({ proposals }) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this proposal?")) {
            Inertia.delete(route("proposals.destroy", id));
        }
    };

    return (
        <div>
            <h1>Proposals</h1>
            <InertiaLink href={route("proposals.create")}>
                Create New Proposal
            </InertiaLink>
            <ul>
                {proposals.map((proposal) => (
                    <li key={proposal.id}>
                        <InertiaLink
                            href={route("proposals.show", proposal.id)}
                        >
                            {proposal.title}
                        </InertiaLink>
                        <InertiaLink
                            href={route("proposals.edit", proposal.id)}
                        >
                            Edit
                        </InertiaLink>
                        <button onClick={() => handleDelete(proposal.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
