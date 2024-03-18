import { useNavigate, useParams } from "react-router-dom";
import "./HostProfile.scss";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import backArrow from "../../assets/images/arrow_back.svg";
import picDummy from "../../assets/images/eventDefaultPics/picDummy.png";
import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import emptyStar from "../../assets/images/empzy_purple_star.svg";
import fullStar from "../../assets/images/full_grey_star.svg";
import EventCards from "../../components/eventCards/EventCards";
import Nav from "../../components/nav/Nav";

const HostProfile = ({ authorization, userProfileInfo }) => {
    const { hostId } = useParams();
    const [hostDetails, setHostDetails] = useState({});
    const [showEvents, setShowEvents] = useState(false);
    const [showAboutMe, setShowAboutMe] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [errorMessageAbout, setErrorMessageAbout] = useState(
        "Der/ die Organisator:in hat noch keine Infos über sich geteilt"
    );
    const [errorMessageReview, setErrorMessageReview] = useState(
        "Der/ die Organisator:in wurde noch nicht bewertet"
    );
    const navigate = useNavigate();
    console.log(hostId);

    useEffect(() => {
        async function fetchHostDetails() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/user/host-details/${hostId}`,
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
                setHostDetails(result);
                setShowEvents(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchHostDetails();
    }, []);

    function showAboutMeFunc() {
        setShowAboutMe(true);
        setShowEvents(false);
        setShowReviews(false);
    }

    function showEventsFunc() {
        setShowAboutMe(false);
        setShowEvents(true);
        setShowReviews(false);
    }

    function showReviewsFunc() {
        setShowAboutMe(false);
        setShowEvents(false);
        setShowReviews(true);
    }
    console.log(hostDetails);
    return (
        <>
            <section className="hostDetails-wrapper">
                <div className="eventDetail-header-wrap">
                    <img
                        src={backArrow}
                        alt="back arrow"
                        onClick={() => navigate(-1)}
                        className="backArrow"
                    />
                    <p className="eventDetails-hl">
                        {hostDetails?.hostDetails?.userName}
                    </p>
                </div>
                <div className="profile-pic-container">
                    <img
                        className="clip"
                        src={
                            hostDetails?.hostDetails?.profilePicURL
                                ? `${backendUrl}/download/${hostDetails.hostDetails.profilePicURL}`
                                : picDummy
                        }
                        alt=""
                    />
                </div>
                <BtnOutlined text="ORGANISATOR:IN BEWERTEN" icon={emptyStar} />
                <div className="hostProfile-button-wrapper">
                    <button
                        className={
                            showAboutMe
                                ? "hostProfile-button active-button"
                                : "hostProfile-button"
                        }
                        onClick={showAboutMeFunc}
                    >
                        ÜBER MICH
                    </button>
                    <button
                        className={
                            showEvents
                                ? "hostProfile-button active-button"
                                : "hostProfile-button"
                        }
                        onClick={showEventsFunc}
                    >
                        EVENTS
                    </button>
                    <button
                        className={
                            showReviews
                                ? "hostProfile-button active-button"
                                : "hostProfile-button"
                        }
                        onClick={showReviewsFunc}
                    >
                        BEWERTUNGEN
                    </button>
                </div>
                {showEvents &&
                    hostDetails?.allEventsOfHost?.map((singleEvent) => (
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
                    ))}
                {showAboutMe ? (
                    hostDetails?.hostDetails?.bio ? (
                        <p
                            style={{
                                color: "#747688",
                                padding: "4px 12px 8px 12px",
                                fontWeight: "300",
                                textAlign: "center",
                            }}
                        >
                            {hostDetails?.hostDetails?.bio}
                        </p>
                    ) : (
                        <p
                            style={{
                                color: "grey",
                                padding: "4px 12px 8px 12px",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {errorMessageAbout}
                        </p>
                    )
                ) : null}

                {showReviews ? (
                    hostDetails?.allReviewsAboutHost?.length > 0 ? (
                        hostDetails?.allReviewsAboutHost.map((singleReview) => (
                            <article
                                key={singleReview._id}
                                className="hostDetails-review-wrap"
                            >
                                {singleReview.reviewerName ? (
                                    <h3>{singleReview.reviewerName}</h3>
                                ) : (
                                    <h3>Event Besucher:in</h3>
                                )}
                                {/* STAR Rating einfügen! */}
                                <p
                                    style={{
                                        color: "#747688",
                                        // padding: "4px 12px 8px 12px",
                                        fontWeight: "300",
                                        textAlign: "left",
                                    }}
                                >
                                    {singleReview.text}
                                </p>
                            </article>
                        ))
                    ) : (
                        <p
                            style={{
                                color: "grey",
                                padding: "4px 12px 8px 12px",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {errorMessageReview}
                        </p>
                    )
                ) : null}
            </section>
            <Nav />
        </>
    );
};

export default HostProfile;
