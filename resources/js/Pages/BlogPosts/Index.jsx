import React from "react";
import { InertiaLink } from "@inertiajs/inertia-react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Typography,
} from "@mui/material";

const Index = ({ posts }) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("blogposts.destroy", id));
        }
    };

    return (
        <DashboardTemplate>
            <Typography variant="h4" gutterBottom>
                Blog Posts
            </Typography>
            <Button
                variant="contained"
                color="primary"
                component={InertiaLink}
                href={route("blogposts.create")}
                style={{ marginBottom: "20px" }}
            >
                Create New Post
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>
                                    <InertiaLink
                                        href={route("blogposts.show", post.id)}
                                    >
                                        {post.title}
                                    </InertiaLink>
                                </TableCell>
                                <TableCell align="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        component={InertiaLink}
                                        href={route("blogposts.edit", post.id)}
                                        style={{ marginRight: "10px" }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => handleDelete(post.id)}
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
