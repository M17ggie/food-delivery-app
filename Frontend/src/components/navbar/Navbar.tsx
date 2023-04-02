import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Box } from '@mui/material';
import AuthModal from '@components/login-signup/AuthModal';

const Navbar = () => {

    // to open/close drawer************
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [modalTitle, setModalTitle] = useState('')

    const authModalHandler = () => {
        setOpenAuthModal(false)
    }

    const loginContentHandler: Function = () => {
        setOpenAuthModal(true);
        setShowLogin(true);
        setModalTitle('Login')
    }

    const signupContentHandler: Function = () => {
        setOpenAuthModal(true);
        setShowLogin(false);
        setModalTitle('Sign Up')
    }

    const listItemsContent: React.ReactNode = <List sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <ListItem>
            <Link to="/partner-with-us">
                Add Restaurant
            </Link>
        </ListItem>
        <ListItem>
            <Button onClick={() => { loginContentHandler() }}>
                Login
            </Button>
        </ListItem>
        <ListItem>
            <Button onClick={() => { signupContentHandler() }}>
                Signup
            </Button>
        </ListItem>
    </List>

    return (
        <>
            <AppBar elevation={0} sx={{ backgroundColor: 'transparent' }}>
                <Toolbar>
                    <IconButton sx={{ display: { xs: 'block', sm: 'none' } }} onClick={() => setOpenDrawer(prev => !prev)}>
                        <MenuIcon sx={{ "color": 'white' }} />
                    </IconButton>
                    {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                    </List> */}
                    <Box sx={{ marginLeft: 'auto', display: { xs: "none", sm: "flex" }, flexDirection: 'column' }}>
                        {listItemsContent}
                    </Box>

                    {/* Drawer component for pulling out the sidebar*********** */}
                    <Drawer PaperProps={{ style: { width: '75%' } }} open={openDrawer} onClose={() => { setOpenDrawer(false) }}>
                        {/* <List>
                        <ListItem>Add Logo Here</ListItem>
                        </List> */}
                        {listItemsContent}
                    </Drawer>
                </Toolbar>
            </AppBar>

            <AuthModal
                openAuthModal={openAuthModal}
                authModalHandler={authModalHandler}
                showLogin={showLogin}
                modalTitle={modalTitle}
                loginContentHandler={loginContentHandler}
                signupContentHandler={signupContentHandler}
            />
        </>
    )
}

export default Navbar