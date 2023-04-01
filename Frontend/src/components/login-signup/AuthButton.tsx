import React from 'react';
import { Button as MUIButton, CircularProgress } from '@mui/material';
// import { CircularProgress } from '@material-ui/core';

const AuthButton = ({ name, isLoading }: { name: string, isLoading: boolean }) => {
    return <MUIButton
        type="submit"
        variant='contained'
        sx={{ width: '100%', maxWidth: { lg: '25%' }, margin: '0 auto' }}
        disabled={isLoading}
    >
        {isLoading ? <CircularProgress size={24} color={'inherit'} /> : name}
    </MUIButton>
}

export default AuthButton