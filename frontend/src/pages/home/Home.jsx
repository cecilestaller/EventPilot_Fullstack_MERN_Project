import Nav from "../../components/nav/Nav";
import "./Home.scss";
import Logo from "../../assets/images/Logo.svg";
import DropdownArrow from "../../assets/images/location_dropdown_arrow.svg"
import NearbyEvents from "../../components/nearbyEvents/NearbyEvents";
import UpcomingEvents from "../../components/upcomingEvents/UpcomingEvents";
import RandomEvent from "../../components/randomEvent/RandomEvent";
import SeeAllArrow from "../../assets/images/seeall_arrow.svg"

const Home = () => {
    return (
        <div className="homeContainer">
            <header className="headerHome">
                <img className="logo" src={Logo} alt="logoIcon" />
                <div className="locationContainer">
                    <div className="locationDropdownContainer">
                        <p className="locationTitle">Standort</p>
                        <img src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <h3 className="showCurrentLocation">Berlin, DE</h3>
                </div>
                <div className="emptyDivForFlexSpace">
                    <img className="logo" style={{visibility: "hidden"}} src={Logo} alt="logoIcon" />
                </div>
            </header>
            <div className="UpcomingTitleContainer">
                <p>Anstehende Events</p>
                <label >Alle zeigen<img src={SeeAllArrow} alt="seeAllIcon" /></label>
            </div>
            <UpcomingEvents/>
            <div className="NearbyTitleContainer">
                <p>In deiner Nähe</p>
                <label >Alle zeigen<img src={SeeAllArrow} alt="seeAllIcon" /></label>
            </div>
            <NearbyEvents/>
            <RandomEvent/>
            <Nav/>
        </div>
    );
};

export default Home;
