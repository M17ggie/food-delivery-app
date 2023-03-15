import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

const Navbar = () => {

    // to open/close drawer************
    const [openDrawer, setOpenDrawer] = useState(false)

    return (
        <>
            <AppBar sx={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setOpenDrawer(prev => !prev)}>
                        <MenuIcon sx={{ "color": 'white' }} />
                    </IconButton>
                    {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                    </List> */}
                    <List sx={{ marginLeft: 'auto', display: { xs: "none", sm: "block", } }}>
                        <ListItem>
                            <Link to="/partner-with-us">
                                Add Restaurant
                            </Link>
                        </ListItem>
                    </List>
                    <List sx={{ display: { xs: "none", sm: "block", } }}>
                        <ListItem>Login</ListItem>
                    </List>
                    <List sx={{ display: { xs: "none", sm: "block", } }}>
                        <ListItem>Signup</ListItem>
                    </List>

                    {/* Drawer component for pulling out the sidebar*********** */}
                    <Drawer PaperProps={{ style: { width: '75%' } }} open={openDrawer} onClose={() => { setOpenDrawer(false) }}>
                        {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                        </List> */}
                        <List>
                            <ListItem>
                                <Link to="/partner-with-us">
                                    Add Restaurant
                                </Link>
                            </ListItem>
                            <ListItem>Login</ListItem>
                            <ListItem>Signup</ListItem>
                        </List>
                    </Drawer>

                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar