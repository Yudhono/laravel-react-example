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
} from "@mui/material";

const Index = ({ proposals }) => {
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
                href={route("proposals.create")}
            >
                Create New Proposal
            </Button>
            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
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
                                        color="default"
                                        onClick={() =>
                                            handleDelete(proposal.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardTemplate>
    );
};

export default Index;
