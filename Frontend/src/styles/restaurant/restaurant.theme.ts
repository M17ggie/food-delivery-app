import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { theme } from "@styles/global";

const restaurantTheme: Theme = createTheme({
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    ":hover": {
                        cursor: "pointer",
                        boxShadow: "0px 5px 10px rgba(75, 75, 75, 0.5)"
                    }
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    "restaurant-name": {
                        fontSize: "1.25rem"
                    }
                }
            }
        }
    }
})

export const restaurantStyle: Theme = createTheme(theme, restaurantTheme)