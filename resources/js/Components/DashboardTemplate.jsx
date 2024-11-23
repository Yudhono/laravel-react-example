import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Divider,
    Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { router } from "@inertiajs/react"; // Import Inertia

const drawerWidth = 240;

const DashboardTemplate = ({ children }) => {
    const [open, setOpen] = useState(true); // Set initial state to true to keep the drawer open

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleNavigation = (url) => {
        router.get(url);
        setOpen(true); // Keep the drawer open after navigation
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={toggleDrawer}
                        sx={{ mr: 2 }}
                    >
                        {open ? <ChevronLeftIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                anchor="left"
                open={open}
                sx={{
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
                }}
            >
                <Toolbar />
                <Divider />
                <List>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        button
                        onClick={() => handleNavigation("/dashboard")}
                    >
                        <ListItemText primary="Dashboard" />
                    </ListItem>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        button
                        onClick={() => handleNavigation("/proposals")}
                    >
                        <ListItemText primary="Proposals" />
                    </ListItem>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        button
                        onClick={() => handleNavigation("/proposal-activities")}
                    >
                        <ListItemText primary="Proposals Activities" />
                    </ListItem>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        button
                        onClick={() => handleNavigation("/blogposts")}
                    >
                        <ListItemText primary="Blogposts" />
                    </ListItem>
                    <ListItem
                        sx={{ cursor: "pointer" }}
                        button
                        onClick={() => handleNavigation("/qnas")}
                    >
                        <ListItemText primary="QnA" />
                    </ListItem>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: "background.default",
                    p: 3,
                    transition: (theme) =>
                        theme.transitions.create(["margin", "width"], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    marginLeft: open ? `${drawerWidth}px` : 0,
                    width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust width based on drawer state
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default DashboardTemplate;
