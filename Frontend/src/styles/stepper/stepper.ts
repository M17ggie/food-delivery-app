import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { theme } from "@styles/global"
import { mdBreakpoint } from "../breakpoints";

const stepper: Theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    "&.stepper-label": {
                        fontSize: "1rem",
                        [mdBreakpoint]: {
                            fontSize: "0.8rem",
                        },
                    },
                    "&.stepper-description": {
                        fontSize: "0.75rem",
                        color: "#727278",
                    },
                }
            }
        },
        MuiStepContent: {
            styleOverrides: {
                root: {
                    opacity: 1,
                },
            },
        },
    }
})

export const stepperTheme: Theme = createTheme(theme, stepper)