import { useRef, useState, useEffect } from 'react'
import { IFoodDish } from '../../utils/interfaces/restaurant-registration/RestaurantRegister'
import { Box, Button, CardContent, DialogTitle, TextField, IconButton, MenuItem } from '@mui/material'
import * as yup from 'yup'
import CloseIcon from '@mui/icons-material/Close';
import { FormControlLabel, Input, InputLabel, Radio, RadioGroup, Select, Typography } from '@material-ui/core';
import { dishType } from '@locales/en/restaurant-registration/food-detail';
import { randomId, selectValueHandler } from '@utils/helpers/helpers';
import { useDispatch } from 'react-redux';
import { addDish, editDish } from '@store/restaurant-register/dishReducer';
import { closeModal } from '@store/restaurant-register/dishReducer';
import { useSelector } from 'react-redux';


const AddDish = () => {

    const dispatch = useDispatch();
    const editDishState = useSelector((state: any) => state.dish.editDish)
    const id = randomId()
    const [dish, setDish] = useState<IFoodDish>({
        id: editDishState.id || id,
        name: editDishState.name || '',
        description: editDishState.description || '',
        photo: editDishState.photo || '',
        price: editDishState.price || null,
        foodType: editDishState.foodType || '',
        dishType: editDishState.dishType || '',
        imageURL: editDishState.imageURL || '/assets/dish-fallback.jpg'
    })
    const [imageFile, setImageFile] = useState<string>(editDishState.imageURL || "")
    const [errors, setErrors] = useState<any>({});
    const imageRef = useRef<HTMLImageElement>(null)

    const closeModalHandler = () => {
        dispatch(closeModal())
    }

    const schema = yup.object().shape({
        name: yup.string().required('Please add name of the dish').min(3, 'Name must be 3 characters long').max(20, 'Name must be not more than 20 characters'),
        description: yup.string().required('Please add a description of the dish').min(10, 'Description must be atleast 10 characters long').max(150, 'Description must be not more than 150 characters'),
        price: yup.number().typeError('Please enter valid price').test('price', 'Please enter valid price', val => /^[0-9]+$/.test(String(val))).required('Please enter price of the dish').min(10, 'Price must be at least 10 rupees'),
        foodType: yup.string().required('Please select the type of food'),
        dishType: yup.string().required('Please select the type the dish suites best')
    })

    const imageChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        const reader = new FileReader();
        if (files && files.length > 0) {
            reader.onload = () => {
                let imageHeight: any;
                let imageWidth: any;
                const img = imageRef.current;
                if (img) {
                    img.onload = () => {
                        imageHeight = img.naturalHeight;
                        imageWidth = img.naturalWidth;
                        if (files[0].size > 500000) {
                            setErrors({
                                ...errors,
                                photo: 'File size must be less than 800KB'
                            })
                        } else if (imageWidth > 800 && imageHeight > 800) {
                            setErrors({
                                ...errors,
                                photo: 'Image dimensions must be less than 800x800'
                            })
                        } else if (files[0].type !== 'image/jpeg') {
                            setErrors({
                                ...errors,
                                photo: 'Only JPEGs are allowed'
                            })
                        }
                        else {
                            setErrors({
                                ...errors,
                                photo: ''
                            })
                            setImageFile(reader.result as string)
                            setDish({
                                ...dish,
                                photo: files[0],
                                imageURL: reader.result as string
                            })
                        }
                    }
                    img.src = reader.result as string;
                }
            }
            reader.readAsDataURL(files[0])
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setDish({
            ...dish,
            [name]: value
        })
    }

    const selectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        const value = e.target.value as string;
        setDish({
            ...dish,
            dishType: selectValueHandler(value)
        })
    }

    const radioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDish({
            ...dish,
            foodType: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setErrors({})
            await schema.validate(dish, { abortEarly: false })
            if (editDishState.edit) {
                dispatch(editDish(dish))
            } else {
                dispatch(addDish(dish));
            }
            closeModalHandler();
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message
                })
                setErrors(newErrors)
            } else {
                console.log(err)
                console.log('This is beyond my scope');
            }
        }
    }

    return (
        <>
            <DialogTitle>
                Add Food Dish
                <IconButton onClick={closeModalHandler}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle >
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '50rem' }}>

                    <Box>
                        <label>
                            <img ref={imageRef} src={imageFile ? imageFile : '/assets/dish-fallback.jpg'} style={{ maxWidth: '15rem' }} />
                            <Input
                                id='imageInput'
                                type='file'
                                name='photo'
                                onChange={imageChangeHandler}
                                style={{ display: "none " }}
                            />
                        </label>
                        <Typography>
                            {!!errors.photo && errors.photo}
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '75%', gap: 1, marginTop: '1rem' }}>
                        <TextField
                            type='text'
                            size='small'
                            variant='outlined'
                            name='name'
                            placeholder='Name of the dish'
                            value={dish.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={<span style={{ color: 'red' }}>{errors.name}</span>}
                        />

                        <TextField
                            type='text'
                            size='small'
                            variant='outlined'
                            name='description'
                            placeholder='Description of the dish'
                            value={dish.description}
                            onChange={handleChange}
                            multiline
                            error={!!errors.description}
                            helperText={<span style={{ color: 'red' }}>{errors.description}</span>}
                        />

                        <InputLabel id='dishType'>
                            Select Dish Type
                        </InputLabel>
                        <Typography>
                            {!!errors.dishType && errors.dishType}
                        </Typography>
                        <Select
                            id='dishType'
                            value={dish.dishType}
                            name='dishType'
                            onChange={selectChange}
                            label='Select Dish Type'
                        >
                            {
                                dishType.map((type, index) => (
                                    <MenuItem sx={{ display: 'block' }} value={selectValueHandler(type)} key={index}>
                                        {type}
                                    </MenuItem>
                                ))
                            }
                        </Select>

                        <Typography>
                            {!!errors.foodType && errors.foodType}
                        </Typography>
                        <RadioGroup value={dish['foodType']} row onChange={radioChange}>
                            <FormControlLabel value="veg" control={<Radio />} label="Veg" />
                            <FormControlLabel value="nonveg" control={<Radio />} label="Non Veg" />
                        </RadioGroup>

                        <TextField
                            type='number'
                            size='small'
                            variant='outlined'
                            name='price'
                            placeholder='Price of the dish (in Rupees)'
                            value={dish.price}
                            onChange={handleChange}
                            error={!!errors.price}
                            helperText={<span style={{ color: 'red' }}>{errors.price}</span>}
                        />
                    </Box>

                </CardContent >
                <Button variant='contained' type="submit">
                    Add
                </Button>
                <Button variant='outlined' onClick={closeModalHandler}>
                    Cancel
                </Button>
            </Box >
        </>
    )
}

export default AddDish