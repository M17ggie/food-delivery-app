import { Theme, createTheme } from "@mui/material";
import { theme } from "@styles/global";

const adminDashboardStyle: Theme = createTheme({
    palette: {
        primary: {
            main: "#f50057",
        },
    },
    components: {}
})

export const adminDashboardTheme: Theme = createTheme(theme, adminDashboardStyle)