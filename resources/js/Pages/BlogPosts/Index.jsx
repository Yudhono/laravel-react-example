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
    TablePagination,
    Stack,
} from "@mui/material";

const Index = ({ posts }) => {
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this post?")) {
            router.delete(route("blogposts.destroy", id));
        }
    };

    const handleChangePage = (event, newPage) => {
        router.get(
            route("blogposts.index", {
                page: newPage + 1,
                per_page: posts.per_page,
            })
        );
    };

    const handleChangeRowsPerPage = (event) => {
        router.get(
            route("blogposts.index", {
                page: 1,
                per_page: parseInt(event.target.value, 10),
            })
        );
    };

    const displayRange = `Displaying ${posts.from} - ${posts.to} of ${posts.total}`;

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
                        {posts.data.map((post) => (
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
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2" sx={{ marginLeft: 2 }}>
                        {displayRange}
                    </Typography>
                    <TablePagination
                        component="div"
                        count={posts.total}
                        rowsPerPage={posts.per_page}
                        page={posts.current_page - 1}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Stack>
            </TableContainer>
        </DashboardTemplate>
    );
};

export default Index;
