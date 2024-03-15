import "./EventDetails.scss";
import art from "../../assets/images/eventDefaultPics/art.jpg";
import concert from "../../assets/images/eventDefaultPics/crowdConcert.jpg";
import movie from "../../assets/images/eventDefaultPics/crowdMovie.jpg";
import sport from "../../assets/images/eventDefaultPics/crowdSport.jpg";
import food from "../../assets/images/eventDefaultPics/food.jpg";
import komet from "../../assets/images/eventDefaultPics/komet.jpg";
import comedy from "../../assets/images/eventDefaultPics/loughComedy.jpg";
import picDummy from "../../assets/images/eventDefaultPics/picDummy.png";
import arrowBack from "../../assets/images/arrow_back_white.svg";
import emptyBookmark from "../../assets/images/empty_Bookmark.svg";
import fullBookmark from "../../assets/images/full_bookmark.svg";
import editIcon from "../../assets/images/profileimage_edit.svg";
import DateIcon from "../../assets/images/Date.svg";
import locationPinPurple from "../../assets/images/Location_Pin_purple.svg";
import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import Nav from "../../components/nav/Nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";

const EventDetails = ({ authorization, userProfileInfo }) => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [userIsHost, setUserIsHost] = useState(false);
    const [eventDetails, setEventDetails] = useState({});
    const [eventIsFavorite, setEventIsFavorite] = useState(false); // ! TODO: check if Event is in userWishlist!
    const [errorMessage, setErrorMessage] = useState("");
    const [defaultPic, setDefaultPic] = useState();
    const [edit, setEdit] = useState(false);
    const [fullyBooked, setFullyBooked] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    // console.log(eventId);
    console.log(userProfileInfo);

    useEffect(() => {
        async function fetchEventDetails() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/events/${eventId}`,
                    {
                        headers: {
                            authorization,
                        },
                    }
                );
                const { success, result, error } = await response.json();
                if (!success) return setErrorMessage("Loading Details failed");
                // check category of event to decide which defaultPic
                if (result.eventDetails.category === "comedy") {
                    setDefaultPic(comedy);
                } else if (result.eventDetails.category === "sport") {
                    setDefaultPic(sport);
                } else if (result.eventDetails.category === "art") {
                    setDefaultPic(art);
                } else if (result.eventDetails.category === "music") {
                    setDefaultPic(concert);
                } else if (result.eventDetails.category === "food") {
                    setDefaultPic(food);
                } else if (result.eventDetails.category === "movie") {
                    setDefaultPic(movie);
                } else if (
                    result.eventDetails.category === "literature" ||
                    "others"
                ) {
                    setDefaultPic(komet);
                }
                // check if authenticatedUser is host
                if (userProfileInfo._id === result.host._id) {
                    // authenticatedUser is host
                    setUserIsHost(true);
                    setEventDetails(result);
                } else {
                    setEventDetails(result);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchEventDetails();
    }, []);

    console.log("userIsHost: ", userIsHost);
    console.log(eventDetails);
    console.log(eventDetails?.eventDetails?.eventDate);

    // ====== Format the Date ======
    const inputDate = new Date(eventDetails?.eventDetails?.eventDate);

    const monthNames = [
        "Jan",
        "Feb",
        "Mär",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
    ];

    const day = inputDate.getDate();
    const month = monthNames[inputDate.getMonth()]; // Monate werden von 0 bis 11 gezählt, daher fügen wir 1 hinzu
    const year = inputDate.getFullYear();
    const hours = inputDate.getHours();
    const minutes = inputDate.getMinutes();

    // Formatierung der Daten und Zeit
    const formattedDate = `${day < 10 ? "0" : ""}${day}. ${month}, ${year}`;
    const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} Uhr`;

    // Gesamtes formatiertes Datum und Zeit
    // const formattedDateTime = `${formattedDate} ${formattedTime}`;

    return (
        <>
            <section className="eventDetail-wrapper">
                {userIsHost ? (
                    <>
                        {edit ? (
                            <>
                                {/* Page-Content if Host chlicked "edit event" (Form) */}
                            </>
                        ) : (
                            <>
                                {/* Page-Content of Host */}
                                <h2>
                                    EventDetail-Page für Hosts... folgt in kürze
                                </h2>
                            </>
                        )}
                    </>
                ) : (
                    <section className="eventDetail-User-wrapper">
                        {/* Page-Content of User */}
                        <article className="eventDetail-hero-wrap">
                            <div className="eventDetail-header-wrap">
                                <img
                                    src={arrowBack}
                                    alt="back arrow"
                                    onClick={() => navigate(-1)}
                                    className="backArrow"
                                />
                                <p className="eventDetails-hl">Event Details</p>
                                {eventIsFavorite ? (
                                    <img
                                        src={fullBookmark}
                                        alt="fullBookmark"
                                        className="bookMark"
                                    />
                                ) : (
                                    <img
                                        src={emptyBookmark}
                                        alt="emptyBookmark"
                                        className="bookMark"
                                    />
                                )}
                            </div>
                            <img
                                src={
                                    eventDetails?.eventDetails?.eventPicURL
                                        ? `${backendUrl}/download/${eventDetails.eventDetails.eventPicURL}`
                                        : defaultPic
                                }
                                alt="eventPic"
                                className="eventPic"
                            />
                            <div className="eventDetails-registered-box-wrap">
                                <div className="registered-box-profilePics"></div>
                                <p className="registered-box-text">
                                    {eventDetails?.amountRegisteredGuests} User
                                    bereits registriert
                                </p>
                            </div>
                        </article>
                        <article className="eventDetails-info-wrap">
                            <h2 className="eventDetails-eventTitle">
                                {eventDetails?.eventDetails?.title}
                            </h2>
                            <div className="eventDetails-date-wrap">
                                <img src={DateIcon} alt="calendar" />

                                <div className="eventDetails-dateInfo-wrap">
                                    <h3 className="eventDetails-h3">
                                        {formattedDate}
                                    </h3>
                                    <p className="eventDetails-p">
                                        {formattedTime}
                                    </p>
                                </div>
                            </div>
                            <div className="eventDetails-address-wrap">
                                <img src={locationPinPurple} alt="calendar" />
                                <div className="eventDetails-addressInfo-wrap">
                                    <h3 className="eventDetails-h3">
                                        {
                                            eventDetails?.eventDetails
                                                ?.eventAddress?.street
                                        }
                                    </h3>
                                    <p className="eventDetails-p">
                                        {
                                            eventDetails?.eventDetails
                                                ?.eventAddress?.city
                                        }
                                        ,{" "}
                                        {
                                            eventDetails?.eventDetails
                                                ?.eventAddress?.province
                                        }
                                        ,{" "}
                                        {
                                            eventDetails?.eventDetails
                                                ?.eventAddress?.country
                                        }
                                    </p>
                                </div>
                            </div>
                            <Link to={`/host/${eventDetails?.host?._id}`}>
                                <div className="eventDetail-hostInfoBox">
                                    <img
                                        src={
                                            eventDetails?.host?.profilePicURL
                                                ? `${backendUrl}/download/${eventDetails.host.profilePicURL}`
                                                : picDummy
                                        }
                                        alt="hostProfilePic"
                                        className="eventDetails-hostPic"
                                    />
                                    <div className="eventDetail-hostInfo-wrap">
                                        <h4 className="eventDetails-h4">
                                            {eventDetails?.host?.userName}{" "}
                                        </h4>
                                        <p className="eventDetails-p">
                                            Organisator:in
                                        </p>
                                        {/* ! STAR Ratin */}
                                    </div>
                                    {/* <button className="follow">Follow</button> */}
                                </div>
                            </Link>
                            <h5 className="eventDetails-h5">
                                Event Beschreibung
                            </h5>
                            <p>{eventDetails?.eventDetails?.description}</p>
                        </article>
                        <BtnSubmit text="REGISTRIEREN" />
                    </section>
                )}
            </section>
            <Nav />
        </>
    );
};

export default EventDetails;
