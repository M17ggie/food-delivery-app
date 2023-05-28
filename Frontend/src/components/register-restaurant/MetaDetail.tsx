import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { foodType, cuisineType, restaurantType, daysOfWeek } from '@locales/en/restaurant-registration/meta-detail'
import { toast } from 'react-toastify'
import * as yup from 'yup';
import { CardContent } from '@material-ui/core';

const MetaDetail = ({ next, prev }: { next: Function, prev: Function }) => {

    const [isLoading, setIsLoading] = useState(false)
    const [slots, setSlots] = useState([{ from: "", to: "" }]);
    const [metaDetail, setMetaDetail] = useState<any>({
        food: foodType.reduce((acc, curr) => ({ ...acc, [curr.toLowerCase().split(" ").join("")]: false }), {}),
        restaurant: restaurantType.reduce((acc, curr) => ({ ...acc, [curr.toLowerCase().split(" ").join("")]: false }), {}),
        cuisine: cuisineType.reduce((acc, curr) => ({ ...acc, [curr.toLowerCase().split(" ").join("")]: false }), {}),
        daysOfWeek: daysOfWeek.reduce((acc, curr) => ({ ...acc, [curr.toLowerCase().split(" ").join("")]: false }), {})
    });
    const [errors, setErrors] = useState<any>({});

    const addSlot = () => {
        if (slots.length < 5) {
            setSlots([...slots, { from: "", to: "" }])
        } else {
            toast.error('Can\'t add more than 5 time slots')
        }
    }

    const removeSlot = (index: number) => {
        const newSlots = [...slots];
        newSlots.splice(index, 1);
        setSlots(newSlots)
    }

    const handleChange = (e: React.SyntheticEvent, dataType: string, field: string) => {
        const target = e.target as HTMLInputElement
        setMetaDetail({ ...metaDetail, [dataType]: { ...metaDetail[dataType], [field.toLowerCase().split(" ").join("")]: target.checked } })
    }

    const slotTimeHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number, field: 'from' | 'to') => {
        const newTimeSlots = [...slots];
        newTimeSlots[index][field] = e.target.value;
        setSlots(newTimeSlots);
    }

    const schema = yup.object().shape({
        cuisine: yup.object().test('atleast-one-true', 'At least one cuisine must be selected', value => Object.values(value).some(val => val === true)),
        restaurant: yup.object().test('atleast-one-true', 'At least one type must be selected', value => Object.values(value).some(val => val === true)),
        food: yup.object().test('atleast-one-true', 'At least one food must be selected', value => Object.values(value).some(val => val === true)),
        daysOfWeek: yup.object().test('atleast-one-true', 'At least one day must be selected', value => Object.values(value).some(val => val === true)),
        slots: yup.array().of(
            yup.object().shape({
                from: yup.string().test('valid-time', 'Please add valid time', value => value !== "").required('Please add valid time'),
                to: yup.string().test('valid-time', 'Please add valid time', value => value !== "").required('Please add valid time')
            }).test('non-empty', 'Please add atleast one time slot', value => Object.values(value).every(val => val !== ""))
        )
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await schema.validate({ ...metaDetail, slots }, { abortEarly: false });
            setErrors({})

            next();
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                    if (/^slots\[(0|[1-4])]\.to$/.test(error.path) || /^slots\[(0|[1-4])]\.from$/.test(error.path)) {
                        newErrors['slot'] = error.message
                    } else if (/^slots\[([0-4])\]/.test(error.path)) {
                        newErrors['slot-time'] = error.message
                    }
                    else {
                        newErrors[error.path] = error.message
                    }
                })
                console.log(newErrors)
                setErrors(newErrors)
            } else {
                console.log('This is beyond my scope');
            }
        }
        setIsLoading(false)
    }

    return (
        <>
            <Typography className="details-title-text">
                Restaurant Type & Timings
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                <Card>
                    <CardContent>
                        <Typography className='steps-primary'>
                            Food Type
                        </Typography>
                        <Typography className='steps-secondary'>
                            Select most relevant category for your restaurant type
                        </Typography>
                        <Typography className='error-text'>
                            {!!errors.food && <p>{errors.food}</p>}
                        </Typography>
                        <Grid container>
                            {foodType.map((type: string, index: number) =>
                                <Grid key={index} item>
                                    <FormControlLabel
                                        name={type}
                                        label={type}
                                        value={metaDetail['food'][type]}
                                        control={<Checkbox />}
                                        onChange={(e: React.SyntheticEvent) => { handleChange(e, 'food', type) }}
                                    />
                                </Grid>
                            )}
                        </Grid>
                        <Typography className="steps-primary">
                            Establishment Type
                        </Typography>
                        <Typography className='error-text'>
                            {!!errors.restaurant && <p>{errors.restaurant}</p>}
                        </Typography>

                        <Typography className='steps-secondary'>
                            Select options which best describe your restaurant
                        </Typography>
                        <FormControl>
                            <Grid container spacing={2}>
                                {
                                    restaurantType.map((type: string, index: number) => (
                                        <Grid key={index} item xs={6} sm={3}>
                                            <FormControlLabel
                                                name={type}
                                                label={type}
                                                value={metaDetail["restaurant"][type.toLowerCase()]}
                                                control={<Checkbox />}
                                                onChange={(e: React.SyntheticEvent) => { handleChange(e, 'restaurant', type) }}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                        </FormControl>
                    </CardContent>
                </Card>

                <Card sx={{ padding: '2rem' }}>
                    <Typography className="details-title-text">
                        Type of cuisines
                    </Typography>
                    <Typography className='steps-secondary'>
                        Select options which best describe food you serve
                    </Typography>
                    <Typography className='error-text'>
                        {!!errors.cuisine && <p>{errors.cuisine}</p>}
                    </Typography>

                    <FormControl>
                        <Grid container spacing={2}>
                            {
                                cuisineType.map((cuisine: string, index: number) => (
                                    <Grid key={index} item xs={6} sm={3}>
                                        <FormControlLabel
                                            name={cuisine}
                                            label={cuisine}
                                            value={metaDetail["cuisine"][cuisine.toLowerCase()]}
                                            control={<Checkbox />}
                                            onChange={(e: React.SyntheticEvent) => { handleChange(e, 'cuisine', cuisine) }}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </FormControl>
                </Card>

                <Card sx={{ padding: '2rem' }}>
                    <Typography className='details-title-text'>
                        Restaurant operational hours
                    </Typography>
                    <Typography className='steps-secondary'>
                        Add business hours
                    </Typography>
                    <Typography className="error-text">
                        {!!errors['slot-time'] && <p>{errors['slot-time']}</p>}
                        {!!errors.slot && <p>{errors.slot}</p>}
                    </Typography>

                    <div>
                        {slots.map((slot, index) => (
                            <Grid container key={index}>
                                <Grid item xs={2}>
                                    <input type='time' value={slot.from} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { slotTimeHandler(e, index, 'from') }} />
                                </Grid>
                                <Grid item xs={2}>
                                    <input type='time' value={slot.to} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { slotTimeHandler(e, index, 'to') }} />
                                </Grid>
                                <Grid item>
                                    <button onClick={(e: React.MouseEvent) => { e.preventDefault(); addSlot() }}>
                                        Add slot
                                    </button>
                                </Grid>
                                {slots.length > 1 && index > 0 && <Grid item>
                                    <button onClick={(e: React.MouseEvent) => { e.preventDefault(); removeSlot(index) }}>
                                        Remove slot
                                    </button>
                                </Grid>}
                            </Grid>
                        ))}
                    </div>
                    <Typography className='steps-secondary'>
                        Mark open days
                    </Typography>
                    <Typography className="error-text">
                        {!!errors.daysOfWeek && <p>{errors.daysOfWeek}</p>}
                    </Typography>

                    <FormControl>
                        <Grid container spacing={2}>
                            {daysOfWeek.map((day: string) =>
                                < Grid item xs={6} sm={3}>
                                    <FormControlLabel label={day} control={<Checkbox />} onChange={(e: React.SyntheticEvent) => handleChange(e, 'daysOfWeek', day)} />
                                </Grid>
                            )}
                        </Grid>
                    </FormControl>
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
                        Next
                    </Button>
                </Box>
            </Box >
        </>
    )
}

export default MetaDetail