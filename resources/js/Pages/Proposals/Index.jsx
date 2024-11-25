import React, { useState, useEffect } from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import {
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
    IconButton,
    Pagination,
    Select,
    FormControl,
    InputLabel,
    Stack,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";

const Index = ({
    proposals,
    total,
    perPage: initialPerPage,
    currentPage: initialCurrentPage,
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [collaboratorPicName, setCollaboratorPicName] = useState("");
    const [collaboratorPicPhone, setCollaboratorPicPhone] = useState("");
    const [activityDates, setActivityDates] = useState([
        { start: moment(), end: moment() },
    ]);
    const [perPage, setPerPage] = useState(initialPerPage || 10);
    const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1);

    useEffect(() => {
        if (currentPage !== initialCurrentPage || perPage !== initialPerPage) {
            Inertia.get(
                route("proposals.index"),
                { page: currentPage, perPage },
                { preserveState: true, replace: true }
            );
        }
    }, [currentPage, perPage]);

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

    const handleAddActivityDate = () => {
        setActivityDates([
            ...activityDates,
            { start: moment(), end: moment() },
        ]);
    };

    const handleActivityDateChange = (index, field, value) => {
        const newActivityDates = [...activityDates];
        newActivityDates[index][field] = value;
        setActivityDates(newActivityDates);
    };

    const handleRemoveActivityDate = (index) => {
        const newActivityDates = activityDates.filter((_, i) => i !== index);
        setActivityDates(newActivityDates);
    };

    const handleModalSubmit = () => {
        if (!selectedProposal) {
            console.error("No proposal selected");
            return;
        }

        const activityData = {
            proposal_id: selectedProposal.id,
            collaborator_pic_name: collaboratorPicName,
            collaborator_pic_phone: collaboratorPicPhone,
            activity_dates: activityDates.map((date) => ({
                start: date.start.format("YYYY-MM-DD HH:mm:ss"),
                end: date.end.format("YYYY-MM-DD HH:mm:ss"),
            })),
        };
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

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
        setCurrentPage(1); // Reset to first page when perPage changes
    };

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

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
                <Stack direction="row" justifyContent="space-between" alignItems="center" style={{ marginTop: 20 }}>
                    <Typography variant="body2">
                        Displaying {startItem} - {endItem} of {total}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <FormControl
                            variant="outlined"
                            style={{
                                marginRight: 20,
                                minWidth: 120,
                            }}
                        >
                            <InputLabel>Items per page</InputLabel>
                            <Select
                                value={perPage}
                                onChange={handlePerPageChange}
                                label="Items per page"
                                size="small"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            size="medium"
                            count={Math.ceil(total / perPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Stack>
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
                        {activityDates.map((date, index) => (
                            <Box key={index} display="flex" alignItems="center">
                                <DateTimePicker
                                    label="Activity Date Start"
                                    value={date.start}
                                    onChange={(newValue) =>
                                        handleActivityDateChange(
                                            index,
                                            "start",
                                            newValue
                                        )
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
                                />
                                <DateTimePicker
                                    label="Activity Date End"
                                    value={date.end}
                                    onChange={(newValue) =>
                                        handleActivityDateChange(
                                            index,
                                            "end",
                                            newValue
                                        )
                                    }
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            fullWidth
                                            margin="normal"
                                        />
                                    )}
                                />
                                <IconButton
                                    onClick={() =>
                                        handleRemoveActivityDate(index)
                                    }
                                    color="secondary"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        <Button
                            onClick={handleAddActivityDate}
                            variant="contained"
                            color="secondary"
                            fullWidth
                        >
                            Add Another Date
                        </Button>
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
