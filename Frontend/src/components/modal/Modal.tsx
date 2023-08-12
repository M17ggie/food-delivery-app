import { Dialog } from "@mui/material"

const Modal = () => {
    return <Dialog sx={{
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
    </Dialog>
}
export default Modal