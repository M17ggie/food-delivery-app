import { Box, Card, Grid, Typography } from '@mui/material'
import styles from './PartnerWithUs.module.css'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { HowItWorks, cardTitles, howItWorksData } from '@utils/texts/partner-with-us'
import { CardContent } from '@material-ui/core'

const PartnerWithUs = () => {

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
                        <Card variant='outlined' sx={{ width: '100%', margin: { xs:'1rem 0',md: '1rem 1rem' }, textAlign: 'center' }}>
                            {/* <Box sx={{
                                textAlign: 'center'
                            }}> */}
                            {element.sprite}
                            {/* </Box> */}
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
        </>
    )
}

export default PartnerWithUs