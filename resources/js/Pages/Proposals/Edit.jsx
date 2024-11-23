import React, { useState } from "react";
import { Inertia } from "@inertiajs/inertia";
import { Modal, TextField, Button, Box } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const Edit = ({ proposal }) => {
    const [title, setTitle] = useState(proposal.title);
    const [description, setDescription] = useState(proposal.description);
    const [status, setStatus] = useState(proposal.status);
    const [contactName, setContactName] = useState(proposal.contact_name);
    const [contactEmail, setContactEmail] = useState(proposal.contact_email);
    const [proposalFile, setProposalFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [collaboratorPicName, setCollaboratorPicName] = useState("");
    const [collaboratorPicPhone, setCollaboratorPicPhone] = useState("");
    const [activityDate, setActivityDate] = useState(moment());

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

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        if (e.target.value === "APPROVED") {
            setShowModal(true);
        }
    };

    const handleModalSubmit = () => {
        const activityData = {
            collaborator_pic_name: collaboratorPicName,
            collaborator_pic_phone: collaboratorPicPhone,
            activity_date: activityDate.format('YYYY-MM-DD HH:mm:ss'),
        };
        Inertia.post(route("proposals.addActivity", proposal.id), activityData);
        setShowModal(false);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
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
                            onChange={handleStatusChange}
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
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2>Fill Collaborator Details</h2>
                        <TextField
                            label="Collaborator PIC Name"
                            value={collaboratorPicName}
                            onChange={(e) => setCollaboratorPicName(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Collaborator PIC Phone"
                            value={collaboratorPicPhone}
                            onChange={(e) =>
                                setCollaboratorPicPhone(e.target.value)
                            }
                            fullWidth
                            margin="normal"
                        />
                        <DatePicker
                            label="Activity Date"
                            value={activityDate}
                            onChange={(newValue) => setActivityDate(newValue)}
                            renderInput={(props) => <TextField {...props} fullWidth margin="normal" />}
                        />
                        <Button onClick={handleModalSubmit} variant="contained" color="primary" fullWidth>
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </div>
        </LocalizationProvider>
    );
};

export default Edit;
