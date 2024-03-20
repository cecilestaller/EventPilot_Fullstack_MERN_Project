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

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const { searchTerm, setSearchTerm } = useSearchTermContext();
    const { fetchLocationData, setFetchLocationData } = useLocationFetchContext();
    const [ categoryFilter, setCategoryFilter ] = useState("")
    const [saveUserLocation, setSaveUserLocation] = useState(fetchLocationData);
    const [hideClassForDropdown, setHideClassForDropdown] = useState("hide");
    const [filteredEvents, setFilteredEvents] = useState(fetchEventData)
    const [filteredCategories, setFilteredCategories] = useState("")
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
        } else {
            setFilteredEvents(
                fetchEventData.filter(
                event => event.eventAddress && event.eventAddress.province === saveUserLocation)
                .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
        }
        setSearchTerm("")
    }, [fetchEventData, hideClassForDropdown])

    console.log(eventDate);
// =========================== filter events ===============================
// inputfield
    const startInputSearch = (value) => {
        if (!eventDate) {
            setFilteredEvents(fetchEventData?.
                filter(location => location?.eventAddress?.province === saveUserLocation)
                .filter(event => event.title.toLowerCase().includes(value.toLowerCase()))
                // .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
            )
        } else if (eventDate) {
            setFilteredEvents(fetchEventData?.
                filter(location => location?.eventAddress?.province === saveUserLocation)
                .filter(event => event.title.toLowerCase().includes(value.toLowerCase()))
                .filter(date => new Date(date?.eventDate) === eventDate )
                .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate)))
        }
        setFilteredCategories(filteredEvents)
    }

    const setButtonIdent = (value) => {
        setCategoryFilter(value)
    }

    useEffect(() => {
        if (filteredCategories !== "") {
            setFilteredEvents(filteredCategories.filter(filterCategory => filterCategory.category === categoryFilter))
            // setFilteredCategories("")
        }
    },[categoryFilter])



    // const startInputSearch = (value) => {
    //     // Convert value to lowercase for case-insensitive search
    //     const lowerCaseValue = value.toLowerCase();
    //     let filteredEvents = fetchEventData;
    //     // Filter by location
    //     filteredEvents = filteredEvents.filter(location => location.eventAddress.province === saveUserLocation);
    //     // Filter by title
    //     if (value.trim() !== "") {
    //         filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(lowerCaseValue));
    //     }
    //     // Filter by date
    //     if (eventDate !== "") {
    //         filteredEvents = filteredEvents.filter(event => new Date(event.eventDate) >= new Date(eventDate));
    //     }
    //     setFilteredEvents(filteredEvents);
    // };
    
    // useEffect(() => {
    //     let eventsToShow = fetchEventData;
    //     // Filter by category
    //     if (categoryFilter !== "") {
    //         eventsToShow = eventsToShow.filter(event => event.category === categoryFilter);
    //     }
    //     // Filter by location
    //     eventsToShow = eventsToShow.filter(location => location.eventAddress.province === saveUserLocation);
    //     // Filter by date
    //     if (eventDate !== "") {
    //         eventsToShow = eventsToShow.filter(event => new Date(event.eventDate) >= new Date(eventDate));
    //     }
    //     setFilteredEvents(eventsToShow);
    // }, [categoryFilter, eventDate, fetchEventData, saveUserLocation]);

    return (
        <div className="SearchEventContainer">
            <header className="SearchHeader">
                <div className="SearchlocationContainer" onClick={() => locationDropdownMenu()}>
                    <div className="SearchlocationDropdownContainer" >
                        <p className="SearchlocationTitle">Standort</p>
                        <img className="SearchArrowIcon" src={DropdownArrow} alt="arrowIcon" />
                        <img src={refresh} alt="refreshIcon" className="SearchEventsRefreshIcon" onClick={() => window.location.reload()} />
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
                    <BtnCategory id="music" onClickEvent={() => setButtonIdent("music")} className="searchEventsIcons" icon={concert} isActive={categoryFilter === "music"} text="Musik"/>
                    <BtnCategory id="sport" onClickEvent={() => setButtonIdent("sport")} className="searchEventsIcons" icon={sport} isActive={categoryFilter === "sport"} text="Sport"/>
                    <BtnCategory id="movie" onClickEvent={() => setButtonIdent("movie")} className="searchEventsIcons" icon={movie} isActive={categoryFilter === "movie"} text="Filme"/>
                    <BtnCategory id="art" onClickEvent={() => setButtonIdent("art")} className="searchEventsIcons" icon={art} isActive={categoryFilter === "art"} text="Kunst"/>
                    <BtnCategory id="food" onClickEvent={() => setButtonIdent("food")} className="searchEventsIcons" icon={food} isActive={categoryFilter === "food"} text="Essen"/>
                    <BtnCategory id="comedy" onClickEvent={() => setButtonIdent("comedy")} className="searchEventsIcons" icon={comedy} isActive={categoryFilter === "comedy"} text="Komödie"/>
                    <BtnCategory id="literature" onClickEvent={() => setButtonIdent("literature")} className="searchEventsIcons" icon={book} isActive={categoryFilter === "literature"} text="Literatur"/>
                    <BtnCategory id="others" onClickEvent={() => setButtonIdent("others")} className="searchEventsIcons" icon={komet} isActive={categoryFilter === "others"} text="Sonstige"/>
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
