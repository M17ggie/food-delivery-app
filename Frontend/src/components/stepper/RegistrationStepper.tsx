import { Step, StepContent, StepLabel, Stepper, Typography } from "@mui/material";
import { RegisterSteps, registerSteps } from "@locales/en/restaurant-registration/registration-stepper";
import { ThemeProvider } from "@emotion/react";
import { stepperTheme } from "@styles/stepper/stepper"
import { Card, CardContent } from "@material-ui/core";

interface IRegistrationStepper {
    activeStep: number
}

const RegistrationStepper = ({ activeStep }: IRegistrationStepper) => {

    return (
        <ThemeProvider theme={stepperTheme}>
            <Card>
                <CardContent>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {registerSteps.map((step: RegisterSteps, index: number) => (
                            <Step key={index}>
                                <StepLabel>
                                    <Typography className="stepper-label">
                                        {step.label}
                                    </Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography className="stepper-description">
                                        {step.description}
                                    </Typography>
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </CardContent>
            </Card>
        </ThemeProvider>
    )
}

export default RegistrationStepper