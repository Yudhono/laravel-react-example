import React, { useState, useEffect } from "react";
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

const Edit = ({ post }) => {
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [authorId, setAuthorId] = useState(post.author_id);
    const [bannerImage, setBannerImage] = useState(null);
    const [bannerImagePreview, setBannerImagePreview] = useState(null);

    useEffect(() => {
        if (post.banner_image) {
            setBannerImagePreview(
                `/storage/banner_images/${post.banner_image}`
            );
        }
    }, [post.banner_image]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("_method", "PUT");
        formData.append("title", title);
        formData.append("content", content);
        formData.append("author_id", authorId);
        if (bannerImage) {
            formData.append("banner_image", bannerImage);
        }
        router.post(route("blogposts.update", post.id), formData);
    };

    const handleBannerImageChange = (e) => {
        const file = e.target.files[0];
        setBannerImage(file);
        setBannerImagePreview(URL.createObjectURL(file));
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
                        Update
                    </Button>
                </Box>
            </Container>
        </DashboardTemplate>
    );
};

export default Edit;
