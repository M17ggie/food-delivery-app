import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, IconButton, Modal, Typography } from '@mui/material';
import LoginForm from '@components/login-signup/LoginForm';
import SignUpForm from '@components/login-signup/SignUpForm';

const Navbar = () => {

    // to open/close drawer************
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showLoginIn, setShowLogin] = useState(true);

    const authModalHandler = () => {
        setOpenAuthModal(false)
    }

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
                        <ListItem>
                            <Button onClick={() => { setOpenAuthModal(true) }}>
                                Login
                            </Button>
                        </ListItem>
                    </List>
                    <List sx={{ display: { xs: "none", sm: "block", } }}>
                        <ListItem>
                            <Button onClick={() => { setOpenAuthModal(true); setShowLogin(false) }}>
                                Signup
                            </Button>
                        </ListItem>
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
                            <ListItem>
                                <Button onClick={() => { setOpenAuthModal(true) }}>
                                    Login
                                </Button>
                            </ListItem>
                            <ListItem>
                                <Button onClick={() => { setOpenAuthModal(true); setShowLogin(false) }}>
                                    Signup
                                </Button>
                            </ListItem>
                        </List>
                    </Drawer>
                </Toolbar>
            </AppBar>

            <Modal open={openAuthModal} onClose={authModalHandler}>
                <Card sx={{ 'width': { md: '50%', sx: '100%' }, 'position': 'relative', 'transform': 'translate(50%,50%)', 'padding': '1rem' }}>
                    <div>
                        <CloseIcon onClick={authModalHandler} sx={{ 'marginLeft': 'auto' }} />
                    </div>
                    <div>
                        {showLoginIn && <LoginForm />}
                        {!showLoginIn && <SignUpForm />}
                        {showLoginIn && <Typography>
                            Not a member? <span onClick={() => { setShowLogin(false) }}>Sign up</span> here!
                        </Typography>}
                        {!showLoginIn && <Typography>
                            Already a member? <span onClick={() => { setShowLogin(true) }}>Log in</span> here!
                        </Typography>}
                    </div>
                </Card>
            </Modal>
        </>
    )
}

export default Navbar