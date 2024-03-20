import { useEffect, useState } from "react";
import Nav from "../../components/nav/Nav";
import "./LikedEvents.scss";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import EventCards from "../../components/eventCards/EventCards";
import { backendUrl } from "../../api";
import { useNavigate } from "react-router-dom";
// import { useUserProfileInfoContext } from "../../context/userProfileInfoContext";

const LikedEvents = ({ authorization, userProfileInfo }) => {
    const [likedEvents, setLikedEvents] = useState(false);
    const [registeredEvents, setRegisteredEvents] = useState(false);
    const [likedEventsData, setLikedEventsData] = useState([]);
    const [registeredEventsData, setRegisteredEventsData] = useState([]);
    const [errorMessageLiked, setErrorMessageLiked] = useState("");
    const [errorMessageRegistered, setErrorMessageRegistered] = useState("");
    // const { userProfileData, setUserProfileData } = useUserProfileInfoContext();
    const navigate = useNavigate();

    useEffect(() => {
        async function showWishlistWhenLoadingPage() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/user/wishlist-events`,
                    {
                        headers: { authorization },
                    }
                );
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessageLiked(
                        "Du hast noch keine Events gespeichert"
                    );
                setLikedEvents(true);
                setLikedEventsData(result);
            } catch (error) {
                console.log(error);
            }
        }

        showWishlistWhenLoadingPage();
    }, []);

    async function showUsersWishlist() {
        setLikedEvents(true);
        setRegisteredEvents(false);

        try {
            const response = await fetch(
                `${backendUrl}/api/v1/user/wishlist-events`,
                {
                    headers: { authorization },
                }
            );
            const { success, result, error, message } = await response.json();
            if (!success)
                setErrorMessageLiked("Du hast noch keine Events gespeichert");
            return setLikedEventsData(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function showUsersRegisteredEvents() {
        setLikedEvents(false);
        setRegisteredEvents(true);

        try {
            const response = await fetch(
                `${backendUrl}/api/v1/user/registered-events`,
                {
                    headers: { authorization },
                }
            );
            const { success, result, error, message } = await response.json();
            if (!success)
                setErrorMessageRegistered(
                    "Du hast dich für kein Event registriert"
                );
            return setRegisteredEventsData(result);
        } catch (error) {
            console.log(error);
        }
    }

    function redirectToSearchEvents() {
        // weiterleitung auf Search Events Page
        navigate("/search");
    }

    return (
        <>
            <section className="likedEvents-wrapper">
                <div className="likedEvents-button-wrapper">
                    <button
                        className={
                            likedEvents
                                ? "likedEvents-button active"
                                : "likedEvents-button"
                        }
                        onClick={showUsersWishlist}
                    >
                        GESPEICHERT
                    </button>
                    <button
                        className={
                            registeredEvents
                                ? "likedEvents-button active"
                                : "likedEvents-button"
                        }
                        onClick={showUsersRegisteredEvents}
                    >
                        REGISTRIERT
                    </button>
                </div>
                {likedEvents ? (
                    <section className="likedEvents-userWishlist-wrap">
                        {/* Page-Content when User clicks "gespeichert" */}
                        {errorMessageLiked ? (
                            <>
                                <p
                                    style={{
                                        color: "red",
                                        padding: "4px 12px 8px 12px",
                                        fontWeight: "500",
                                        textAlign: "center",
                                        marginBottom: "55vh",
                                    }}
                                >
                                    {errorMessageLiked}
                                </p>
                                <BtnSubmit
                                    text="EVENTS SUCHEN"
                                    onClick={redirectToSearchEvents}
                                />
                            </>
                        ) : (
                            likedEventsData?.length > 0 &&
                            likedEventsData.map((singleEvent) => (
                                <EventCards
                                    Title={singleEvent?.title}
                                    unformatedDate={singleEvent?.eventDate}
                                    State={singleEvent?.eventAddress?.province}
                                    eventId={singleEvent?._id}
                                    key={singleEvent?._id}
                                    eventPicURL={singleEvent?.eventPicURL}
                                    userProfileInfo={userProfileInfo}
                                    authorization={authorization}
                                    category={singleEvent?.category}
                                />
                            ))
                        )}
                    </section>
                ) : (
                    <section className="likedEvents-registeredEvents-wrap">
                        {/* Page-Content when User clicks "registriert" */}
                        {errorMessageRegistered ? (
                            <>
                                <p
                                    style={{
                                        color: "red",
                                        padding: "4px 12px 8px 12px",
                                        fontWeight: "500",
                                        textAlign: "center",
                                        marginBottom: "55vh",
                                    }}
                                >
                                    {errorMessageRegistered}
                                </p>
                                <BtnSubmit
                                    text="EVENTS SUCHEN"
                                    onClick={redirectToSearchEvents}
                                />
                            </>
                        ) : (
                            registeredEventsData?.length > 0 &&
                            registeredEventsData.map((singleEvent) => (
                                <EventCards
                                    Title={singleEvent?.title}
                                    unformatedDate={singleEvent?.eventDate}
                                    State={singleEvent?.eventAddress?.province}
                                    eventId={singleEvent?._id}
                                    key={singleEvent?._id}
                                    eventPicURL={singleEvent?.eventPicURL}
                                    userProfileInfo={userProfileInfo}
                                    authorization={authorization}
                                    category={singleEvent?.category}
                                />
                            ))
                        )}
                    </section>
                )}
            </section>
            <Nav highlight="events" />
        </>
    );
};

export default LikedEvents;
