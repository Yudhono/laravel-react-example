import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Edit = ({ proposal }) => {
    const [title, setTitle] = useState(proposal.title);
    const [description, setDescription] = useState(proposal.description);
    const [status, setStatus] = useState(proposal.status);
    const [contactName, setContactName] = useState(proposal.contact_name);
    const [contactEmail, setContactEmail] = useState(proposal.contact_email);
    const [proposalFile, setProposalFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("contact_name", contactName);
        formData.append("contact_email", contactEmail);
        if (proposalFile) {
            formData.append("proposal_file", proposalFile);
        }

        Inertia.post(route("proposals.update", proposal.id), formData, {
            headers: {
                "X-HTTP-Method-Override": "PUT",
            },
        });
    };

    return (
        <div>
            <h1>Edit Proposal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Status</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contact Name</label>
                    <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Contact Email</label>
                    <input
                        type="email"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Proposal File</label>
                    <input
                        type="file"
                        onChange={(e) => setProposalFile(e.target.files[0])}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default Edit;
