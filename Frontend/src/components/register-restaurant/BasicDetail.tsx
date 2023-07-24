import { Box, Button, Grid, InputAdornment, TextField, Typography, Card } from '@mui/material'
import React, { useState } from 'react'
import MapElement from '@components/map/MapElement';
import { IBasicDetails } from '@utils/interfaces/restaurant-registration/RestaurantRegister';
import * as yup from 'yup'
import { CardContent, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addRestaurantDetails } from '@store/restaurant-register/restaurant-details';
import { useSelector } from 'react-redux';
import { fileSchema, validationHandler } from '@utils/validation/validation';

const BasicDetail = ({ next, prev }: { next: Function, prev: Function }) => {

    const dispatch = useDispatch();
    const storedBasicDetail = useSelector((state: any) => state.restaurantDetails.basicDetail);
    const [isLoading, setIsLoading] = useState(false);
    const [basicDetails, setBasicDetails] = useState<IBasicDetails>(() => {
        if (Object.keys(storedBasicDetail).length === 0) {
            return {
                restaurantName: '',
                restaurantAddress: '',
                restaurantPhoneNumber: null,
                restaurantEmail: '',
                fssaiLicense: null,
                location: { latitude: null, longitude: null },
                ownerPhoneNumber: null,
                ownerName: "",
                bankAccountNumber: null,
                ifscCode: '',
                blankCheque: null
            };
        } else {
            return storedBasicDetail;
        }
    });
    const [errors, setErrors] = useState<any>({});
    const schema = yup.object().shape({
        restaurantName: yup.string().required('Please enter restaurant\'s name').max(30, 'Name should not exceed 50 characters'),
        restaurantAddress: yup.string().required('Please enter restaurant\'s address').min(10, 'Please write address in brief'),
        restaurantEmail: yup.string().required('Please enter restaurant\'s email').matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email'),
        restaurantPhoneNumber: yup.string().required('Please enter restaurant\'s contact number').matches(/^[7-9]\d{9}$/gi, 'Please enter valid phone number'),
        ownerPhoneNumber: yup.string().required('Please enter owner\'s contact number').matches(/^[7-9]\d{9}$/gi, 'Please enter valid phone number'),
        ownerName: yup.string().min(3, 'Name must be atleast 3 characters long').max(20, 'Name should not exceed 20 characters').matches(/^[a-zA-Z\s]*$/, "Name must not include numbers or special characters").required('Please enter owner\'s name'),
        location: yup.object().shape(
            {
                latitude: yup.number().transform(value => isNaN(value) ? undefined : value).required('Please enter latitude point'),
                longitude: yup.number().transform(value => isNaN(value) ? undefined : value).required('Please enter longitude point')
            }),
        fssaiLicense: fileSchema,
        panCard: fileSchema,
        bankAccountNumber: yup.string().required('Please enter IFSC code').test('bank-account-number', 'Please enter valid bank account number', val => /^\d+$/.test(val)),
        ifscCode: yup.string().required('Please enter IFSC Code').test('ifsc-code', 'Please enter valid IFSC Code', val => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(val)),
        blankCheque: fileSchema
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "latitude" || name === "longitude") {
            setBasicDetails({
                ...basicDetails,
                location: {
                    ...basicDetails.location,
                    [name]: value.trim()
                }
            })
            dispatch(addRestaurantDetails({
                type: "basicDetail",
                details: {
                    ...basicDetails,
                    location: {
                        ...basicDetails.location,
                        [name]: value.trim()
                    }
                }
            }))
        }
        else if (files && files.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                const base64Data = reader.result as string;
                setBasicDetails({
                    ...basicDetails,
                    [name]: base64Data
                });
                dispatch(addRestaurantDetails({
                    type: "basicDetail",
                    details: {
                        ...basicDetails,
                        [name]: base64Data
                    }
                }))
            };
            reader.readAsDataURL(files[0]);
        }
        else {
            setBasicDetails({
                ...basicDetails,
                [name]: value
            })
            dispatch(addRestaurantDetails({
                type: "basicDetail",
                details: {
                    ...basicDetails,
                    [name]: value
                }
            }))
        }
    }

    const getPositionHandler = (latitude: number, longitude: number) => {
        setBasicDetails({
            ...basicDetails,
            location: {
                latitude: latitude,
                longitude: longitude
            }
        })
        dispatch(addRestaurantDetails({
            type: "basicDetail",
            details: {
                ...basicDetails,
                location: {
                    latitude: latitude,
                    longitude: longitude
                }
            }
        }))
    }

    const mapProps = {
        showMarker: true,
        getPositionHandler: getPositionHandler,
        location: {
            lat: +basicDetails.location.latitude! || null,
            lng: +basicDetails.location.longitude! || null
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(basicDetails)
        const a = await validationHandler(schema, basicDetails);
        if (a === "valid") {
            setErrors({});
            next();
        } else {
            setErrors(a)
        }
        setIsLoading(false)
    }

    const defaultFormValueHandler = (e: React.MouseEvent) => {
        e.preventDefault();
        setBasicDetails({
            ...basicDetails,
            restaurantName: "Vijay Chinese Corner",
            restaurantAddress: " agashi cross naka road, Agashi Rd, Near agashi machchi market, Agashi, Virar West, Virar, ",
            restaurantPhoneNumber: 9850053959,
            restaurantEmail: "vijay.restaurant@gmail.com",
            location: {
                latitude: 19.460387665611307,
                longitude: 72.77219594507703
            },
            ownerPhoneNumber: 9850053959,
            ownerName: "Vijay Mhatre",
            bankAccountNumber: 12345667890,
            ifscCode: "SBIN0011513",
        });
        dispatch(addRestaurantDetails({
            type: 'basicDetail',
            details: {
                ...basicDetails,
                restaurantName: "Vijay Chinese Corner",
                restaurantAddress: " agashi cross naka road, Agashi Rd, Near agashi machchi market, Agashi, Virar West, Virar, ",
                restaurantPhoneNumber: 9850053959,
                restaurantEmail: "vijay.restaurant@gmail.com",
                location: {
                    latitude: 19.460387665611307,
                    longitude: 72.77219594507703
                },
                ownerPhoneNumber: 9850053959,
                ownerName: "Vijay Mhatre",
                bankAccountNumber: 12345667890,
                ifscCode: "SBIN0011513",
            }
        }));
    }

    return (
        <>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Button onClick={defaultFormValueHandler}>
                    Fill This Shit!
                </Button>
                <Card>
                    <CardContent>
                        <Typography className="details-title-text">
                            Restaurant Details
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
                            <TextField
                                name='restaurantName'
                                id='restaurantName'
                                size="small"
                                variant='outlined'
                                placeholder="Restaurant's Name"
                                value={basicDetails.restaurantName}
                                onChange={handleChange}
                                error={!!errors.restaurantName}
                                helperText={<span style={{ color: 'red' }}>{errors.restaurantName}</span>}
                            />

                            <TextField
                                name="restaurantAddress"
                                id="restaurantAddress"
                                size='small'
                                variant='outlined'
                                placeholder="Restaurant's complete address"
                                value={basicDetails.restaurantAddress}
                                onChange={handleChange}
                                error={!!errors.restaurantAddress}
                                helperText={<span style={{ color: 'red' }}>{errors.restaurantAddress}</span>}
                            />
                        </Box>

                        <Box>
                            <Typography className="steps-primary" sx={{ marginBottom: '0.25rem' }}>
                                Please place the pin accurately at your outlet's location on the map.
                            </Typography>
                            <Typography className="steps-secondary">
                                This will help your customers and Food Cab riders to locate your store.
                            </Typography>

                            <Box sx={{ height: "auto", marginBottom: '1rem' }}>
                                <MapElement {...mapProps} />
                            </Box>

                            <Typography>
                                or directly enter the co-ordinates
                            </Typography>

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        name="latitude"
                                        id="latitude"
                                        size='small'
                                        variant='outlined'
                                        placeholder='Latitude'
                                        type='number'
                                        value={basicDetails.location.latitude}
                                        onChange={handleChange}
                                        error={!!errors["location.latitude"]}
                                        helperText={<span style={{ color: 'red' }}>{errors["location.latitude"]}</span>}
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>

                                <Grid item xs={6}>
                                    <TextField
                                        name="longitude"
                                        id="longitude"
                                        size='small'
                                        variant='outlined'
                                        placeholder='Longitude'
                                        type='number'
                                        value={basicDetails.location.longitude}
                                        onChange={handleChange}
                                        error={!!errors["location.longitude"]}
                                        helperText={<span style={{ color: 'red' }}>{errors["location.longitude"]}</span>}
                                        inputProps={{ step: "any" }}
                                        sx={{ width: '100%' }}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography className="details-title-text">
                            Call Details
                        </Typography>

                        <Typography className='steps-secondary'>
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
                            value={basicDetails.restaurantPhoneNumber}
                            onChange={handleChange}
                            error={!!errors.restaurantPhoneNumber}
                            helperText={<span style={{ color: 'red' }}>{errors.restaurantPhoneNumber}</span>}
                            sx={{ width: '100%' }}
                        />
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography className="details-title-text">
                            Restaurant owner details
                        </Typography>
                        <Typography className='steps-secondary'>
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
                            value={basicDetails.ownerPhoneNumber}
                            onChange={handleChange}
                            error={!!errors.ownerPhoneNumber}
                            helperText={<span style={{ color: 'red' }}>{errors.ownerPhoneNumber}</span>}
                            sx={{ width: '100%' }}
                        />

                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    type="text"
                                    name="ownerName"
                                    id="name"
                                    size="small"
                                    variant='outlined'
                                    placeholder="Owner's Full Name"
                                    value={basicDetails.ownerName}
                                    onChange={handleChange}
                                    error={!!errors.ownerName}
                                    helperText={<span style={{ color: 'red' }}>{errors.ownerName}</span>}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <TextField
                                    inputProps={{ inputMode: 'email' }}
                                    size="small"
                                    name="restaurantEmail"
                                    id="email"
                                    variant='outlined'
                                    placeholder="Restaurant's Email"
                                    value={basicDetails.restaurantEmail}
                                    onChange={handleChange}
                                    error={!!errors.restaurantEmail}
                                    helperText={<span style={{ color: 'red' }}>{errors.restaurantEmail}</span>}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography className="details-title-text">
                            Restaurant Documents
                        </Typography>

                        <Box sx={{ marginBottom: '1rem' }}>
                            <Typography className="steps-primary">
                                Please upload your PAN Card.
                            </Typography>
                            <Typography className="error-text">
                                {!!errors.panCard && errors.panCard}
                            </Typography>
                            <Input
                                name='panCard'
                                type='file'
                                onChange={handleChange}
                            />
                        </Box>

                        <Box>
                            <Typography className="steps-primary">
                                Please upload your FSSAI License.
                            </Typography>
                            <Typography className='error-text'>
                                {!!errors.fssaiLicense && errors.fssaiLicense}
                            </Typography>
                            <Input
                                name='fssaiLicense'
                                type='file'
                                onChange={handleChange}
                            />
                        </Box>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography className='details-title-text'>
                            Bank Details
                        </Typography>

                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    type="text"
                                    name="bankAccountNumber"
                                    id="name"
                                    size="small"
                                    variant='outlined'
                                    placeholder="Bank Account Number"
                                    value={basicDetails.bankAccountNumber}
                                    onChange={handleChange}
                                    error={!!errors.bankAccountNumber}
                                    helperText={<span style={{ color: 'red' }}>{errors.bankAccountNumber}</span>}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    name="ifscCode"
                                    id="email"
                                    variant='outlined'
                                    placeholder="IFSC Code"
                                    value={basicDetails.ifscCode}
                                    onChange={handleChange}
                                    error={!!errors.ifscCode}
                                    helperText={<span style={{ color: 'red' }}>{errors.ifscCode}</span>}
                                    sx={{ width: '100%' }}
                                />
                            </Grid>
                        </Grid>

                        <Box sx={{ marginTop: '1rem' }}>
                            <Typography className='steps-primary'>
                                Please upload a blank cancelled cheque
                            </Typography>
                            <Typography className="error-text">
                                {!!errors.blankCheque && errors.blankCheque}
                            </Typography>
                            <Input
                                name='blankCheque'
                                type='file'
                                onChange={handleChange}
                            />
                        </Box>
                    </CardContent>
                </Card>
                <Button
                    type='submit'
                    variant='contained'
                    sx={{ width: '50%', maxWidth: { lg: '25%' }, marginLeft: 'auto', marginRight: '0' }}
                >
                    Next
                </Button>
            </Box >
        </>

    )
}

export default BasicDetail