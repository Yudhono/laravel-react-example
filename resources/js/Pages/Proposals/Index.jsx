import React from "react";
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
} from "@mui/material";

const Index = ({ proposals }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedProposal, setSelectedProposal] = React.useState(null);

    const handleStatusClick = (event, proposal) => {
        setAnchorEl(event.currentTarget);
        setSelectedProposal(proposal);
    };

    const handleStatusClose = () => {
        setAnchorEl(null);
        setSelectedProposal(null);
    };

    const handleStatusChange = (status) => {
        if (selectedProposal) {
            Inertia.post(route("proposals.updateStatus", selectedProposal.id), {
                status,
            });
        }
        handleStatusClose();
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this proposal?")) {
            Inertia.delete(route("proposals.destroy", id));
        }
    };

    return (
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
                                <TableCell>{proposal.contact_name}</TableCell>
                                <TableCell>{proposal.contact_phone}</TableCell>
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
                                    {/* <Button
                                        variant="contained"
                                        color="default"
                                        onClick={() =>
                                            handleDelete(proposal.id)
                                        }
                                        style={{ marginRight: 10 }}
                                    >
                                        Delete
                                    </Button> */}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={(event) =>
                                            handleStatusClick(event, proposal)
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
        </DashboardTemplate>
    );
};

export default Index;
