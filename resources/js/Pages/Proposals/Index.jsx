import React, { useState, useEffect, useRef, useMemo } from "react";
import DashboardTemplate from "@/Components/DashboardTemplate";
import { Inertia } from "@inertiajs/inertia";
import { InertiaLink } from "@inertiajs/inertia-react";
import {
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Menu,
    MenuItem,
    Modal,
    TextField,
    Box,
    IconButton,
    Pagination,
    Select,
    FormControl,
    InputLabel,
    Stack,
    Tooltip,
    Grid2,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SettingsIcon from "@mui/icons-material/Settings";
import { debounce } from "lodash";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import FilterListIcon from "@mui/icons-material/FilterList";

const Index = ({
    proposals,
    total,
    perPage: initialPerPage,
    currentPage: initialCurrentPage,
    filters: initialFilters = {},
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProposal, setSelectedProposal] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [collaboratorPicName, setCollaboratorPicName] = useState("");
    const [collaboratorPicPhone, setCollaboratorPicPhone] = useState("");
    const [activityDates, setActivityDates] = useState([
        { start: moment(), end: moment() },
    ]);
    const [perPage, setPerPage] = useState(initialPerPage || 10);
    const [currentPage, setCurrentPage] = useState(initialCurrentPage || 1);
    const [filters, setFilters] = useState(initialFilters);

    const currentMonthStart = moment().startOf("month").toDate();
    const currentMonthEnd = moment().endOf("month").toDate();

    const [dateRange, setDateRange] = useState([
        filters.startDate ? new Date(filters.startDate) : currentMonthStart,
        filters.endDate ? new Date(filters.endDate) : currentMonthEnd,
    ]);
    const [showFilters, setShowFilters] = useState(false);
    const isInitialMount = useRef(true);

    const query = useMemo(
        () => ({
            page: currentPage,
            perPage,
            ...filters,
        }),
        [currentPage, perPage, filters]
    );

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        console.log("Sending query:", query); // Add this line for debugging

        Inertia.get(route("proposals.index"), query, {
            preserveState: true,
            preserveScroll: true,
        }).catch((error) => {
            console.error("Error fetching proposals:", error); // Add this line for debugging
        });
    }, [currentPage, perPage, filters]);

    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const [rejectionRemark, setRejectionRemark] = useState("");

    const handleStatusClick = (event, proposal) => {
        setAnchorEl(event.currentTarget);
        setSelectedProposal(proposal);
    };

    const handleStatusClose = () => {
        setAnchorEl(null);
        // setSelectedProposal(null);
    };

    const handleStatusChange = (status) => {
        if (selectedProposal) {
            if (status === "APPROVED") {
                setSelectedProposal(selectedProposal);
                setShowModal(true);
            } else if (status === "REJECTED") {
                setShowRejectionModal(true);
            } else {
                Inertia.post(
                    route("proposals.updateStatus", selectedProposal.id),
                    {
                        status,
                    }
                );
            }
        }
        handleStatusClose();
    };

    const handleRejectionSubmit = () => {
        if (!selectedProposal) {
            console.error("No proposal selected");
            return;
        }

        Inertia.post(route("proposals.updateStatus", selectedProposal.id), {
            status: "REJECTED",
            remark: rejectionRemark,
        });
        setShowRejectionModal(false);
        setRejectionRemark("");
    };

    const handleAddActivityDate = () => {
        setActivityDates([
            ...activityDates,
            { start: moment(), end: moment() },
        ]);
    };

    const handleActivityDateChange = (index, field, value) => {
        const newActivityDates = [...activityDates];
        newActivityDates[index][field] = value;
        setActivityDates(newActivityDates);
    };

    const handleRemoveActivityDate = (index) => {
        const newActivityDates = activityDates.filter((_, i) => i !== index);
        setActivityDates(newActivityDates);
    };

    const handleModalSubmit = () => {
        if (!selectedProposal) {
            console.error("No proposal selected");
            return;
        }

        const activityData = {
            proposal_id: selectedProposal.id,
            collaborator_pic_name: collaboratorPicName,
            collaborator_pic_phone: collaboratorPicPhone,
            activity_dates: activityDates.map((date) => ({
                start: date.start.format("YYYY-MM-DD HH:mm:ss"),
                end: date.end.format("YYYY-MM-DD HH:mm:ss"),
            })),
        };
        Inertia.post(
            route("proposals.addActivity", selectedProposal.id),
            activityData
        );
        setShowModal(false);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePerPageChange = (event) => {
        const newPerPage = event.target.value;
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const handleFilterChange = debounce((event) => {
        setFilters({
            ...filters,
            [event.target.name]: event.target.value,
        });
    }, 700);

    const handleDateRangeChange = (value) => {
        console.log("Selected date range:", value); // Add this line for debugging
        if (value === null) {
            setDateRange([null, null]);
            setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: null,
                endDate: null,
            }));
        } else {
            setDateRange(value);
            setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: value[0]
                    ? moment(value[0]).format("YYYY-MM-DD")
                    : null,
                endDate: value[1]
                    ? moment(value[1]).format("YYYY-MM-DD")
                    : null,
            }));
        }
        setCurrentPage(1); // Reset to first page when filters change
    };

    const handleClearFilters = () => {
        setFilters({});
        setDateRange([null, null]);
        setCurrentPage(1);
    };

    const handleToggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const startItem = (currentPage - 1) * perPage + 1;
    const endItem = Math.min(currentPage * perPage, total);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DashboardTemplate>
                <Typography variant="h4" gutterBottom>
                    Proposals
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <DateRangePicker
                        value={dateRange}
                        onChange={handleDateRangeChange}
                        placeholder="Select Date Range"
                        format="yyyy-MM-dd" // Ensure the format matches the expected date format
                    />
                    <Stack direction="row" gap={2}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleClearFilters}
                            style={{ marginLeft: 10 }}
                        >
                            Clear Filters
                        </Button>
                        <Button
                            variant="contained"
                            color="default"
                            onClick={handleToggleFilters}
                            startIcon={<FilterListIcon />}
                        >
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </Button>

                        <Button
                            variant="contained"
                            color="primary"
                            component={InertiaLink}
                            href={route("proposals.createForAdmin")}
                        >
                            Create New Proposal
                        </Button>
                    </Stack>
                </Stack>
                {showFilters && (
                    <Box mt={2} mb={2} display="flex" gap={2}>
                        <TextField
                            label="Title"
                            name="title"
                            defaultValue={filters.title || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="Contact Name"
                            name="contact_name"
                            defaultValue={filters.contact_name || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="Contact Phone"
                            name="contact_phone"
                            defaultValue={filters.contact_phone || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="Proposal Submit ID"
                            name="proposal_submit_id"
                            defaultValue={filters.proposal_submit_id || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="University"
                            name="university"
                            defaultValue={filters.university || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                        <TextField
                            label="Status"
                            name="status"
                            defaultValue={filters.status || ""}
                            onChange={handleFilterChange}
                            variant="outlined"
                            size="small"
                            style={{ marginBottom: 10 }}
                        />
                    </Box>
                )}
                <TableContainer component={Paper} style={{ marginTop: 20 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Created At</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Contact Name</TableCell>
                                <TableCell>Contact Phone</TableCell>
                                <TableCell>Proposal Submit ID</TableCell>
                                <TableCell>University</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {proposals.map((proposal) => (
                                <TableRow key={proposal.id}>
                                    <TableCell
                                        sx={{
                                            width: 120,
                                        }}
                                    >
                                        {moment(proposal.created_at).format(
                                            "YYYY-MM-DD"
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <InertiaLink
                                            href={route(
                                                "proposals.show",
                                                proposal.id
                                            )}
                                        >
                                            {proposal.title}
                                        </InertiaLink>
                                    </TableCell>
                                    <TableCell>
                                        {proposal.contact_name}
                                    </TableCell>
                                    <TableCell>
                                        {proposal.contact_phone}
                                    </TableCell>
                                    <TableCell>
                                        {proposal.proposal_submit_id}
                                    </TableCell>
                                    <TableCell>{proposal.university}</TableCell>
                                    <TableCell>{proposal.status}</TableCell>
                                    <TableCell align="right">
                                        <Stack direction="row">
                                            <Tooltip
                                                title="Edit"
                                                placement="top"
                                            >
                                                <IconButton
                                                    variant="contained"
                                                    color="secondary"
                                                    component={InertiaLink}
                                                    href={route(
                                                        "proposals.edit",
                                                        proposal.id
                                                    )}
                                                    style={{ marginRight: 10 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip
                                                title="change proposl status"
                                                placement="top"
                                            >
                                                <IconButton
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={(event) =>
                                                        handleStatusClick(
                                                            event,
                                                            proposal
                                                        )
                                                    }
                                                >
                                                    <SettingsIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    style={{ marginTop: 20 }}
                >
                    <Typography variant="body2">
                        Displaying {startItem} - {endItem} of {total}
                    </Typography>
                    <Stack direction="row" alignItems="center">
                        <FormControl
                            variant="outlined"
                            style={{
                                marginRight: 20,
                                minWidth: 120,
                            }}
                        >
                            <InputLabel>Items per page</InputLabel>
                            <Select
                                value={perPage}
                                onChange={handlePerPageChange}
                                label="Items per page"
                                size="small"
                            >
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </FormControl>
                        <Pagination
                            size="medium"
                            count={Math.ceil(total / perPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </Stack>
                </Stack>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleStatusClose}
                >
                    <MenuItem onClick={() => handleStatusChange("PENDING")}>
                        Pending
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange("REJECTED")}>
                        Rejected
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange("APPROVED")}>
                        Approved
                    </MenuItem>
                </Menu>
                <Modal open={showModal} onClose={() => setShowModal(false)}>
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 900,
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2>Fill Collaborator Details</h2>
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                                <TextField
                                    label="Collaborator PIC Name"
                                    value={collaboratorPicName}
                                    onChange={(e) =>
                                        setCollaboratorPicName(e.target.value)
                                    }
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid2>
                            <Grid2 size={6}>
                                <TextField
                                    label="Collaborator PIC Phone"
                                    value={collaboratorPicPhone}
                                    onChange={(e) =>
                                        setCollaboratorPicPhone(e.target.value)
                                    }
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid2>

                            {activityDates.map((date, index) => (
                                <Box
                                    key={index}
                                    display="flex"
                                    alignItems="center"
                                    width="100%"
                                    gap={3}
                                >
                                    <DateTimePicker
                                        label="Activity Date Start"
                                        value={date.start}
                                        onChange={(newValue) =>
                                            handleActivityDateChange(
                                                index,
                                                "start",
                                                newValue
                                            )
                                        }
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                fullWidth
                                                margin="normal"
                                            />
                                        )}
                                    />

                                    <DateTimePicker
                                        label="Activity Date End"
                                        value={date.end}
                                        onChange={(newValue) =>
                                            handleActivityDateChange(
                                                index,
                                                "end",
                                                newValue
                                            )
                                        }
                                        renderInput={(props) => (
                                            <TextField
                                                {...props}
                                                fullWidth
                                                margin="normal"
                                            />
                                        )}
                                    />

                                    <IconButton
                                        onClick={() =>
                                            handleRemoveActivityDate(index)
                                        }
                                        color="secondary"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            ))}
                        </Grid2>

                        <Box
                            sx={{
                                display: "flex",
                                marginTop: 2,
                            }}
                        >
                            <Button
                                onClick={handleAddActivityDate}
                                variant="contained"
                                color="secondary"
                            >
                                Add Another Date
                            </Button>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 2,
                            }}
                        >
                            <Button
                                onClick={handleModalSubmit}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
                <Modal
                    open={showRejectionModal}
                    onClose={() => setShowRejectionModal(false)}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            borderRadius: 3,
                            boxShadow: 24,
                            p: 4,
                        }}
                    >
                        <h2>Rejection Remark</h2>
                        <TextField
                            label="Remark"
                            value={rejectionRemark}
                            onChange={(e) => setRejectionRemark(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                marginTop: 2,
                            }}
                        >
                            <Button
                                onClick={handleRejectionSubmit}
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </DashboardTemplate>
        </LocalizationProvider>
    );
};

export default Index;
