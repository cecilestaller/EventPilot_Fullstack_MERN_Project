import EventCards from "../../components/eventCards/EventCards";
import Nav from "../../components/nav/Nav";
import "./SearchEvents.scss";
import DropdownArrow from "../../assets/images/location_dropdown_arrow.svg";
import { useEventFetchContext } from "../../context/eventFetchContext";
import { useEffect, useState } from "react";
import { useLocationFetchContext } from "../../context/locationFetchContext";
import { useSearchTermContext } from "../../context/searchTermContext"
import BtnCategory from "../../components/BtnCategory/BtnCategory";
import sport from "../../assets/images/icon_bicycle-sharp.svg";
import concert from "../../assets/images/musical_note_Icon.svg";
import art from "../../assets/images/icon_art.svg";
import movie from "../../assets/images/icon_videocam-sharp.svg";
import food from "../../assets/images/icon_restaurant.svg";
import komet from "../../assets/images/icon_sonstige_infinite-sharp.svg";
import comedy from "../../assets/images/icons-joker-100.png";
import book from "../../assets/images/icon_book-sharp.svg";
import search from "../../assets/images/search_icon_grey.svg";
import dateIcon from "../../assets/images/Calender.svg"
import refresh from "../../assets/images/icon_refresh.svg"

const SearchEvents = ({ authorization, userProfileInfo }) => {
    
    // ========================== functionality ===================================
    const { fetchEventData } = useEventFetchContext(); // all Events Array
    const { searchTerm } = useSearchTermContext();
    //kann sein "nearby" oder "upcoming" oder null
    // Ort
    const { fetchLocationData } = useLocationFetchContext(); // device location
    const initialUserLocation = searchTerm !== "upcoming" ?  fetchLocationData : null
    const [userLocation, setUserLocation] = useState(initialUserLocation);
    const [searchText, setSearchText] = useState("")    // Search
    const currentDate = new Date();    // Date
    const [eventDate, setEventDate] = useState(currentDate)    // Date
    const [ categoryFilter, setCategoryFilter ] = useState("")    // categroy

    const filterSingleEvent = (event) => {
        const dateMatch = new Date(event.eventDate).getTime() >= new Date(eventDate).getTime()
        const locationMatch = event.eventAddress.province === userLocation || userLocation === null
        const searchMatch = event.title.toLowerCase().includes(searchText.toLowerCase()) || event.eventAddress.city.toLowerCase().includes(searchText.toLowerCase()) || searchText === ""
        const categoryMatch = event.category === categoryFilter || categoryFilter === ""
        return dateMatch && locationMatch && searchMatch && categoryMatch
        // das Gleiche wie:
        // if (dateMatch === true && locationMatch === true && searchMatch === true && categoryMatch === true) {
        //     return true
        // } else {
        //     return false
        // }
    }
    
    const filteredEvents = fetchEventData.filter(event => filterSingleEvent(event))
    const resetFilters = () => {
        setEventDate(currentDate)
        setCategoryFilter("")
        setSearchText("")
        setUserLocation(initialUserLocation)
    }

    // ==================== dropdown menu function ==============================

    const [hideClassForDropdown, setHideClassForDropdown] = useState("hide");
    const locationDropdownMenu = () => {
        setHideClassForDropdown(hideClassForDropdown === "hide" ? "" : "hide");
    };

    const changeLocationInfo = (province) => {
        setUserLocation(province); //changes location value displayed
        setHideClassForDropdown("hide");
    };

    const hideStateSelectionAgain = () => {
        setHideClassForDropdown("hide");
    };

    return (
        <div className="SearchEventContainer">
            <header className="SearchHeader">
                <img src={refresh} alt="refreshIcon" className="SearchEventsRefreshIcon" onClick={() => resetFilters()} />
                <div className="SearchlocationContainer" onClick={() => locationDropdownMenu()}>
                    <div className="SearchlocationDropdownContainer" >
                        <p className="SearchlocationTitle">Standort</p>
                        <img className="SearchArrowIcon" src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <div onClick={() => hideStateSelectionAgain()} className={`SearchdropdownAddressMenuContainer ${hideClassForDropdown}`}>
                        <div className={`SearchdropdownAddressMenu`}>
                            <p onClick={() => changeLocationInfo(fetchLocationData)} className={`SearchHomeDropdownSelections SearchDeinStandortTag`}>Dein Standort: {fetchLocationData}</p>
                            {Array.from(new Set(fetchEventData?.map(event => event.eventAddress.province))).map(province => (
                                <p onClick={() => changeLocationInfo(province)} className={`SearchHomeDropdownSelections`} key={province}>{province}</p>
                                ))}
                        </div>
                    </div>
                    <h3 className="SearchsSowCurrentLocation">{userLocation}</h3>
                </div>
                <div className="SearchInputContainer">
                    <img className="searchEvent_input-icon" src={search}/>
                    <input placeholder="Suche nach Eventname..." className="searchEvent_input" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)}/>
                    {/* datepicker */}
                    <p></p>
                    <p></p>
                    <img className="searchEvent_input-icon" src={dateIcon} alt="" />
                    <p className="pTagSearchEventDatePicker">ab</p>
                    <input
                        className="searchEvent_input dateContainerSearchevents"
                        type="date"
                        value={eventDate}
                        onChange={(event) => setEventDate(event.target.value)}
                    />
                    {/* datepicker */}

                </div>
                <div className="seachEventsIconContainer">
                    <BtnCategory id="music" onClickEvent={() => setCategoryFilter("music")} className="searchEventsIcons" icon={concert} isActive={categoryFilter === "music"} text="Musik"/>
                    <BtnCategory id="sport" onClickEvent={() => setCategoryFilter("sport")} className="searchEventsIcons" icon={sport} isActive={categoryFilter === "sport"} text="Sport"/>
                    <BtnCategory id="movie" onClickEvent={() => setCategoryFilter("movie")} className="searchEventsIcons" icon={movie} isActive={categoryFilter === "movie"} text="Filme"/>
                    <BtnCategory id="art" onClickEvent={() => setCategoryFilter("art")} className="searchEventsIcons" icon={art} isActive={categoryFilter === "art"} text="Kunst"/>
                    <BtnCategory id="food" onClickEvent={() => setCategoryFilter("food")} className="searchEventsIcons" icon={food} isActive={categoryFilter === "food"} text="Essen"/>
                    <BtnCategory id="comedy" onClickEvent={() => setCategoryFilter("comedy")} className="searchEventsIcons" icon={comedy} isActive={categoryFilter === "comedy"} text="Komödie"/>
                    <BtnCategory id="literature" onClickEvent={() => setCategoryFilter("literature")} className="searchEventsIcons" icon={book} isActive={categoryFilter === "literature"} text="Literatur"/>
                    <BtnCategory id="others" onClickEvent={() => setCategoryFilter("others")} className="searchEventsIcons" icon={komet} isActive={categoryFilter === "others"} text="Sonstige"/>
                </div>
            </header>
            <section>
                {filteredEvents?.map(event => 
                <EventCards
                    unformatedDate={event?.eventDate} 
                    Title={event?.title} 
                    State={event?.eventAddress.province} 
                    eventId={event?._id} 
                    category={event?.category} 
                    eventPicURL={event?.eventPicURL} 
                    userProfileInfo={userProfileInfo} 
                    authorization={authorization}/>)}
            </section>
            <Nav highlight="search"/>
        </div>
    );
};

export default SearchEvents;
