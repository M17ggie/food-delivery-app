import { Dialog, DialogTitle, IconButton, Typography, DialogContent } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { useState } from 'react'

const AuthModal = ({ openAuthModal, showLogin, modalTitle, authModalHandler, loginContentHandler, signupContentHandler }: { openAuthModal: boolean, showLogin: boolean, modalTitle: String, authModalHandler: Function, loginContentHandler: Function, signupContentHandler: Function }) => {

    return (
        <>
            <Dialog sx={{
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
            }} open={openAuthModal} onClose={() => { authModalHandler() }}>
                <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {modalTitle}
                    <IconButton onClick={() => { authModalHandler() }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {showLogin && <LoginForm close={() => { authModalHandler() }} />}
                    {!showLogin && <SignUpForm login={() => { loginContentHandler() }} />}
                    <Typography sx={{ marginTop: '0.25rem' }}>
                        {showLogin && ['Not a member? ', <span onClick={() => { signupContentHandler() }}>Sign up</span>]}
                        {!showLogin && ['Already a member? ', <span onClick={() => { loginContentHandler() }}>Log in</span>]}
                    </Typography>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default AuthModal