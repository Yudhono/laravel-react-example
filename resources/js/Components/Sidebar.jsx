import React from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ open, toggleDrawer, handleMenuClick }) => {
    return (
        <div style={{ display: "flex" }}>
            <IconButton onClick={toggleDrawer} style={{ marginRight: "16px" }}>
                <MenuIcon />
            </IconButton>
            <Drawer variant="persistent" anchor="left" open={open}>
                <List>
                    <ListItem
                        button
                        onClick={() => handleMenuClick("Proposals")}
                    >
                        <ListItemText primary="Proposals" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => handleMenuClick("ProposalActivities")}
                    >
                        <ListItemText primary="Proposal Activities" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => handleMenuClick("Blogposts")}
                    >
                        <ListItemText primary="Blogposts" />
                    </ListItem>
                    <ListItem button onClick={() => handleMenuClick("QnA")}>
                        <ListItemText primary="QnA" />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
