import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const RestaurantCard = () => {
    return (
        <Card>
            <CardMedia component="img" />
            <CardContent>
                <Typography className="restaurant-name">
                    Restaurant Title
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RestaurantCard