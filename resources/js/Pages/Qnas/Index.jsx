import React from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Inertia } from "@inertiajs/inertia";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Typography,
} from "@mui/material";

const Index = ({ qnas }) => {
    const handleClick = (id) => {
        Inertia.get(`/qnas/${id}`);
    };

    const handleDelete = (id) => {
        Inertia.delete(`/qnas/${id}`);
    };

    const handleCreate = () => {
        Inertia.get("/qnas/create");
    };

    return (
        <DashboardTemplate>
            <Box my={4}>
                <Typography variant="h4" component="h1" gutterBottom>
                    QnAs
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreate}
                    sx={{ mb: 2 }}
                >
                    Create
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Question</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {qnas?.map((qna) => (
                                <TableRow key={qna.id}>
                                    <TableCell
                                        onClick={() => handleClick(qna.id)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        {qna.question}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleDelete(qna.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </DashboardTemplate>
    );
};

export default Index;
