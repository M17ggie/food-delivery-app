import React from 'react'
import { IFoodDish } from '@utils/interfaces/restaurant-registration/RestaurantRegister'
import { Box, Card, CardContent, CardMedia, Dialog, Grid, IconButton, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from 'react-redux';
import { openModal, removeDish, selectDishToEdit } from '@store/restaurant-register/dishReducer';
import { useSelector } from 'react-redux';
import AddDish from './AddDish';

const FoodDishCard = ({ id, name, price, description, photo, foodType, imageURL }: IFoodDish) => {
    const { isModalOpen } = useSelector((state: any) => state.dish)
    const dispatch = useDispatch();
    const removeDishHandler = () => {
        dispatch(removeDish({ id: id! }))
    }

    const editDishHandler = () => {
        dispatch(openModal());
        dispatch(selectDishToEdit({ id, name, price, description, photo, foodType, edit: true, imageURL }))
    }

    // console.log("PHOTO", photo, imageURL)

    return (
        <>
            {isModalOpen && <Dialog
                sx={{
                    '& .MuiDialog-paper': {
                        maxWidth: '90%',
                        width: { xs: '100%', sm: '40%' },
                        margin: { xs: 0, sm: '5vh auto 0' },
                    },
                    '& .MuiDialogTitle-root': {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    },
                    '& .MuiDialogTitle-root > .MuiIconButton-root': {
                        marginRight: '-12px',
                        marginTop: '-12px',
                    },
                }}
                open={isModalOpen}>
                <AddDish />
            </Dialog >}
            <Box position='relative'>
                <Card>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <CardMedia
                                component='img'
                                height='200'
                                image={imageURL || '/assets/dish-fallback.jpg'}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <CardContent>
                                <Typography>
                                    Name: {name}
                                </Typography>
                                <Typography>
                                    Description: {description}
                                </Typography>
                                <Typography>
                                    Price: {price}
                                </Typography>
                                <Typography>
                                    Food Type: {foodType}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
                <Box position="absolute" top="0" right="0">
                    <IconButton onClick={editDishHandler}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={removeDishHandler}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default FoodDishCard