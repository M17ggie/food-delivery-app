import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';

// card titles******************
export const cardTitles: string[] = ["FSSAI license copy", "PAN card copy", "Bank Account Details", "Restaurant Menu", "Dish Images"];


//how it works*****************
export interface HowItWorks {
    title: string,
    step: string,
    body: string,
    sprite: JSX.Element
}

export const howItWorksData: HowItWorks[] = [
    {
        sprite: <StorefrontOutlinedIcon sx={{ fontSize: 60 }} />,
        step: 'Step 1',
        title: 'Create your page on Food Cab',
        body: 'Help users discover your place by creating a listing on Food Cab'
    },
    {
        sprite: <DeliveryDiningOutlinedIcon sx={{ fontSize: 60 }} />,
        step: 'Step 2',
        title: 'Register for online ordering',
        body: 'And deliver orders to millions of customers with ease'
    },
    {
        sprite: <RoomServiceOutlinedIcon sx={{ fontSize: 60 }} />,
        step: 'Step 3',
        title: 'Start receiving orders online',
        body: 'Manage orders on our partner app, web dashboard or API partners'
    }
]