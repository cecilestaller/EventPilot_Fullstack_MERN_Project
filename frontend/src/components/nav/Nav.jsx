import ExploreIcon from "../../assets/images/compass_grey.svg"
import EventsIcon from "../../assets/images/Calender.svg"
import AddEventIcon from "../../assets/images/add_plus.svg"
import SearchIcon from "../../assets/images/search_icon_grey.svg"
import ProfileIcon from "../../assets/images/Profile.svg"
import "./Nav.scss"

const Nav = () => {
    return (
        <nav className="NavContainer">
            <label className="iconLabels"><img className="NavbarIcons" src={ExploreIcon} alt="navbarIcons" /><p className="NavIconDescriptions" >Erkunde</p></label>
            <label className="iconLabels"><img className="NavbarIcons" src={EventsIcon} alt="navbarIcons" /><p className="NavIconDescriptions" >Events</p></label>
            <label className="iconLabels addEventIcon"><img className="NavbarIcons" src={AddEventIcon} alt="navbarIcons" /></label>
            <label className="iconLabels"><img className="NavbarIcons" src={SearchIcon} alt="navbarIcons" /><p className="NavIconDescriptions" >Suche</p></label>
            <label className="iconLabels"><img className="NavbarIcons" src={ProfileIcon} alt="navbarIcons" /><p className="NavIconDescriptions" >Profil</p></label>
        </nav>
    );
};

export default Nav;
