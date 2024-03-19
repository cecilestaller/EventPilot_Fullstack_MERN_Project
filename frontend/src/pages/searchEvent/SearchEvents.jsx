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

const SearchEvents = ({ authorization, userProfileInfo }) => {

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const { searchTerm, setSearchTerm } = useSearchTermContext();
    const { fetchLocationData, setFetchLocationData } = useLocationFetchContext();
    const [ categoryFilter, setCategoryFilter ] = useState("")
    const [saveUserLocation, setSaveUserLocation] = useState(fetchLocationData);
    const [hideClassForDropdown, setHideClassForDropdown] = useState("hide");
    const [filteredEvents, setFilteredEvents] = useState(fetchEventData)
    const [eventDate, setEventDate] = useState("")
    const currentDate = new Date();

    // ==================== dropdown menu function ==============================
    const locationDropdownMenu = () => {
        setHideClassForDropdown(hideClassForDropdown === "hide" ? "" : "hide");
    };

    const changeLocationInfo = (province) => {
        setSaveUserLocation(province); //changes location value displayed
        setHideClassForDropdown("hide");
    };

    const hideStateSelectionAgain = () => {
        setHideClassForDropdown("hide");
    };

// ========================= arrow links from Home ===============================
    useEffect(() => {
        if (searchTerm === "nearby") {
            setFilteredEvents(
                fetchEventData.filter(
                    event => event.eventAddress && event.eventAddress.province === fetchLocationData)
                    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
            ) //has all events in same s1tate        
        } else if (searchTerm === "upcoming") {
            setFilteredEvents(
                fetchEventData.filter(fetchEventData => new Date(fetchEventData?.eventDate) > currentDate) // Keep only dates in the future
                .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
                )
        } 
        setSearchTerm("")
        console.log(filteredEvents);
    }, [fetchEventData])

    console.log(filteredEvents);
    console.log(eventDate);
    console.log(fetchEventData);
// =========================== filter events ===============================
// inputfield
    const startInputSearch = (value) => {
        if (!eventDate) {
            setFilteredEvents(fetchEventData?.
                filter(location => location.eventAddress.province === saveUserLocation)
                .filter(event => event.title.toLowerCase().includes(value.toLowerCase()))
                // .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
            )
        } else if (eventDate) {
            setFilteredEvents(fetchEventData?.
                filter(location => location.eventAddress.province === saveUserLocation)
                .filter(event => event.title.toLowerCase().includes(value.toLowerCase()))
                .filter(date => new Date(date?.eventDate) === eventDate )
                .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
        }
    }
    
    const setButtonIdent = (value) => {
        setCategoryFilter(value)
    }

console.log(categoryFilter);


    // setFilteredEvents(fetchEventData.filter(event => event.title.toLowerCase().includes(value.toLowerCase())).sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
// location select


    return (
        <div className="SearchEventContainer">
            <header className="SearchHeader">
                <div className="SearchlocationContainer" onClick={() => locationDropdownMenu()}>
                    <div className="SearchlocationDropdownContainer" >
                        <p className="SearchlocationTitle">Standort</p>
                        <img src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <div onClick={() => hideStateSelectionAgain()} className={`SearchdropdownAddressMenuContainer ${hideClassForDropdown}`}>
                        <div className={`SearchdropdownAddressMenu`}>
                            <p onClick={() => changeLocationInfo(fetchLocationData)} className={`SearchHomeDropdownSelections SearchDeinStandortTag`}>Dein Standort: {fetchLocationData}</p>
                            {Array.from(new Set(fetchEventData?.map(event => event.eventAddress.province))).map(province => (
                                <p onClick={() => changeLocationInfo(province)} className={`SearchHomeDropdownSelections`} key={province}>{province}</p>
                                ))}
                        </div>
                    </div>
                    <h3 className="SearchsSowCurrentLocation">{saveUserLocation}</h3>
                </div>
                <div className="SearchInputContainer">
                    <img className="searchEvent_input-icon" src={search}/>
                    <input placeholder="Suche nach Eventname..." className="searchEvent_input" type="text" onChange={(event) => startInputSearch(event.target.value)}/>
                    {/* datepicker */}
                    <img className="searchEvent_input-icon" src={dateIcon} alt="" />
                    <input
                        className="searchEvent_input"
                        type="date"
                        value={eventDate}
                        onChange={(event) => setEventDate(event.target.value)}
                    />
                    {/* datepicker */}

                </div>
                <div className="seachEventsIconContainer">
                    <BtnCategory onClickEvent={() => setButtonIdent("music")} className="searchEventsIcons" icon={concert} text="Musik"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("sport")} className="searchEventsIcons" icon={sport} text="Sport"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("movie")} className="searchEventsIcons" icon={movie} text="Filme"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("art")} className="searchEventsIcons" icon={art} text="Kunst"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("food")} className="searchEventsIcons" icon={food} text="Essen"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("comedy")} className="searchEventsIcons" icon={comedy} text="Komödie"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("literature")} className="searchEventsIcons" icon={book} text="Literatur"/>
                    <BtnCategory onClickEvent={() => setButtonIdent("others")} className="searchEventsIcons" icon={komet} text="Sonstige"/>
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
