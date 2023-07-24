import { ThemeProvider } from '@emotion/react'
import { Box, Grid, Typography } from '@mui/material'
import { restaurantStyle } from '@styles/restaurant/restaurant.theme'
import RestaurantCard from './RestaurantCard'


const RestaurantList = () => {
    return (
        <ThemeProvider theme={restaurantStyle}>
            <Box>
                <Typography>
                    Restaurants and Eateries
                </Typography>

                <Grid container spacing={2}>
                    {[...Array(7)].map((restaurant: any, index: number) => (
                        <Grid key={index} item xs={12} md={4}>
                            <RestaurantCard />
                        </Grid>
                    ))}
                </Grid >
            </Box>
        </ThemeProvider>
    )
}

export default RestaurantList