import React, { useState } from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import {
    Container,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Box,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const Index = ({ proposals }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [collaboratorPicName, setCollaboratorPicName] = useState("");
    const [collaboratorPicPhone, setCollaboratorPicPhone] = useState("");
    const [activityDateStart, setActivityDateStart] = useState(moment());
    const [activityDateEnd, setActivityDateEnd] = useState(moment());

    const handleStatusClick = (event, proposal) => {
        setAnchorEl(event.currentTarget);
        setSelectedProposal(proposal);
    };

    const handleStatusClose = () => {
        setAnchorEl(null);
        // setSelectedProposal(null);
    };

    const handleStatusChange = (status) => {
        if (selectedProposal) {
            if (status === "APPROVED") {
                setSelectedProposal(selectedProposal);
                setShowModal(true);
            } else {
                Inertia.post(
                    route("proposals.updateStatus", selectedProposal.id),
                    {
                        status,
                    }
                );
            }
        }
        handleStatusClose();
    };

    const handleModalSubmit = () => {
        if (!selectedProposal) {
            console.error("No proposal selected");
            return;
        }

        const activityData = {
            proposal_id: selectedProposal.id, // Ensure proposal_id is included
            collaborator_pic_name: collaboratorPicName,
            collaborator_pic_phone: collaboratorPicPhone,
            activity_date_start: activityDateStart.format(
                "YYYY-MM-DD HH:mm:ss"
            ),
            activity_date_end: activityDateEnd.format("YYYY-MM-DD HH:mm:ss"),
        };
        console.log(739812, "activityData", activityData);
        console.log(739812, "selectedProposal", selectedProposal);
        Inertia.post(
            route("proposals.addActivity", selectedProposal.id),
            activityData
        );
        setShowModal(false);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this proposal?")) {
            Inertia.delete(route("proposals.destroy", id));
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DashboardTemplate>
                <Typography variant="h4" gutterBottom>
                    Proposals
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={InertiaLink}
                    href={route("proposals.createForAdmin")}
                >
                    Create New Proposal
                </Button>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>Contact Name</TableCell>
                                <TableCell>Contact Phone</TableCell>
                                <TableCell>Proposal Submit ID</TableCell>
                                <TableCell>University</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                    <TableCell component="th" scope="row">
                                        <InertiaLink
                                            href={route(
                                                "proposals.show",
                                                proposal.id
                                            )}
                                        >
                                            {proposal.title}
                                        </InertiaLink>
                                    </TableCell>
                                    <TableCell>
                                        {proposal.contact_name}
                                    </TableCell>
                                    <TableCell>
                                        {proposal.contact_phone}
                                    </TableCell>
                                    <TableCell>
                                        {proposal.proposal_submit_id}
                                    </TableCell>
                                    <TableCell>{proposal.university}</TableCell>
                                    <TableCell>{proposal.status}</TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            component={InertiaLink}
                                            href={route(
                                                "proposals.edit",
                                                proposal.id
                                            )}
                                            style={{ marginRight: 10 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(event) =>
                                                handleStatusClick(
                                                    event,
                                                    proposal
                                                )
                                            }
                                        >
                                            Change Status
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleStatusClose}
                >
                    <MenuItem onClick={() => handleStatusChange("PENDING")}>
                        Pending
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange("REJECTED")}>
                        Rejected
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange("APPROVED")}>
                        Approved
                    </MenuItem>
                </Menu>
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "2px solid #000",
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2>Fill Collaborator Details</h2>
                        <TextField
                            label="Collaborator PIC Name"
                            value={collaboratorPicName}
                            onChange={(e) =>
                                setCollaboratorPicName(e.target.value)
                            }
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
                            label="Activity Date Start"
                            value={activityDateStart}
                            onChange={(newValue) =>
                                setActivityDateStart(newValue)
                            }
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <DatePicker
                            label="Activity Date Start"
                            value={activityDateEnd}
                            onChange={(newValue) =>
                                setActivityDateEnd(newValue)
                            }
                            renderInput={(props) => (
                                <TextField
                                    {...props}
                                    fullWidth
                                    margin="normal"
                                />
                            )}
                        />
                        <Button
                            onClick={handleModalSubmit}
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Box>
                </Modal>
            </DashboardTemplate>
        </LocalizationProvider>
    );
};

export default Index;
