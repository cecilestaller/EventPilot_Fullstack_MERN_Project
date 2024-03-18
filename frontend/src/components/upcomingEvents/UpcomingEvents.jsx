import { useEventFetchContext } from "../../context/eventFetchContext";
import "./UpcomingEvents.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocationIcon from "../../assets/images/Map Pin_grey.svg"
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg"
import BookmarkFull from "../../assets/images/full_bookmark.svg"
import defaultProfilePic from "../../assets/images/eventDefaultPics/picDummy.png"
import art from "../../assets/images/eventDefaultPics/artPic.jpg";
import concert from "../../assets/images/eventDefaultPics/micPic.jpg";
import movie from "../../assets/images/eventDefaultPics/crowdMovie.jpg";
import sport from "../../assets/images/eventDefaultPics/sportPic.jpg";
import food from "../../assets/images/eventDefaultPics/food.jpg";
import komet from "../../assets/images/eventDefaultPics/komet.jpg";
import comedy from "../../assets/images/eventDefaultPics/loughComedy.jpg";
import { backendUrl } from "../../api";

const UpcomingEvents = () => {

    

    const { fetchEventData, setFetchEventData } = useEventFetchContext();
    const [filteredEvents, setFilteredEvents] = useState([])
    const [defaultPicEvent1, setDefaultPicEvent1] = useState("")
    const [defaultPicEvent2, setDefaultPicEvent2] = useState("")
    const [defaultPicEvent3, setDefaultPicEvent3] = useState("")
    const navigate = useNavigate()
    const currentDate = new Date();


    
    useEffect(() => {
        setFilteredEvents(
            fetchEventData.filter(fetchEventData => new Date(fetchEventData?.eventDate) > currentDate) // Keep only dates in the future
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            )
            if (filteredEvents[0]?.category === "comedy") {
                setDefaultPicEvent1(comedy);
            } else if (filteredEvents[0]?.category === "sport") {
                setDefaultPicEvent1(sport);
            } else if (filteredEvents[0]?.category === "art") {
                setDefaultPicEvent1(art);
            } else if (filteredEvents[0]?.category === "music") {
                setDefaultPicEvent1(concert);
            } else if (filteredEvents[0]?.category === "food") {
                setDefaultPicEvent1(food);
            } else if (filteredEvents[0]?.category === "movie") {
                setDefaultPicEvent1(movie);
            } else if (filteredEvents[0]?.category === "literature" || "others") {
                setDefaultPicEvent1(komet);
            }
            if (filteredEvents[1]?.category === "comedy") {
                setDefaultPicEvent2(comedy);
            } else if (filteredEvents[1]?.category === "sport") {
                setDefaultPicEvent2(sport);
            } else if (filteredEvents[1]?.category === "art") {
                setDefaultPicEvent2(art);
            } else if (filteredEvents[1]?.category === "music") {
                setDefaultPicEvent2(concert);
            } else if (filteredEvents[1]?.category === "food") {
                setDefaultPicEvent2(food);
            } else if (filteredEvents[1]?.category === "movie") {
                setDefaultPicEvent2(movie);
            } else if (filteredEvents[1]?.category === "literature" || "others") {
                setDefaultPicEvent2(komet);
            }
            if (filteredEvents[2]?.category === "comedy") {
                setDefaultPicEvent3(comedy);
            } else if (filteredEvents[2]?.category === "sport") {
                setDefaultPicEvent3(sport);
            } else if (filteredEvents[2]?.category === "art") {
                setDefaultPicEvent3(art);
            } else if (filteredEvents[2]?.category === "music") {
                setDefaultPicEvent3(concert);
            } else if (filteredEvents[2]?.category === "food") {
                setDefaultPicEvent3(food);
            } else if (filteredEvents[2]?.category === "movie") {
                setDefaultPicEvent3(movie);
            } else if (filteredEvents[2]?.category === "literature" || "others") {
                setDefaultPicEvent3(komet);
            }
        },[fetchEventData])
        
        // console.log(filteredEvents[5].registeredGuests);
        
        // check category of event to decide which defaultPic

const navigateToDetails = (id) => {
    navigate(`/events/${id}`)
    // console.log(event); //is event id
}
    return (
        <div className="UpcomingContainer">
        {/* {filteredEvents.slice(0, 3).map((event) => ( */}
            {/* <article className="UpcomingSingleEventContainer" key={event._id} onClick={() => navigateToDetails(event._id)}>
                <div className="ImageAndIconContainer">
                    <img className="BookmarkIcon" src={BookmarkEmpty} alt="" />
                    <img className="EventImage" src={event.eventPicURL ? `${backendUrl}/download/${event.eventPicURL}` : defaultPicEvent1} alt="" />
                    <div className="EventDateIcon">{new Date(event.eventDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                </div>
                <p className="EventTitle">{event.title}</p>
                <div className="EventCardBottomDetailsContainer">
                    <div className="EventCardRegisteredInfo">
                        <img className="RegisteredUserFirstImage" src={event.registeredGuests[0]?.profilePicURL ? `${backendUrl}/download/${event.registeredGuests[0].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserSecondImage" src={event.registeredGuests[1]?.profilePicURL ? `${backendUrl}/download/${event.registeredGuests[1].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserThirdImage" src={event.registeredGuests[2]?.profilePicURL ? `${backendUrl}/download/${event.registeredGuests[2].profilePicURL}` : defaultProfilePic} alt="" />
                        <p className="RegisteredUserAmout">{event.registeredGuests?.length > 99 ? '99+' : (event.registeredGuests?.length || "0")}</p>
                    </div>
                    <div className="LocationInfo">
                        <img className="LocationPinIcon" src={LocationIcon} alt="" />
                        <p className="locationState">{event.eventAddress.province}</p>
                    </div>
                </div>
            </article> */}
            <article className="UpcomingSingleEventContainer" key={filteredEvents[0]?._id} onClick={() => navigateToDetails(filteredEvents[0]._id)}>
                <div className="ImageAndIconContainer">
                    <img className="BookmarkIcon" src={BookmarkEmpty} alt="" />
                    <img className="EventImage" src={filteredEvents[0]?.eventPicURL ? `${backendUrl}/download/${filteredEvents[0].eventPicURL}` : defaultPicEvent1} alt="" />
                    <div className="EventDateIcon">{new Date(filteredEvents[0]?.eventDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                </div>
                <p className="EventTitle">{filteredEvents[0]?.title}</p>
                <div className="EventCardBottomDetailsContainer">
                    <div className="EventCardRegisteredInfo">
                        <img className="RegisteredUserFirstImage" src={filteredEvents[0]?.registeredGuests[0]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[0]?.registeredGuests[0].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserSecondImage" src={filteredEvents[0]?.registeredGuests[1]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[0]?.registeredGuests[1].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserThirdImage" src={filteredEvents[0]?.registeredGuests[2]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[0]?.registeredGuests[2].profilePicURL}` : defaultProfilePic} alt="" />
                        <p className="RegisteredUserAmout">{filteredEvents[0]?.registeredGuests?.length > 99 ? '99+' : (filteredEvents[0]?.registeredGuests?.length || "0")}</p>
                    </div>
                    <div className="LocationInfo">
                        <img className="LocationPinIcon" src={LocationIcon} alt="" />
                        <p className="locationState">{filteredEvents[0]?.eventAddress?.province}</p>
                    </div>
                </div>
            </article>
            <article className="UpcomingSingleEventContainer" key={filteredEvents[1]?._id} onClick={() => navigateToDetails(filteredEvents[1]._id)}>
                <div className="ImageAndIconContainer">
                    <img className="BookmarkIcon" src={BookmarkEmpty} alt="" />
                    <img className="EventImage" src={filteredEvents[1]?.eventPicURL ? `${backendUrl}/download/${filteredEvents[1].eventPicURL}` : defaultPicEvent2} alt="" />
                    <div className="EventDateIcon">{new Date(filteredEvents[1]?.eventDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                </div>
                <p className="EventTitle">{filteredEvents[1]?.title}</p>
                <div className="EventCardBottomDetailsContainer">
                    <div className="EventCardRegisteredInfo">
                        <img className="RegisteredUserFirstImage" src={filteredEvents[1]?.registeredGuests[0]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[1]?.registeredGuests[0].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserSecondImage" src={filteredEvents[1]?.registeredGuests[1]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[1]?.registeredGuests[1].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserThirdImage" src={filteredEvents[1]?.registeredGuests[2]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[1]?.registeredGuests[2].profilePicURL}` : defaultProfilePic} alt="" />
                        <p className="RegisteredUserAmout">{filteredEvents[1]?.registeredGuests?.length > 99 ? '99+' : (filteredEvents[1]?.registeredGuests?.length || "0")}</p>
                    </div>
                    <div className="LocationInfo">
                        <img className="LocationPinIcon" src={LocationIcon} alt="" />
                        <p className="locationState">{filteredEvents[1]?.eventAddress?.province}</p>
                    </div>
                </div>
            </article>
            <article className="UpcomingSingleEventContainer" key={filteredEvents[2]?._id} onClick={() => navigateToDetails(filteredEvents[2]._id)}>
                <div className="ImageAndIconContainer">
                    <img className="BookmarkIcon" src={BookmarkEmpty} alt="" />
                    <img className="EventImage" src={filteredEvents[2]?.eventPicURL ? `${backendUrl}/download/${filteredEvents[2].eventPicURL}` : defaultPicEvent3} alt="" />
                    <div className="EventDateIcon">{new Date(filteredEvents[2]?.eventDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })}</div>
                </div>
                <p className="EventTitle">{filteredEvents[2]?.title}</p>
                <div className="EventCardBottomDetailsContainer">
                    <div className="EventCardRegisteredInfo">
                        <img className="RegisteredUserFirstImage" src={filteredEvents[2]?.registeredGuests[0]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[2]?.registeredGuests[0].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserSecondImage" src={filteredEvents[2]?.registeredGuests[1]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[2]?.registeredGuests[1].profilePicURL}` : defaultProfilePic} alt="" />
                        <img className="RegisteredUserThirdImage" src={filteredEvents[2]?.registeredGuests[2]?.profilePicURL ? `${backendUrl}/download/${filteredEvents[2]?.registeredGuests[2].profilePicURL}` : defaultProfilePic} alt="" />
                        <p className="RegisteredUserAmout">{filteredEvents[2]?.registeredGuests?.length > 99 ? '99+' : (filteredEvents[2]?.registeredGuests?.length || "0")}</p>
                    </div>
                    <div className="LocationInfo">
                        <img className="LocationPinIcon" src={LocationIcon} alt="" />
                        <p className="locationState">{filteredEvents[2]?.eventAddress?.province}</p>
                    </div>
                </div>
            </article>
        {/* ))} */}
        </div>
    );
};

export default UpcomingEvents;