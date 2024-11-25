import React from "react";
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
} from "@mui/material";

const Index = ({ proposalActivities }) => {
    const handleRowClick = (id) => {
        Inertia.visit(route("proposalActivities.show", id));
    };

    console.log(38912, "proposalActivities", proposalActivities);

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
            </Container>
        </DashboardTemplate>
    );
};

export default Index;
