import SearchBar from '@components/home-search-bar/SearchBar'
import Navbar from '@components/navbar/Navbar'
import PageTitle from '@components/page-title/PageTitle'
import usePageTitle from '@hooks/usePageTitle'
import RestaurantList from '@components/restaurant/RestaurantList'

const Home = () => {
    usePageTitle("Hungry? Let us handle it")

    return (
        <>
            <PageTitle title="Food Cab | Hungry? Let us handle it" />
            <Navbar userType='user' />
            <SearchBar />
            <RestaurantList />
        </>
    )
}

export default Home