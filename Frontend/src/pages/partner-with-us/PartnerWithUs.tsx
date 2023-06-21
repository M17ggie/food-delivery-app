import { Box, Card, Grid, Typography, Button, DialogTitle, DialogContent, Dialog, IconButton } from '@mui/material'
import styles from './PartnerWithUs.module.css'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { HowItWorks, cardTitles, howItWorksData } from '@locales/en/restaurant-registration/partner-with-us'
import { CardContent } from '@material-ui/core'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react'
import LoginForm from '@components/login-signup/LoginForm'
import SignUpForm from '@components/login-signup/SignUpForm'
import Navbar from '@components/navbar/Navbar'
import { ThemeProvider } from '@emotion/react'
import { registerRestaurantTheme } from '@styles/register-restaurant/register-restaurant-theme'

const PartnerWithUs = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [modalTitle, setModalTitle] = useState('')

    // document card+++++++++++++++
    const DocumentCardItem = ({ title }: { title: string }): JSX.Element => (
        <Box sx={{
            display: 'flex',
        }}>
            <CheckCircle className="check-mark" />
            <Typography className='steps-primary' sx={{ marginLeft: '1rem' }}>
                {title}
            </Typography>
        </Box>
    )

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
        <ThemeProvider theme={registerRestaurantTheme}>
            <Navbar userType='restaurant' />

            <div className="container">

                {/* image****** */}
                <div className={styles["image-container"]}>
                    <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '2.5rem', md: '3rem' }, textAlign: "center" }}>
                        Register your business with us
                    </Typography>
                    <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' } }}>
                        and get more customers!
                    </Typography>

                    <Box sx={{
                        display: "flex",
                        marginTop: '1rem',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}>
                        <Button
                            className='primary-btn'
                            variant='contained'
                            sx={{ marginRight: { xs: '0', md: '1rem' }, width: '25rem', padding: '1rem' }}
                            onClick={() => { signupContentHandler() }}
                        >
                            Register with us
                        </Button>
                        <Button
                            className="secondary-btn"
                            variant='contained'
                            sx={{ backgroundColor: 'white', color: 'black', width: '25rem', marginTop: { xs: '1rem', md: '0' }, padding: '1rem' }}
                            onClick={() => { loginContentHandler() }}
                        >
                            Already listed? Login now!
                        </Button>
                    </Box>
                </div>
            </div >

            {/* Documents card************ */}
            <Card sx={{
                textAlign: 'center',
                padding: "2rem",
                borderRadius: "15px",
                width: '65rem',
                maxWidth: { xs: "100%", sm: "75%" },
                margin: "0 auto",
                position: 'relative',
                top: '-4rem',
            }}>
                <Typography className='title-text'>
                    Get started with online ordering
                </Typography>

                <Typography className='title-text-secondary'>
                    Keep the following documents ready for a smooth signup
                </Typography>

                <Box sx={{ width: '45rem', margin: '1rem auto' }}>
                    <Grid container spacing={{ xs: 1, md: 2 }} columns={2}>
                        {cardTitles.map((title: string, index: number) =>
                            <Grid item key={index} xs={12} md={1}>
                                <DocumentCardItem title={title} />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </Card >

            {/* How it works ************************/}
            <Typography sx={{ textAlign: 'center' }} className='title-text'>
                How it works?
            </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }
            }}>
                {
                    howItWorksData.map((element: HowItWorks, index: number) => (
                        <Card key={index} variant='outlined' sx={{ width: '100%', margin: { xs: '1rem 0', md: '1rem 1rem' }, textAlign: 'center' }}>
                            {element.sprite}
                            <CardContent>
                                <Typography className="steps-header">
                                    {element.step}
                                </Typography>
                                <Typography className='steps-primary'>
                                    {element.title}
                                </Typography>
                                <Typography className='steps-secondary'>
                                    {element.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box>

            {/* auth modal****************** */}
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
                    {showLogin && <LoginForm userType='restaurant' close={() => { authModalHandler() }} />}
                    {!showLogin && <SignUpForm userType='restaurant' login={() => { loginContentHandler() }} />}
                    <Typography sx={{ marginTop: '0.25rem' }}>
                        {showLogin && ['Not a member? ', <span onClick={() => { signupContentHandler() }}>Sign up</span>]}
                        {!showLogin && ['Already a member? ', <span onClick={() => { loginContentHandler() }}>Log in</span>]}
                    </Typography>
                </DialogContent>
            </Dialog>
        </ThemeProvider>
    )
}

export default PartnerWithUs