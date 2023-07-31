import AppBar from '@mui/material/AppBar';
import { Box, IconButton, List, ListItem, Toolbar } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@material-ui/core/Drawer';
import UserDropdown from "@components/profile/UserDropdown";
import { useState } from "react";



const Header = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const listItemsContent: React.ReactNode = <List key={0} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <ListItem>
            <UserDropdown />
        </ListItem>
    </List>

    const drawerListItemsContent: React.ReactNode = <List key={0} sx={{ display: "flex", flexDirection: { xs: "column" } }}>
        <ListItem>
            Profile
        </ListItem>
        <ListItem>
            Orders
        </ListItem>
        <ListItem>
            Logout
        </ListItem>
    </List>

    return (
        <>
            <AppBar elevation={0} sx={{ backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setOpenDrawer(prev => !prev)}>
                        <MenuIcon sx={{ "color": 'black' }} />
                    </IconButton>
                    {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                    </List> */}
                    <Box sx={{ marginLeft: 'auto', display: { xs: "none", sm: "flex" }, flexDirection: 'column' }}>
                        {listItemsContent}
                    </Box>

                    {/* Drawer component for pulling out the sidebar*********** */}
                    <Drawer PaperProps={{ style: { width: '25%' } }} open={openDrawer} onClose={() => { setOpenDrawer(false) }}>
                        {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                        </List> */}
                        {drawerListItemsContent}
                    </Drawer>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header