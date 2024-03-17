import { useEventFetchContext } from "../../context/eventFetchContext";
import LocationIcon from "../../assets/images/Map Pin_grey.svg"
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg"
import BookmarkFull from "../../assets/images/full_bookmark.svg"
import "./NearbyEvents.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NearbyEvents = ({ selectedLocation }) => {

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const [filteredEvents, setFilteredEvents] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        setFilteredEvents(
            fetchEventData.filter(
                event => event.eventAddress && 
                event.eventAddress.province === 
                selectedLocation
                ) //has all events in same s1tate
                )
            },[fetchEventData, selectedLocation])
            console.log(filteredEvents);
            console.log(selectedLocation);

const navigateToDetails = (id) => {
    navigate(`/events/${id}`)
    // console.log(event); //is event id
}

    return (
        <div className="NearbyEventsContainer">
        {filteredEvents.slice(0, 3).map((event) => (
            <article className="NearbyEventsSingleEventContainer" key={event._id} onClick={() => navigateToDetails(event._id)}>
                <div className="ImageAndIconContainer">
                    <img className="BookmarkIcon" src={BookmarkEmpty} alt="" />
                    <img className="EventImage" src="https://picsum.photos/218/131" alt="" />
                    <div className="EventDateIcon">{new Date(event.eventDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                </div>
                <p className="EventTitle">{event.title}</p>
                <div className="EventCardBottomDetailsContainer">
                    <div className="EventCardRegisteredInfo">
                        <img className="RegisteredUserFirstImage" src="" alt="" />
                        <img className="RegisteredUserSecondImage" src="" alt="" />
                        <img className="RegisteredUserThirdImage" src="" alt="" />
                        <p className="RegisteredUserAmout">{event.registeredGuests.length > 99 ? '99+' : event.registeredGuests.length}</p>
                    </div>
                    <div className="LocationInfo">
                        <img className="LocationPinIcon" src={LocationIcon} alt="" />
                        <p className="locationState">{event.eventAddress.province}</p>
                    </div>
                </div>
            </article>
        ))}
        </div>
    );
};

export default NearbyEvents;
