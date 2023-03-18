import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, IconButton, Dialog, Typography, DialogTitle, DialogContent } from '@mui/material';
import LoginForm from '@components/login-signup/LoginForm';
import SignUpForm from '@components/login-signup/SignUpForm';

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
                    <List sx={{ marginLeft: 'auto', display: { xs: "none", sm: "block", } }}>
                        <ListItem>
                            <Link to="/partner-with-us">
                                Add Restaurant
                            </Link>
                        </ListItem>
                    </List>
                    <List sx={{ display: { xs: "none", sm: "block", } }}>
                        <ListItem>
                            <Button onClick={() => { loginContentHandler() }}>
                                Login
                            </Button>
                        </ListItem>
                    </List>
                    <List sx={{ display: { xs: "none", sm: "block", } }}>
                        <ListItem>
                            <Button onClick={() => { signupContentHandler() }}>
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
                    </Drawer>
                </Toolbar>
            </AppBar>

            <Dialog sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '90%',
                    width: { xs: '100%', sm: '40%' },
                    margin: { xs: 0, sm: '5vh auto 0' },
                },
                '& .MuiDialogTitle-root': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                },
                '& .MuiDialogTitle-root > .MuiIconButton-root': {
                    marginRight: '-12px',
                    marginTop: '-12px',
                },
            }} open={openAuthModal} onClose={authModalHandler}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {modalTitle}
                    <IconButton>
                        <CloseIcon onClick={authModalHandler} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {showLogin && <LoginForm />}
                    {!showLogin && <SignUpForm />}
                    <Typography sx={{ marginTop: '0.25rem' }}>
                        {showLogin && 'Not a member? '}
                        {showLogin && <span onClick={() => { signupContentHandler() }}>Sign up</span>}
                        {!showLogin && 'Already a member? '}
                        {!showLogin && <span onClick={() => { loginContentHandler() }}>Log in</span>}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Navbar