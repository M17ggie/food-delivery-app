import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import { theme } from "@styles/global"
import { mdBreakpoint } from "../breakpoints";

const registerTheme: Theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    "&.steps-header": {
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                        [mdBreakpoint]: {
                            fontSize: "1rem",
                        },
                    },
                    "&.steps-primary": {
                        fontSize: "1.25rem",
                        [mdBreakpoint]: {
                            fontSize: "1rem",
                        },
                    },
                    "&.steps-secondary": {
                        fontSize: "1rem",
                        color: "#727278",
                    },
                    "&.details-title-text": {
                        fontSize: "1.5rem",
                        [mdBreakpoint]: {
                            fontSize: "1.25rem",
                        },
                    },
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    fontWeight: '5rem'
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button': {
                        '-webkit-appearance': 'none',
                        margin: 0,
                    },
                    '& input[type=number]': {
                        '-moz-appearance': 'textfield',
                    },
                },
            },
        },
    }
})

export const registerRestaurantTheme: Theme = createTheme(theme, registerTheme)