import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Button } from "@mui/material";
import HeaderNavBar from "../Components/HeaderNavBar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import universityList from "../constant/university-list.json";

const CreateProposal = () => {
    const [form, setForm] = useState({
        title: "",
        description: "",
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

        Inertia.post(route("proposals.storeForUser"), formData, {
            onSuccess: (page) => {
                const proposalSubmitId = page.props.flash.proposal_submit_id;
                Inertia.visit(route('proposal.submitted', { proposal_submit_id: proposalSubmitId }));
            }
        });
    };

    return (
        <section className="bg-slate-100 dark:bg-gray-900 pt-24">
            <HeaderNavBar />
            <div className="grid grid-cols-2 px-10 pb-10">
                <div>
                    <Button
                        startIcon={<ArrowBackIosIcon />}
                        color="#000000"
                        sx={{ fontWeight: 900 }}
                        href="/"
                    >
                        Back To Home
                    </Button>
                    <h1>Lorem Ipsum</h1>
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Donec nec odio vitae
                        </p>
                    </div>
                </div>
                <div className="p-10 border border-solid border-slate-400 h-fit rounded-xl bg-gray-50">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                        Submit a Proposal
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="title"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Title
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Type proposal title"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="contact_name"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contact Name
                                </label>
                                <input
                                    type="text"
                                    name="contact_name"
                                    id="contact_name"
                                    value={form.contact_name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Contact name"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="contact_email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="contact_email"
                                    id="contact_email"
                                    value={form.contact_email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Contact email"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="contact_phone"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Contact Phone
                                </label>
                                <input
                                    type="text"
                                    name="contact_phone"
                                    id="contact_phone"
                                    value={form.contact_phone}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Contact phone"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="university"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    University
                                </label>
                                <select
                                    name="university"
                                    id="university"
                                    value={form.university}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                >
                                    <option value="" disabled selected>
                                        Pilih Universitas
                                    </option>
                                    {Object.entries(universityList).map(
                                        ([key, value]) => (
                                            <option key={key} value={key}>
                                                {value}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="faculty"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Faculty
                                </label>
                                <input
                                    type="text"
                                    name="faculty"
                                    id="faculty"
                                    value={form.faculty}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Faculty"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="study_program"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Study Program
                                </label>
                                <input
                                    type="text"
                                    name="study_program"
                                    id="study_program"
                                    value={form.study_program}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Study program"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="organization"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Organization
                                </label>
                                <input
                                    type="text"
                                    name="organization"
                                    id="organization"
                                    value={form.organization}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Organization"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label
                                    htmlFor="personal_identification_number"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Personal Identification Number
                                </label>
                                <input
                                    type="text"
                                    name="personal_identification_number"
                                    id="personal_identification_number"
                                    value={form.personal_identification_number}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Personal identification number"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="8"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Your description here"
                                    required
                                ></textarea>
                            </div>
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="proposal_file"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Proposal File
                                </label>
                                <input
                                    type="file"
                                    name="proposal_file"
                                    id="proposal_file"
                                    onChange={handleFileChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="w-full flex justify-end mt-4">
                            <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                            >
                                Submit Proposal
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default CreateProposal;
