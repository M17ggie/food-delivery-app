import { Box, Button, Card, Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { foodType, cuisineType, restaurantType, daysOfWeek } from '@locales/en/restaurant-registration/meta-detail'
import { toast } from 'react-toastify'
import * as yup from 'yup';

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
            <Typography>
                Restaurant Type & Timings
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                <Card sx={{ padding: '2rem' }}>
                    <Typography>
                        Food Type
                    </Typography>
                    <Typography>
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
                    <Typography>
                        Establishment Type
                    </Typography>
                    <Typography>
                        Select most relevant category for your restaurant type
                    </Typography>
                    <Typography>
                        {!!errors.restaurant && <p>{errors.restaurant}</p>}
                    </Typography>

                    <Typography>
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
                </Card>

                <Card sx={{ padding: '2rem' }}>
                    <Typography>
                        Type of cuisines
                    </Typography>
                    <Typography>
                        Select options which best describe food you serve
                    </Typography>
                    <Typography>
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
                    <Typography>
                        Restaurant operational hours
                    </Typography>
                    <Typography>
                        Add business hours
                    </Typography>
                    <Typography>
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
                    <Typography>
                        Mark open days
                    </Typography>
                    <Typography>
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
                <Button
                    onClick={() => { prev() }}
                    variant='contained'
                    sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}
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
            </Box >
        </>
    )
}

export default MetaDetail