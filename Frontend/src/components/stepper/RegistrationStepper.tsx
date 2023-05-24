import { Box, Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { useState } from "react"
import { RegisterSteps, registerSteps } from "@locales/en/restaurant-registration/registration-stepper";

interface IRegistrationStepper {
    activeStep: number
}

const RegistrationStepper = ({ activeStep }: IRegistrationStepper) => {

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            {registerSteps.map((step: RegisterSteps, index: number) => (
                <Step key={index}>
                    <StepLabel>
                        <Typography>
                            {step.label}
                        </Typography>
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            {step.description}
                        </Typography>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}

export default RegistrationStepper