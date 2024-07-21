import { useContext } from 'react'
import SearchBar from '../../components/searchBar/SearchBar'
import './homePage.scss'
import { AuthContext } from '../../context/AuthContext'


const HomePage = () =>{

    const {currentUser} = useContext(AuthContext)
    console.log(currentUser)
    return(
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className='title'>
                        Find Your Dream Auction Property
                    </h1>
                    <p>
                        Welcome to AuctionGenie, your go-to platform for discovering a diverse range of auction properties. Explore detailed listings, and find your next investment or dream home effortlessly. Start exploring now!
                    </p>
                    <SearchBar/>
                    <div className="boxes">
                        <div className="box">
                            <h1>2+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>20+</h1>
                            <h2>Cities</h2>
                        </div>
                        <div className="box">
                            <h1>200+</h1>
                            <h2>Propeties on Auction</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt=""/>
            </div>
        </div>
    )
}

export default HomePage