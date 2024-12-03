import React, { useState } from "react";
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
    Pagination,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Stack,
} from "@mui/material";

const Index = ({ qnas, links }) => {
    const [currentPage, setCurrentPage] = useState(links?.current_page || 1);
    const [perPage, setPerPage] = useState(links?.per_page || 10);

    const handleClick = (id) => {
        Inertia.get(`/qnas/${id}`);
    };

    const handleDelete = (id) => {
        Inertia.delete(`/qnas/${id}`);
    };

    const handleCreate = () => {
        Inertia.get("/qnas/create");
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        Inertia.get(`/qnas?page=${value}&per_page=${perPage}`);
    };

    const handlePerPageChange = (event) => {
        setPerPage(event.target.value);
        Inertia.get(`/qnas?page=1&per_page=${event.target.value}`);
    };

    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, links.total);

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
                <Stack
                    direction="row"
                    gap={2}
                    marginTop={3}
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography variant="body2">
                        Displaying {start} - {end} of {links.total}
                    </Typography>
                    <Stack direction="row" gap={2} alignItems="center">
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel id="per-page-select-label">
                                Per Page
                            </InputLabel>
                            <Select
                                labelId="per-page-select-label"
                                value={perPage}
                                onChange={handlePerPageChange}
                                label="Per Page"
                                size="small"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                        {links && (
                            <Pagination
                                size="medium"
                                count={links.last_page}
                                page={currentPage}
                                onChange={handlePageChange}
                                sx={{ mt: 2 }}
                                color="primary"
                            />
                        )}
                    </Stack>
                </Stack>
            </Box>
        </DashboardTemplate>
    );
};

export default Index;
