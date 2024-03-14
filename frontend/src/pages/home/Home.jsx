import Nav from "../../components/nav/Nav";
import "./Home.scss";
import Logo from "../../assets/images/Logo.svg";
import DropdownArrow from "../../assets/images/location_dropdown_arrow.svg";
import NearbyEvents from "../../components/nearbyEvents/NearbyEvents";
import UpcomingEvents from "../../components/upcomingEvents/UpcomingEvents";
import RandomEvent from "../../components/randomEvent/RandomEvent";
import SeeAllArrow from "../../assets/images/seeall_arrow.svg";
import { useNavigate } from "react-router-dom";
import { useEventFetchContext } from "../../context/eventFetchContext";
import { useEffect, useState } from "react";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";

const Home = ({ authorization, userProfileInfo }) => {

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const [getUserLocation, setGetUserLocation] = useState("")
    const [saveUserLocation, setSaveUserLocation] = useState("")
    const [hideClassForDropdown, setHideClassForDropdown] = useState("hide")
    const [showLocationUnavailableModal, setShowLocationUnavailableModal] = useState("hide")
    const navigate = useNavigate();

  // ============ fetching events and save into context ==================
    useEffect(() => {
        const getEventData = async () => {
        try {
            const response = await fetch(`http://localhost:3333/api/v1/events`, {
                headers: { authorization },
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            } else {
                const { success, result, error, message } = await response.json();
                setFetchEventData(result);
                return;
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    getEventData();
    }, []);

    // console.log(userProfileInfo);
    // console.log(userProfileInfo.userAddress);
    // console.log(fetchEventData);

// ==================== getting user location ===============================

    const [location, setLocation] = useState(null);

    useEffect(() => {
        const getLocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const { latitude, longitude } = position.coords;
                    await setLocation({ latitude, longitude });
                    if (location?.latitude === null || location?.longitude === null) {
                        setShowLocationUnavailableModal("")
                        setGetUserLocation("Berlin") //Setting default state to Berlin if no location data can be obtained
                    } else {
                        // ==================== getting address via nominatim API ===========================
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                        if (!response.ok) {
                            throw new Error("Error fetching address");
                        }
                        const data = await response.json();
                        // console.log("Adresse:", data.address);
                        setGetUserLocation(data.address.state);
                        // setSaveUserLocation(getUserLocation)
                    }
                } else {
                    throw new Error("Geolocation is not supported by Browser.");
                }
            } catch (error) {
                console.error("Error getting location: ", error);
            }
        };
        getLocation();
    }, []);

    // ==================== dropdown menu function ==============================
    const locationDropdownMenu = () => {
        setHideClassForDropdown(hideClassForDropdown === "hide" ? "" : "hide")
    }

    const changeLocationInfo = (province) => {
        setSaveUserLocation(province) //changes location value displayed
        setHideClassForDropdown("hide")
    }

    const hideStateSelectionAgain = () => {
        setHideClassForDropdown("hide")
    }

// =================== location and location modal ===========================

    useEffect(() => {
        setSaveUserLocation(getUserLocation)
    },[getUserLocation])

    const closeLocationUnavailableModal = () => {
        setShowLocationUnavailableModal("hide")
    }

    // ========= function of "Alle zeigen" in "Anstehende Events" ===================
    const forwardToSeeAllUpcoming = () => {
        navigate("/search")
    }
    // ========= function of "Alle zeigen" in "In der Nähe" ===================
    const forwardToSeeAllNearby = () => {
        navigate("/search")
    }
    console.log(saveUserLocation);
    return (
        <div className="homeContainer">
            <header className="headerHome">
                <img className="logo" src={Logo} alt="logoIcon" />
                <div className="locationContainer" onClick={() => locationDropdownMenu()}>
                    <div className="locationDropdownContainer" >
                        <p className="locationTitle">Standort</p>
                        <img src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <div onClick={() => hideStateSelectionAgain()} className={`dropdownAddressMenuContainer ${hideClassForDropdown}`}>
                        <div className={`dropdownAddressMenu`}>
                            <p onClick={() => changeLocationInfo(getUserLocation)} className={`HomeDropdownSelections DeinStandortTag`}>Dein Standort: {getUserLocation}</p>
                            {Array.from(new Set(fetchEventData.map(event => event.eventAddress.province))).map(province => (
                                <p onClick={() => changeLocationInfo(province)} className={`HomeDropdownSelections`} key={province}>{province}</p>
                            ))}
                        </div>
                    </div>
                    <h3 className="showCurrentLocation">{saveUserLocation}</h3>
                </div>
                {/* Element emptyDivForFlexSpace is invisible and only used to properly center  locationDropdownContainer */}
                <div className="emptyDivForFlexSpace">
                    <img className="logo" style={{visibility: "hidden"}} src={Logo} alt="logoIcon" />
                </div>
                {/* ===================================================================================================== */}
            </header>
            <div className="UpcomingTitleContainer">
                <p className="titleOfConponent">Anstehende Events</p>
                <label className="seeAllTextAndIcon" onClick={() => forwardToSeeAllUpcoming()}>
                    Alle zeigen <img src={SeeAllArrow} alt="seeAllIcon" />
                </label>
            </div>
            <UpcomingEvents/>
            <div className="NearbyTitleContainer">
                <p className="titleOfConponent">In deiner Nähe</p>
                <label className="seeAllTextAndIcon" onClick={() => forwardToSeeAllNearby()}>
                    Alle zeigen <img src={SeeAllArrow} alt="seeAllIcon" />
                </label>
            </div>
            <NearbyEvents/>
            <RandomEvent/>
            <div className={`homeLocationUnavailableModel ${showLocationUnavailableModal}`}>
                <div className="LocationModelWindow">
                    <p>Keine Standortdaten gefunden.</p>
                    <p>Beim nächsten Appstart Browsereinstellungen für Standortgenehmigung prüfen.</p>
                    <p>Default Standort: Berlin</p>
                    <BtnSubmit text="Weiter" onClick={() => closeLocationUnavailableModal()}/>
                </div>
            </div>
            <Nav highlight="explore"/>
        </div>
    );
};

export default Home;