import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

const Create = ({ isAdmin }) => {
    const [form, setForm] = useState({
        title: "",
        description: "",
        status: "",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
        university: "",
        faculty: "",
        study_program: "",
        organization: "",
        personal_identification_number: "",
        proposal_file: null,
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            proposal_file: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in form) {
            formData.append(key, form[key]);
        }
        const routeName = isAdmin
            ? "proposals.storeForAdmin"
            : "proposals.storeForUser";
        Inertia.post(route(routeName), formData);
    };

    return (
        <div>
            <h1>Submit a Proposal</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                {/* <div>
                    <label htmlFor="status">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        required
                    />
                </div> */}
                <div>
                    <label htmlFor="contact_name">Contact Name</label>
                    <input
                        type="text"
                        name="contact_name"
                        value={form.contact_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact_email">Contact Email</label>
                    <input
                        type="email"
                        name="contact_email"
                        value={form.contact_email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="contact_phone">Contact Phone</label>
                    <input
                        type="text"
                        name="contact_phone"
                        value={form.contact_phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="university">University</label>
                    <input
                        type="text"
                        name="university"
                        value={form.university}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="faculty">Faculty</label>
                    <input
                        type="text"
                        name="faculty"
                        value={form.faculty}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="study_program">Study Program</label>
                    <input
                        type="text"
                        name="study_program"
                        value={form.study_program}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="organization">Organization</label>
                    <input
                        type="text"
                        name="organization"
                        value={form.organization}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="personal_identification_number">
                        Personal Identification Number
                    </label>
                    <input
                        type="text"
                        name="personal_identification_number"
                        value={form.personal_identification_number}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="proposal_file">Proposal File</label>
                    <input
                        type="file"
                        name="proposal_file"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Create;
