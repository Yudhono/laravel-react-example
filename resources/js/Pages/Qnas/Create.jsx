import React, { useState } from "react";
import { router } from "@inertiajs/react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Container, TextField, Button, Typography, Box } from "@mui/material";

const Create = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post("/qnas", { question, answer });
    };

    return (
        <DashboardTemplate>
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create QnA
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
                            Submit
                        </Button>
                    </form>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Create;
