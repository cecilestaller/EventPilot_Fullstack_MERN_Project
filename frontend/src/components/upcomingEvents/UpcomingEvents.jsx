import { useEventFetchContext } from "../../context/eventFetchContext";
import "./UpcomingEvents.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../../assets/images/Map Pin_grey.svg"
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg"
import BookmarkFull from "../../assets/images/full_bookmark.svg"

const UpcomingEvents = () => {

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const [filteredEvents, setFilteredEvents] = useState([])
    const navigate = useNavigate()
    const currentDate = new Date();

    useEffect(() => {
        setFilteredEvents(
            fetchEventData.filter(fetchEventData => new Date(fetchEventData.eventDate) > currentDate) // Keep only dates in the future
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        )
    },[fetchEventData])

    // console.log(filteredEvents);

const navigateToDetails = (id) => {
    navigate(`/events/${id}`)
    // console.log(event); //is event id
}
    return (
        <div className="UpcomingContainer">
        {filteredEvents.slice(0, 3).map((event) => (
            <article className="UpcomingSingleEventContainer" key={event._id} onClick={() => navigateToDetails(event._id)}>
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

export default UpcomingEvents;
