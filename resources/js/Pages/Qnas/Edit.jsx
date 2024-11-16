import React, { useState } from "react";
import { router } from "@inertiajs/react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Edit = ({ qna }) => {
    const [question, setQuestion] = useState(qna.question);
    const [answer, setAnswer] = useState(qna.answer);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(`/qnas/${qna.id}`, { question, answer });
    };

    return (
        <DashboardTemplate>
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Edit QnA
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="question"
                            label="Question"
                            variant="outlined"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            id="answer"
                            label="Answer"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Update
                        </Button>
                    </form>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Edit;
