import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Create = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("");
    const [contactName, setContactName] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [proposalFile, setProposalFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("status", status);
        formData.append("contact_name", contactName);
        formData.append("contact_email", contactEmail);
        formData.append("proposal_file", proposalFile);

        Inertia.post(route("proposals.store"), formData);
    };

    return (
        <div>
            <h1>Create New Proposal</h1>
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
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default Create;
