import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material";
import { mdBreakpoint } from "./breakpoints";

export const theme: Theme = createTheme({
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    "&.title-text": {
                        fontSize: "2rem",
                        [mdBreakpoint]: {
                            fontSize: "1.5rem",
                        },
                    },
                    "&.title-text-secondary": {
                        fontSize: "1.5rem",
                        textAlign: 'center',
                        color: "#727278",
                        [mdBreakpoint]: {
                            fontSize: "1.25rem",
                        },
                    },
                    "&.error-text": {
                        fontFamily: "Roboto, Helvetica, Arial, sans- serif",
                        fontWeight: "400",
                        fontSize: "0.75rem",
                        lineHeight: "1.66",
                        letterSpacing: "0.03333em",
                        textAlign: "left",
                        color: 'red'
                    }
                },
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    "&.primary-btn": {
                        backgroundColor: "#f50057",
                        color: '#fff',
                        "&:hover": {
                            backgroundColor: "#c40048 ",
                        }
                    },
                    '&.secondary-btn': {
                        backgroundColor: "#fff",
                        color: '#000',
                        "&:hover": {
                            backgroundColor: "#d1d1d1 ",
                        },
                        borderColor: '#d1d1d1'
                    },
                    '&.other-btn': {
                        backgroundColor: "#0000ff",
                        color: '#fff',
                    },
                }
            }
        },
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    "&.check-mark": {
                        color: "#3AB757"
                    }
                }
            }
        },
        MuiCheckbox: {
            defaultProps: {
                color: "primary"
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderTop: "1px solid #e0e0e0"
                }
            }
        }
    }
})