import ExploreIcon from "../../assets/images/compass_grey.svg"
import EventsIcon from "../../assets/images/Calender.svg"
import AddEventIcon from "../../assets/images/add_plus.svg"
import AddEventIconWhite from "../../assets/images/add_plus_white.svg"
import SearchIcon from "../../assets/images/search_icon_grey.svg"
import ProfileIcon from "../../assets/images/Profile.svg"
import PurpleExploreIcon from "../../assets/images/compass_purple.svg"
import PurpleEventsIcon from "../../assets/images/Calender_purple.svg"
import PurpleSearchIcon from "../../assets/images/search_icon_purple.svg"
import PurpleProfileIcon from "../../assets/images/Profile_purple.svg"
import "./Nav.scss"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Nav = ({ highlight }) => {

    const navigate = useNavigate()
    // ============= states to manage icon and description colors ===============
    const [stateExploreIcon, setStateExploreIcon] = useState(ExploreIcon)
    const [stateEventsIcon, setStateEventsIcon] = useState(EventsIcon)
    const [stateSearchIcon, setStateSearchIcon] = useState(SearchIcon)
    const [stateProfileIcon, setStateProfileIcon] = useState(ProfileIcon)
    const [stateAddEventIcon, setStateAddEventIcon] = useState(AddEventIcon)
    const [stateTextColorExplore, setStateTextColorExplore] = useState("")
    const [stateTextColorEvents, setStateTextColorEvents] = useState("")
    const [stateTextColorSearch, setStateTextColorSearch] = useState("")
    const [stateTextColorProfil, setStateTextColorProfil] = useState("")

    // ================ functions to set Icon and Description colors ==============
    useEffect(() => {
        if (highlight === "explore") {
            setStateExploreIcon(PurpleExploreIcon)
            setStateTextColorExplore("NavIconFocusColor")
        } else if  (highlight === "events") {
            setStateEventsIcon(PurpleEventsIcon)
            setStateTextColorEvents("NavIconFocusColor")
        } else if ( highlight === "addEvent") {
            setStateAddEventIcon(AddEventIconWhite)
        } else if  (highlight === "search") {
            setStateSearchIcon(PurpleSearchIcon)
            setStateTextColorSearch("NavIconFocusColor")
        } else if  (highlight === "profile") {
            setStateProfileIcon(PurpleProfileIcon)
            setStateTextColorProfil("NavIconFocusColor")
        }
        },[])

    // ===================== onclick function for navigation ==============
    const navigateExploreIcon = () => {
        if (highlight !== "explore") {
            navigate("/home")
        }
    }

    const navigateEventsIcon = () => {
        if (highlight !== "events") {
        navigate("/likedevents")
        }
    }

    const navigateAddEvent = () => {
        if (highlight !== "addEvent") {
        navigate("/addevent")
        }
    }

    const navigateSearchIcon = () => {
        if (highlight !== "search") {
        navigate("/search")
        }
    }

    const navigateProfileIcon = () => {
        if (highlight !== "profile") {
        navigate("/profile")
        }
    }

    return (
        <nav className="NavContainer">
            <label onClick={() => navigateExploreIcon()} className="iconLabels">
                <img className="NavbarIcons" src={stateExploreIcon} alt="navbarIcons" />
                <p className={`NavIconDescriptions ${stateTextColorExplore}`} >Entdecken</p>
            </label>
            <label onClick={() => navigateEventsIcon()} className="iconLabels">
                <img className="NavbarIcons" src={stateEventsIcon} alt="navbarIcons" />
                <p className={`NavIconDescriptions ${stateTextColorEvents}`} >Events</p>
            </label>
            <label onClick={() => navigateAddEvent()} className="iconLabels addEventIcon">
                <img className="NavbarIcons" src={stateAddEventIcon} alt="navbarIcons" />
            </label>
            <label onClick={() => navigateSearchIcon()} className="iconLabels">
                <img className="NavbarIcons" src={stateSearchIcon} alt="navbarIcons" />
                <p className={`NavIconDescriptions ${stateTextColorSearch}`} >Suche</p>
            </label>
            <label onClick={() => navigateProfileIcon()} className="iconLabels">
                <img className="NavbarIcons" src={stateProfileIcon} alt="navbarIcons" />
                <p className={`NavIconDescriptions ${stateTextColorProfil}`} >Profil</p>
            </label>
        </nav>
    );
};

export default Nav;
