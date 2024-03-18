import "./EventCards.scss";
import LocationIcon from "../../assets/images/Map Pin_grey.svg";
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg";
import BookmarkFull from "../../assets/images/full_bookmark.svg";
import art from "../../assets/images/eventDefaultPics/artPic.jpg";
import concert from "../../assets/images/eventDefaultPics/micPic.jpg";
import movie from "../../assets/images/eventDefaultPics/crowdMovie.jpg";
import sport from "../../assets/images/eventDefaultPics/sportPic.jpg";
import food from "../../assets/images/eventDefaultPics/food.jpg";
import komet from "../../assets/images/eventDefaultPics/komet.jpg";
import comedy from "../../assets/images/eventDefaultPics/loughComedy.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";

const EventCards = ({
    unformatedDate,
    Title,
    State,
    eventId,
    category,
    eventPicURL,
    userProfileInfo,
    authorization,
}) => {
    const [eventIsFavorite, setEventIsFavorite] = useState(null);
    const [defaultPic, setDefaultPic] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        function check() {
            if (category === "comedy") {
                setDefaultPic(comedy);
            } else if (category === "sport") {
                setDefaultPic(sport);
            } else if (category === "art") {
                setDefaultPic(art);
            } else if (category === "music") {
                setDefaultPic(concert);
            } else if (category === "food") {
                setDefaultPic(food);
            } else if (category === "movie") {
                setDefaultPic(movie);
            } else if (category === "literature" || category === "others") {
                setDefaultPic(komet);
            }
            if (userProfileInfo?.userDetails?.userWishlist?.includes(eventId)) {
                setEventIsFavorite(true);
            } else {
                setEventIsFavorite(false);
            }
        }
        check();
    }, [eventPicURL]);

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

    // -------- REMOVE Event from Wishlist FETCH ------------
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

    // =============== formatting Date ======================
    let formattedDateTime = null;
    if (unformatedDate) {
        const inputDate = new Date(unformatedDate);
        const day = inputDate.getDate();
        const month = inputDate.getMonth() + 1; // Months are 0-indexed, so we add 1
        const year = inputDate.getFullYear();
        const hours = inputDate.getHours();
        const minutes = inputDate.getMinutes();

        // Format the date and time
        const formattedDate = `${day < 10 ? "0" : ""}${day}.${
            month < 10 ? "0" : ""
        }${month}.${year}`;
        const formattedTime = `${hours}:${
            minutes < 10 ? "0" : ""
        }${minutes} Uhr`;

        formattedDateTime = `${formattedDate} ${formattedTime}`;
    }

    const navigateToDetails = () => {
        navigate(`/eventdetails/${eventId}`);
    };

    return (
        <>
            <article className="EventCardsContainer">
                <img
                    onClick={() => navigateToDetails()}
                    src={
                        eventPicURL
                            ? `${backendUrl}/download/${eventPicURL}`
                            : defaultPic
                    }
                    alt="eventPic"
                    className="EventCardsPic"
                />
                <div
                    onClick={() => navigateToDetails()}
                    className="EventCardsDetails"
                >
                    <p className="EventCardsDateTag">{formattedDateTime}</p>
                    <p className="EventCardsTitleTag">{Title}</p>
                    <div className="EventCardsLocationIconContainer">
                        <img
                            className="EventCardsLocationIcon"
                            src={LocationIcon}
                            alt="loactionPinIcon"
                        />
                        <p className="EventCardsLocationIconText">{State}</p>
                    </div>
                </div>
                <div className="EventCardsBookmarkContainer">
                    {eventIsFavorite === true ? (
                        <img
                            src={BookmarkFull}
                            alt="fullBookmark"
                            className="bookMark"
                            onClick={removeEventFromWishlist}
                        />
                    ) : (
                        <img
                            src={BookmarkEmpty}
                            alt="emptyBookmark"
                            className="bookMark"
                            onClick={addEventToWishlist}
                        />
                    )}
                </div>
            </article>
        </>
    );
};

export default EventCards;
