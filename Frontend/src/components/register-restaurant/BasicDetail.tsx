import { Box, Button, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import MapElement from '@components/map/MapElement';
import { IBasicDetails } from '@utils/interfaces/restaurant-registration/RestaurantRegister';
import * as yup from 'yup'
import { Input } from '@material-ui/core';

const BasicDetail = ({ next, prev }: { next: Function, prev: Function }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [basicDetails, setBasicDetails] = useState<IBasicDetails>({
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
    });
    const [errors, setErrors] = useState<any>({});

    const fileSchema = yup.mixed().required('Please upload the image').test('file-size', 'File size must be less than 1MB', (value: any) => value && value.size <= 1024 * 1024).test('file-type', 'Only JPEG image is allowed', (value: any) => value && value.type === 'image/jpeg')

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
        }
        else if (files && files.length > 0) {
            setBasicDetails({
                ...basicDetails,
                [name]: files[0]
            })
        }
        else {
            setBasicDetails({
                ...basicDetails,
                [name]: value
            })
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
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await schema.validate(basicDetails, { abortEarly: false });
            setErrors({});
            console.log(basicDetails)
            next();
        } catch (err: unknown) {
            if (err instanceof yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                err.inner.forEach((error: any) => {
                    newErrors[error.path] = error.message
                })
                setErrors(newErrors);
            } else {
                console.log('This is beyond my scope');
            }
        }
        setIsLoading(false)
    }

    return (
        <>
            <Typography>
                Restaurant Details
            </Typography>
            <Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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

                <Box>
                    <Typography>
                        Please place the pin accurately at your outlet's location on the map.
                    </Typography>
                    <Typography>
                        This will help your customers and Food Cab riders to locate your store.
                    </Typography>

                    <Box sx={{ width: "50%", height: "auto" }}>
                        <MapElement showMarker={true} getPositionHandler={getPositionHandler} location={{ lat: +basicDetails.location.latitude! || null, lng: +basicDetails.location.longitude! || null }} />
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
                        type='number'
                        value={basicDetails.location.latitude}
                        onChange={handleChange}
                        error={!!errors["location.latitude"]}
                        helperText={<span style={{ color: 'red' }}>{errors["location.latitude"]}</span>}
                    />

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
                        value={basicDetails.restaurantPhoneNumber}
                        onChange={handleChange}
                        error={!!errors.restaurantPhoneNumber}
                        helperText={<span style={{ color: 'red' }}>{errors.restaurantPhoneNumber}</span>}
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
                        value={basicDetails.ownerPhoneNumber}
                        onChange={handleChange}
                        error={!!errors.ownerPhoneNumber}
                        helperText={<span style={{ color: 'red' }}>{errors.ownerPhoneNumber}</span>}
                    />

                    <Box>
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
                        />


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
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>
                        Restaurant Documents
                    </Typography>

                    <Box>
                        <Typography>
                            Please upload your PAN Card.
                        </Typography>
                        <Typography>
                            {!!errors.panCard && errors.panCard}
                        </Typography>
                        <Input
                            name='panCard'
                            type='file'
                            onChange={handleChange}
                        />
                    </Box>

                    <Box>
                        <Typography>
                            Please upload your FSSAI License.
                        </Typography>
                        <Typography>
                            {!!errors.fssaiLicense && errors.fssaiLicense}
                        </Typography>
                        <Input
                            name='fssaiLicense'
                            type='file'
                            onChange={handleChange}
                        />
                    </Box>
                </Box>

                <Box>
                    <Typography>
                        Bank Details
                    </Typography>

                    <Box>
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
                        />


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
                        />

                        <Box>
                            <Typography>
                                Please upload a blank cancelled cheque
                            </Typography>
                            <Typography>
                                {!!errors.blankCheque && errors.blankCheque}
                            </Typography>
                            <Input
                                name='blankCheque'
                                type='file'
                                onChange={handleChange}
                            />
                        </Box>
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

export default BasicDetail