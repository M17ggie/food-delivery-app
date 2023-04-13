import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React from 'react'

const RegisterRestaurant = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitted')
    }

    return (
        <>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    name='restaurantName'
                    id='restaurantName'
                    size="small"
                    variant='outlined'
                    placeholder="Restaurant's Name"
                    required
                />

                <TextField
                    name="restaurantAddress"
                    id="restaurantAddress"
                    size='small'
                    variant='outlined'
                    placeholder="Restaurant's complete address"
                    required
                />

                <Box>
                    <Typography>
                        Please place the pin accurately at your outlet's location on the map.
                    </Typography>
                    <Typography>
                        This will help your customers and Food Cab riders to locate your store.
                    </Typography>
                    <Box>
                        *********MAP****************
                    </Box>
                    <Typography>
                        or directly enter the co-ordinates
                    </Typography>

                    <TextField
                        name="latitude"
                        id="latitude"
                        size='small'
                        variant='outlined'
                        placeholder='Latitude'
                    />

                    <TextField
                        name="longitude"
                        id="longitude"
                        size='small'
                        variant='outlined'
                        placeholder='Longitude'
                    />
                </Box>

                <Box>
                    <Typography>
                        Call Details
                    </Typography>

                    <Typography>
                        Your customers will call on this number for general enquiries
                    </Typography>

                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>+91</InputAdornment>
                        }}
                        name="restaurantPhoneNumber"
                        id="restaurantPhoneNumber"
                        placeholder='Mobile number at restaurant'
                        variant='outlined'
                        size='small'
                        required
                    />
                </Box>

                <Box>
                    <Typography>
                        Restaurant owner details
                    </Typography>
                    <Typography>
                        This will be used for official communication by us.
                    </Typography>

                    <TextField
                        InputProps={{
                            startAdornment: <InputAdornment position='start'>+91</InputAdornment>
                        }}
                        name="ownerPhoneNumber"
                        id="ownerPhoneNumber"
                        placeholder="Owner's Mobile number"
                        variant='outlined'
                        size='small'
                        required
                    />

                    <Box>
                        <TextField
                            type="text"
                            name="name"
                            id="name"
                            size="small"
                            variant='outlined'
                            placeholder="Owner's Full Name"
                            required
                        />


                        <TextField
                            inputProps={{ inputMode: 'email' }}
                            size="small"
                            name="email"
                            id="email"
                            variant='outlined'
                            placeholder="Restaurant's Email"
                            required
                        />
                    </Box>
                </Box>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}
                >
                    Next
                </Button>
            </Box>
        </>

    )
}

export default RegisterRestaurant