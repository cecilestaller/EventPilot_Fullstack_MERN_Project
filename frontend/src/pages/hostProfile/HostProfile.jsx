import { useNavigate, useParams } from "react-router-dom";
import "./HostProfile.scss";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import backArrow from "../../assets/images/arrow_back.svg";
import picDummy from "../../assets/images/eventDefaultPics/picDummy.png";
import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import emptyStar from "../../assets/images/empzy_purple_star.svg";
import fullStar from "../../assets/images/full_grey_star.svg";
import EventCards from "../../components/eventCards/EventCards";
import Nav from "../../components/nav/Nav";
import Rating from "@mui/material/Rating";

const HostProfile = ({ authorization, userProfileInfo }) => {
    const { hostId } = useParams();
    const [hostDetails, setHostDetails] = useState({});
    const [showEvents, setShowEvents] = useState(false);
    const [showAboutMe, setShowAboutMe] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [writeReview, setWriteReview] = useState(false);
    const [value, setValue] = useState(0);
    const [reviewContent, setReviewContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessageAbout, setErrorMessageAbout] = useState(
        "Organisator:in hat noch keine Infos über sich geteilt"
    );
    const [errorMessageReview, setErrorMessageReview] = useState(
        "Organisator:in wurde noch nicht bewertet"
    );
    const navigate = useNavigate();

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
                if (!success) throw error;
                setHostDetails(result);
                setShowEvents(true);
            } catch (error) {
                console.log(error);
            }
        }

        fetchHostDetails();
    }, [successMessage]);

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

    // -------- ADD new REVIEW fetch ---------
    async function addNewReview(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/review/${hostId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        authorization,
                    },
                    body: JSON.stringify({
                        stars: value,
                        text: reviewContent,
                    }),
                }
            );
            const { success, result, error, message } = await response.json();
            if (!success)
                setErrorMessage(
                    error.message ||
                        "Die Bewertung konnt nicht abgeschickt werden"
                );
            setValue(0);
            setReviewContent("");
            setSuccessMessage("Deine Bewertung wurde erfolgreich abgeschickt.");
            setTimeout(() => {
                setWriteReview(false);
            }, 1500);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <section className="hostDetails-wrapper">
                {writeReview ? (
                    <section className="hostDetails-reviewHostForm-wrap">
                        <div className="hostDetails-reviewHeader-wrap">
                            <img
                                src={backArrow}
                                alt="back arrow"
                                onClick={() => setWriteReview(false)}
                                className="backArrow"
                            />
                            <p className="eventDetails-hl">
                                Bewerte {hostDetails?.hostDetails?.userName}
                            </p>
                        </div>
                        <div className="profile-Hostpic-container">
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
                        <p
                            style={{
                                color: "green",
                                padding: "4px 12px 8px 12px",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {successMessage}
                        </p>
                        <form className="reviewHost-form">
                            <div className="rating-div">
                                <Rating
                                    name="simple-controlled"
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                    size="large"
                                    sx={{
                                        color: "#00ecaa",
                                        fontSize: "48px",
                                    }}
                                />
                            </div>

                            <textarea
                                className="reviewHost-textarea"
                                rows={9}
                                // cols={20}
                                placeholder="Deine Bewertung"
                                value={reviewContent}
                                onChange={(e) =>
                                    setReviewContent(e.target.value)
                                }
                            />
                            <BtnSubmit text="SUBMIT" onClick={addNewReview} />
                        </form>
                        <p
                            style={{
                                color: "red",
                                padding: "4px 12px 8px 12px",
                                fontWeight: "500",
                                textAlign: "center",
                            }}
                        >
                            {errorMessage}
                        </p>
                    </section>
                ) : (
                    <section className="hostDetails-info-wrap">
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
                        <BtnOutlined
                            text="ORGANISATOR:IN BEWERTEN"
                            icon={emptyStar}
                            onClick={() => setWriteReview(!writeReview)}
                        />
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
                                        padding: "4px 16px 8px 16px",
                                        fontWeight: "400",
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
                                hostDetails?.allReviewsAboutHost.map(
                                    (singleReview) => (
                                        <article
                                            key={singleReview._id}
                                            className="hostDetails-review-wrap"
                                        >
                                            {singleReview.reviewerName ? (
                                                <h3>
                                                    {singleReview.reviewerName}
                                                </h3>
                                            ) : (
                                                <h3>Event Besucher:in</h3>
                                            )}
                                            <Rating
                                                name="read-only"
                                                value={singleReview.stars}
                                                readOnly
                                                size="small"
                                                sx={{
                                                    color: "#00ecaa",
                                                }}
                                            />
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
                                    )
                                )
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
                )}
            </section>
            <Nav />
        </>
    );
};

export default HostProfile;
