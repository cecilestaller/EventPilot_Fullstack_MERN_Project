import "./EventDetails.scss";
import art from "../../assets/images/eventDefaultPics/artPic.jpg";
import concert from "../../assets/images/eventDefaultPics/micPic.jpg";
import movie from "../../assets/images/eventDefaultPics/crowdMovie.jpg";
import sport from "../../assets/images/eventDefaultPics/sportPic.jpg";
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
    const [userRegistered, setUserRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [defaultPic, setDefaultPic] = useState();
    const [edit, setEdit] = useState(false);
    const [fullyBooked, setFullyBooked] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);

    console.log("userProfileInfo: ", userProfileInfo);

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
                    // check if user already registered || has event on wishlist
                    if (userProfileInfo?.userWishlist?.includes(eventId)) {
                        setEventIsFavorite(true);
                    }
                    if (userProfileInfo?.registeredEvents?.includes(eventId)) {
                        setUserRegistered(true);
                    }
                }
                // check if event ist cancelled || fullyBooked
                if (result?.eventDetails?.isCancelled) {
                    setIsCancelled(true);
                }
                if (result?.eventDetails?.fullyBooked) {
                    setFullyBooked(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchEventDetails();
    }, []);

    console.log("userIsHost: ", userIsHost);
    console.log(eventDetails);

    // -------- Format the Date ----------------
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

    // -------- ADD Event to Wishlist FETCH ------------
    async function addEventToWishlist() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/user/wishlist/${eventId}`,
                {
                    method: "PATCH",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            setEventIsFavorite(true);
            // window.location.reload(); // ! mit rein nehmen, wenn userProfileInfo direkt geupdated werden soll
        } catch (error) {
            console.log(error);
        }
    }

    async function removeEventFromWishlist() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/user/update-wishlist/${eventId}`,
                {
                    method: "PATCH",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            setEventIsFavorite(false);
            // window.location.reload(); // ! mit rein nehmen, wenn userProfileInfo direkt geupdated werden soll
        } catch (error) {
            console.log(error);
        }
    }

    // --------- REGISTER for Event FETCH ----------------

    async function registerForEvent() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/user/register/${eventId}`,
                {
                    method: "PATCH",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            setUserRegistered(true);
            setSuccessMessage(
                "Du hast dich erfolgreich für das Event registriert."
            );
            // window.location.reload(); // ! mit rein nehmen, wenn userProfileInfo direkt geupdated werden soll
        } catch (error) {
            console.log(error);
        }
    }

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
                                        onClick={removeEventFromWishlist}
                                    />
                                ) : (
                                    <img
                                        src={emptyBookmark}
                                        alt="emptyBookmark"
                                        className="bookMark"
                                        onClick={addEventToWishlist}
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
                            <div
                                className={
                                    fullyBooked || isCancelled
                                        ? "hide"
                                        : "eventDetails-registered-box-wrap"
                                }
                            >
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
                            {isCancelled ? (
                                <p
                                    style={{
                                        color: "red",
                                        padding: "4px 12px 8px 12px",
                                        fontWeight: "500",
                                    }}
                                >
                                    EVENT ABGESAGT
                                </p>
                            ) : null}
                            {fullyBooked ? (
                                <p
                                    style={{
                                        color: "red",
                                        padding: "4px 12px 8px 12px",
                                        fontWeight: "500",
                                    }}
                                >
                                    EVENT AUSGEBUCHT
                                </p>
                            ) : null}
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
                            <Link
                                to={`/host/${eventDetails?.host?._id}`}
                                className="hostDetails-link"
                            >
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
                            <p style={{ color: "green", padding: "12px" }}>
                                {successMessage}
                            </p>
                        </article>
                        {userRegistered || fullyBooked || isCancelled ? null : (
                            <BtnSubmit
                                text="REGISTRIEREN"
                                onClick={registerForEvent}
                            />
                        )}
                    </section>
                )}
            </section>
            <Nav />
        </>
    );
};

export default EventDetails;
