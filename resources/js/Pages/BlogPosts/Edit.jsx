import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import DashboardTemplate from "@/Components/DashboardTemplate";
import Editor from "./Editor";

const Edit = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [authorId, setAuthorId] = useState(post.author_id);

    const handleSubmit = (e) => {
        e.preventDefault();
        router.put(route("blogposts.update", post.id), {
            title,
            content,
            author_id: authorId,
        });
    };

    return (
        <DashboardTemplate>
            <Container>
                <Typography variant="h4" component="h1" gutterBottom>
                    Edit Post
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Editor content={content} setContent={setContent} />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Author ID"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Update
                    </Button>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Edit;
