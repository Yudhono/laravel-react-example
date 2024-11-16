import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    InputLabel,
    Input,
    FormControl,
} from "@mui/material";
import DashboardTemplate from "@/Components/DashboardTemplate";

import Editor from "./Editor";

const Create = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImagePreview, setBannerImagePreview] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author_id", authorId);
        if (bannerImage) {
            formData.append("banner_image", bannerImage);
        }
        router.post(route("blogposts.store"), formData);
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        setBannerImagePreview(URL.createObjectURL(file));
    };

    return (
        <DashboardTemplate>
            <Container maxWidth="md">
                <Typography variant="h4" component="h1" gutterBottom>
                    Create New Post
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <FormControl fullWidth margin="normal">
                        <InputLabel htmlFor="banner-image">
                            Banner Image
                        </InputLabel>
                        <Input
                            id="banner-image"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={handleBannerImageChange}
                        />
                    </FormControl>
                    {bannerImagePreview && (
                        <Box mt={2}>
                            <img
                                src={bannerImagePreview}
                                alt="Banner Preview"
                                style={{
                                    width: "100%",
                                    maxHeight: "300px",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    )}
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
                        Create
                    </Button>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Create;
