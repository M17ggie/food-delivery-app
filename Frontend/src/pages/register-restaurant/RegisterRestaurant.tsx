import BasicDetail from '@components/register-restaurant/BasicDetail'
import RegistrationStepper from '@components/stepper/RegistrationStepper'
import { Box, Grid } from '@mui/material'
import { useState } from 'react';
import MetaDetail from '@components/register-restaurant/MetaDetail';
import FoodDetail from '@components/register-restaurant/FoodDetail';
import { ThemeProvider } from '@emotion/react';
import { registerRestaurantTheme } from '@styles/register-restaurant/register-restaurant-theme';

const RegisterRestaurant = () => {

    const [activeStep, setActiveStep] = useState(0);

    const nextStep = () => {
        setActiveStep(prevStep => prevStep + 1)
    }

    const prevStep = () => {
        setActiveStep(prevStep => prevStep - 1)
    }

    const steps = {
        next: nextStep,
        prev: prevStep
    }

    const stepContentHandler = (activeStep: number) => {
        switch (activeStep) {
            case 0: return <BasicDetail {...steps} />

            case 1: return <MetaDetail {...steps} />

            case 2: return <FoodDetail {...steps} />
        }
    }

    return (
        <ThemeProvider theme={registerRestaurantTheme}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh'
            }}>
                <Grid container spacing={2}>
                    <Grid item sm={2}>
                        <Box sx={{ position: 'sticky', top: "1rem" }}>
                            <RegistrationStepper activeStep={activeStep} />
                        </Box>
                    </Grid>
                    <Grid item sm={7}>
                        {stepContentHandler(activeStep)}
                    </Grid>
                </Grid >
            </Box>
        </ThemeProvider>
    )
}

export default RegisterRestaurant