import { Alert } from "@mui/material";
import { useSelector } from "react-redux"

const Status = () => {
    const status = useSelector((state: any) => state.user.status);
    switch (status) {
        case "pending": return <Alert sx={{ marginTop: "4rem" }} severity="info">Your registration status is pending. We will let you know once your registration is approved.</Alert>;
        case "rejected": return <Alert sx={{ marginTop: "4rem" }} severity="error">Your registration has been rejected. Please contact support for more details.</Alert>;
        default: return null
    }
}

export default Status