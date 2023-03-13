import SearchBar from '@components/home-search-bar/SearchBar'
import Navbar from '@components/navbar/Navbar'
import PageTitle from '@components/page-title/PageTitle'
import { useEffect } from 'react'

const Home = () => {

    return (
        <>
            <PageTitle title="Food Cab | Hungry? Let us handle it" />
            {/* <Navbar /> */}
            <SearchBar />
        </>
    )
}

export default Home