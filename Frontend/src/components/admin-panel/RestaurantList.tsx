import { Tab, Tabs } from "@mui/material"
import { useState } from "react"
import PendingList from "./PendingList";
const RestaurantList = () => {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (e: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    }

    const tabContentHandler = (tabValue: number) => {
        switch (tabValue) {
            case 0: return <PendingList userType="restaurant" />;
            case 1: return "APPROVED STATE";
            case 2: return "REJECTED STATE";
            default: return null
        }
    }

    return (
        <>
            <Tabs value={tabValue} onChange={handleTabChange} textColor="secondary" indicatorColor="secondary" >
                <Tab label="Pending" />
                <Tab label="Approved" />
                <Tab label="Rejected" />
            </Tabs>
            {tabContentHandler(tabValue)}
        </>
    )
}

export default RestaurantList