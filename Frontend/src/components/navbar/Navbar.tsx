import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton, Box, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from '@components/login-signup/LoginForm';
import SignUpForm from '@components/login-signup/SignUpForm';
import UnAuthContent from '@components/content/UnAuthContent';
import AuthContent from '../content/AuthContent';
import UserDropdown from '../profile/UserDropdown';

const Navbar = ({ userType }: { userType: string }) => {

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

    const listItemsContent: React.ReactNode = <List key={0} sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}>
        <ListItem key={1}>
            <Link style={{ textDecoration: 'none' }} to="/partner-with-us">
                <Typography sx={{ whiteSpace: 'nowrap', color: 'white' }}>
                    Add Restaurant
                </Typography>
            </Link>
        </ListItem>
        <UnAuthContent>
            <ListItem key={2}>
                <Button className='primary-btn' onClick={() => { loginContentHandler() }}>
                    Login
                </Button>
            </ListItem>
            <ListItem key={3}>
                <Button className='secondary-btn' onClick={() => { signupContentHandler() }}>
                    Signup
                </Button>
            </ListItem>
        </UnAuthContent>
        <AuthContent key={4}>
            <ListItem>
                <UserDropdown />
            </ListItem>
        </AuthContent>
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

            {/* auth modal******************* */}
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
            }} open={openAuthModal} onClose={() => { authModalHandler() }}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {modalTitle}
                    <IconButton onClick={() => { authModalHandler() }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {showLogin && <LoginForm userType={userType} close={() => { authModalHandler() }} />}
                    {!showLogin && <SignUpForm userType={userType} login={() => { loginContentHandler() }} />}
                    <Typography sx={{ marginTop: '0.25rem' }}>
                        {showLogin && ['Not a member? ', <span onClick={() => { signupContentHandler() }}>Sign up</span>]}
                        {!showLogin && ['Already a member? ', <span onClick={() => { loginContentHandler() }}>Log in</span>]}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Navbar