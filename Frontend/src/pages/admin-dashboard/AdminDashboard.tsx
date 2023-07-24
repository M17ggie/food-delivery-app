import { Tab, Tabs } from "@mui/material"
import RestaurantList from "./RestaurantList"
import { useState } from "react"
import { ThemeProvider } from "@emotion/react";
import { adminDashboardTheme } from "@styles/admin-dashboard/admin-dashboard.theme";

const AdminDashboard = () => {

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const tabContentHandler = (tabValue: number) => {
        switch (tabValue) {
            case 0: return <RestaurantList />;
            case 1: return "Hi"
            default: return null
        }
    }

    return (
        <ThemeProvider theme={adminDashboardTheme}>
            <Tabs value={tabValue} onChange={handleTabChange} textColor="primary" indicatorColor="primary">
                <Tab label="Restaurants" />
                {/* <Tab label="Delivery Executives" /> */}
            </Tabs>
            {tabContentHandler(tabValue)}
        </ThemeProvider>
    )
}

export default AdminDashboard