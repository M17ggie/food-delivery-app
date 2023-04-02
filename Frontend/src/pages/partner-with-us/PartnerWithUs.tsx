import { Box, Card, Grid, Typography, Button } from '@mui/material'
import styles from './PartnerWithUs.module.css'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { HowItWorks, cardTitles, howItWorksData } from '@utils/texts/partner-with-us'
import { CardContent } from '@material-ui/core'
import AuthModal from '../../components/login-signup/AuthModal'
import { useState } from 'react'

const PartnerWithUs = () => {

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [modalTitle, setModalTitle] = useState('')

    // document card+++++++++++++++
    const DocumentCardItem = ({ title }: { title: string }): JSX.Element => (
        <Box sx={{
            display: 'flex',
        }}>
            <CheckCircle />
            <Typography sx={{ marginLeft: '1rem' }}>
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
        <>
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
                            variant='contained'
                            sx={{ marginRight: { xs: '0', md: '1rem' }, width: '25rem', padding: '1rem' }}
                            onClick={() => { signupContentHandler() }}
                        >
                            Register with us
                        </Button>
                        <Button
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
                maxWidth: { xs: "100%", sm: "75%" },
                margin: "0 auto",
                position: 'relative',
                top: '-4rem'
            }}>
                <Typography sx={{
                    fontSize: '1.5rem',
                }}>
                    Get started with online ordering
                </Typography>

                <Typography>
                    Keep the following documents ready for a smooth signup
                </Typography>

                <Grid sx={{ margin: 'auto', width: '50%' }} container spacing={{ xs: 1, md: 2 }} columns={2}>
                    {cardTitles.map((title: string, index: number) =>
                        <Grid item key={index} xs={12} md={1}>
                            <DocumentCardItem title={title} />
                        </Grid>
                    )}
                </Grid>
            </Card >

            {/* How it works ************************/}
            <Typography sx={{
                fontSize: '2.5rem',
                textAlign: 'center'
            }}>
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
                                <Typography>
                                    {element.step}
                                </Typography>
                                <Typography>
                                    {element.title}
                                </Typography>
                                <Typography>
                                    {element.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))
                }
            </Box>

            {/* auth modal****************** */}
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

export default PartnerWithUs