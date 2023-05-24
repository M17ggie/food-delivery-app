import BasicDetail from '@components/register-restaurant/BasicDetail'
import RegistrationStepper from '@components/stepper/RegistrationStepper'
import { Box, Grid } from '@mui/material'
import { useState } from 'react';
import MetaDetail from '@components/register-restaurant/MetaDetail';
import FoodDetail from '@components/register-restaurant/FoodDetail';

const RegisterRestaurant = () => {

    const [activeStep, setActiveStep] = useState(2);

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
            case 0: return <Grid item sm={9}>
                <BasicDetail {...steps} />
            </Grid>

            case 1: return <Grid item sm={9}>
                <MetaDetail {...steps} />
            </Grid>

            case 2: return <Grid item sm={9}>
                <FoodDetail {...steps} />
            </Grid>
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Grid container spacing={2}>
                    <Grid item sm={3}>
                        <RegistrationStepper activeStep={activeStep} />
                    </Grid>
                    {stepContentHandler(activeStep)}
                </Grid >
            </Box>
        </>
    )
}

export default RegisterRestaurant