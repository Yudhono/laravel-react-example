import React from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Container, Typography, Paper, Box, Button } from "@mui/material";
import { Inertia } from "@inertiajs/inertia";

const Show = ({ activity, proposal, timeSlots }) => {
    const handleBackClick = () => {
        Inertia.visit(route("proposalActivities.index"));
    };

    console.log(3192783, "timeSlots", timeSlots);

    return (
        <DashboardTemplate>
            <Container>
                <Typography variant="h4" gutterBottom>
                    Proposal Activity Details
                </Typography>
                <Paper style={{ padding: 20, marginTop: 20 }}>
                    <Box>
                        <Typography variant="h6">Activity Details</Typography>
                        <Typography>ID: {activity.id}</Typography>
                        <Typography>
                            Proposal ID: {activity.proposal_id}
                        </Typography>
                        <Typography>
                            Collaborator PIC Name:{" "}
                            {activity.collaborator_pic_name}
                        </Typography>
                        <Typography>
                            Collaborator PIC Phone:{" "}
                            {activity.collaborator_pic_phone}
                        </Typography>
                        <Typography>
                            Start Time: {timeSlots[0].start_time}
                        </Typography>
                        <Typography>End Time: {timeSlots[0].end_time}</Typography>
                        <Typography>Remark: {activity.remark}</Typography>
                    </Box>
                    <Box style={{ marginTop: 20 }}>
                        <Typography variant="h6">
                            Related Proposal Details
                        </Typography>
                        <Typography>Title: {proposal.title}</Typography>
                        <Typography>
                            Contact Name: {proposal.contact_name}
                        </Typography>
                        <Typography>
                            Contact Phone: {proposal.contact_phone}
                        </Typography>
                        <Typography>
                            University: {proposal.university}
                        </Typography>
                        <Typography>Status: {proposal.status}</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleBackClick}
                        style={{ marginTop: 20 }}
                    >
                        Back to List
                    </Button>
                </Paper>
            </Container>
        </DashboardTemplate>
    );
};

export default Show;
