import { Box, Button, Card, Input, Typography, Dialog } from '@mui/material'
import { useEffect, useState } from 'react'
import { IFoodDetail, IFoodDish } from '@utils/interfaces/restaurant-registration/RestaurantRegister'
import * as yup from 'yup'
import FoodDishCard from '@components/food-dish/FoodDishCard'
import AddDish from '@components/food-dish/AddDish'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { openModal } from '@store/restaurant-register/dish.reducer'
import { CardContent } from '@material-ui/core'
import { addRestaurantDetails } from '@store/restaurant-register/restaurant-details'
import { registerRestaurantHandler } from '@api/restaurantApi'
import { fileSchema } from '@utils/validation/validation'
import { AppDispatch } from '../../store'

const FoodDetail = ({ next, prev }: { next: Function, prev: Function }) => {

    const dispatch = useDispatch<AppDispatch>();
    const { dishes, isModalOpen: showAddDishModal } = useSelector((state: any) => state.dish);
    const { metaDetail, basicDetail } = useSelector((state: any) => state.restaurantDetails)
    const [foodDetail, setFoodDetail] = useState<IFoodDetail>({
        menuCard: null,
        foodDishes: dishes
    });
    useEffect(() => {
        setFoodDetail({
            ...foodDetail,
            foodDishes: dishes
        })
        dispatch(addRestaurantDetails({
            type: "foodDetail",
            details: {
                ...foodDetail,
                foodDishes: dishes
            }
        }))
    }, [dishes]);
    const [errors, setErrors] = useState<any>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = reader.result as string;
                setFoodDetail({ ...foodDetail, [name]: base64Data })
            }
            reader.readAsDataURL(files[0])
        }
    }

    const dishModalHandler = () => {
        dispatch(openModal())
    }

    const schema = yup.object().shape({
        menuCard: fileSchema
    });

    console.log(foodDetail)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await schema.validate(foodDetail, { abortEarly: false });
            setErrors({});
            dispatch(registerRestaurantHandler({
                basicDetail,
                metaDetail,
                foodDetail
            }));
            dispatch(addRestaurantDetails({
                type: "basicDetail",
                details: {}
            }))
            dispatch(addRestaurantDetails({
                type: "metaDetail",
                details: {}
            }))
            dispatch(addRestaurantDetails({
                type: "foodDetail",
                details: {}
            }))
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message
                })
                console.log(newErrors)
                setErrors(newErrors)
            } else {
                console.log('This is beyond my scope');
            }
        }
    }

    return (
        <>

            {/* Add Dish Modal**************************** */}
            {showAddDishModal && <Dialog
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
                open={showAddDishModal}>
                <AddDish />
            </Dialog >}

            {/* Food Details*********************************** */}
            <Box onSubmit={handleSubmit} component='form' sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Card>
                    <CardContent>
                        <Typography className='details-title-text'>
                            Restaurant Menu
                        </Typography>
                        <Typography className='steps-secondary'>
                            Add images of your restaurant's menu card
                        </Typography>
                        <Typography className='error-text'>
                            {!!errors.menuCard && errors.menuCard}
                        </Typography>
                        <Input
                            name='menuCard'
                            inputProps={{ multiple: true }}
                            type='file'
                            onChange={handleChange}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography className='details-title-text'>
                            Food Dishes
                        </Typography>
                        <Typography className='steps-primary'>
                            Add food dishes that are available at your restaurant.
                        </Typography>
                        <Typography className='steps-secondary'>
                            Add photo images of the dishes, description of the dishes so that the user can get additional info about the dish
                        </Typography>

                        <Button
                            variant='outlined'
                            onClick={dishModalHandler}
                        >
                            Add Dish
                        </Button>
                        <Box mt={2}>
                            {foodDetail && foodDetail.foodDishes && foodDetail.foodDishes.map((dish, index) =>
                                <Box key={index} mb={3}>
                                    <FoodDishCard {...dish} />
                                </Box>
                            )}
                        </Box>
                    </CardContent>
                </Card>

                <Box sx={{ display: "flex", md: { flexDirection: 'row' }, gap: '2' }}>
                    <Button
                        onClick={() => { prev() }}
                        variant='outlined'
                        sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}
                        className='secondary-btn'
                    >
                        Go Back
                    </Button>
                    <Button
                        type='submit'
                        variant='contained'
                        sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default FoodDetail