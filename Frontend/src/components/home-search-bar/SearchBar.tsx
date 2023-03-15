import Typography from '@mui/material/Typography'
import styles from './SearchBar.module.css'

const SearchBar = () => {
    return (
        <>
            <div className="container">
                <div className={styles['image-container']}>
                    <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '2rem', md: '3rem' } }}>
                        Food Cab
                    </Typography>
                    <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' } }}>
                        Hungry? Let us handle it
                    </Typography>
                </div>
            </div>
        </>
    )
}
// <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '1rem', sm: '1.5rem', md: '2.5rem' } }}>
// <Typography sx={{ zIndex: 1, color: 'white', fontSize: { xs: '2rem', md: '3rem' } }}>

export default SearchBar