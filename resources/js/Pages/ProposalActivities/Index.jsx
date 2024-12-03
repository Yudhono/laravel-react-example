import React, { useState } from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Inertia } from "@inertiajs/inertia";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
} from "@mui/material";

const Index = ({
    proposalActivities,
    currentPage,
    lastPage,
    perPage,
    total,
}) => {
    const [page, setPage] = useState(currentPage);
    const [itemsPerPage, setItemsPerPage] = useState(perPage);

    const handleRowClick = (id) => {
        Inertia.visit(route("proposalActivities.show", id));
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        Inertia.visit(
            route("proposalActivities.index", {
                page: value,
                perPage: itemsPerPage,
            })
        );
    };

    const handlePerPageChange = (event) => {
        setItemsPerPage(event.target.value);
        Inertia.visit(
            route("proposalActivities.index", {
                page: 1,
                perPage: event.target.value,
            })
        );
    };

    const start = (page - 1) * itemsPerPage + 1;
    const end = Math.min(page * itemsPerPage, total);

    return (
        <DashboardTemplate>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Proposal Activities
                </Typography>
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Proposal ID</TableCell>
                                <TableCell>Collaborator PIC Name</TableCell>
                                <TableCell>Collaborator PIC Phone</TableCell>
                                <TableCell>Remark</TableCell>
                                <TableCell>Time Slots</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proposalActivities.map((activity) => (
                                <TableRow
                                    key={activity.id}
                                    onClick={() => handleRowClick(activity.id)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TableCell>{activity.id}</TableCell>
                                    <TableCell>
                                        {activity.proposal_id}
                                    </TableCell>
                                    <TableCell>
                                        {activity.collaborator_pic_name}
                                    </TableCell>
                                    <TableCell>
                                        {activity.collaborator_pic_phone}
                                    </TableCell>
                                    <TableCell>{activity.remark}</TableCell>
                                    <TableCell>
                                        {activity.time_slots &&
                                        activity.time_slots.length > 0 ? (
                                            <ul>
                                                {activity.time_slots.map(
                                                    (slot, index) => (
                                                        <li key={index}>
                                                            {slot.start_time} -{" "}
                                                            {slot.end_time}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        ) : (
                                            "N/A"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack
                    direction="row"
                    gap={2}
                    marginTop={3}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2">
                        Displaying {start} - {end} of {total}
                    </Typography>
                    <Stack direction="row" gap={2} alignItems="center">
                        <FormControl style={{ minWidth: 120 }}>
                            <InputLabel>Per Page</InputLabel>
                            <Select
                                value={itemsPerPage}
                                onChange={handlePerPageChange}
                                size="small"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            size="medium"
                            count={lastPage}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Stack>
            </Container>
        </DashboardTemplate>
    );
};

export default Index;
