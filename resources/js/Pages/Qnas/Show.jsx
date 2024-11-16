import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Container, Typography, Button, Box } from "@mui/material";

const Show = ({ qna }) => {
    const handleDelete = () => {
        Inertia.delete(`/qnas/${qna.id}`);
    };

    return (
        <DashboardTemplate>
            <Container>
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        {qna?.question}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {qna?.answer}
                    </Typography>
                    <Box mt={2}>
                        <Button
                            variant="contained"
                            color="primary"
                            component={InertiaLink}
                            href={`/qnas/${qna?.id}/edit`}
                            style={{ marginRight: "8px" }}
                        >
                            Edit
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Show;
