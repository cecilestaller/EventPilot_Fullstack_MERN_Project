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
import { Link } from "react-router-dom";
import { backendUrl } from "../../api";

const EventCards = ({
    Date,
    Title,
    State,
    checked,
    eventId,
    category,
    eventPicURL,
    userProfileInfo,
    authorization,
}) => {
    // const [checkBookmarkCheck, setCheckBookmarkCheck] = useState(BookmarkEmpty);
    const [eventIsFavorite, setEventIsFavorite] = useState(false);
    const [defaultPic, setDefaultPic] = useState();

    useEffect(() => {
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
        } else if (category === "literature" || "others") {
            setDefaultPic(komet);
        }
        if (
            userProfileInfo?.userWishlist?.includes(eventId) ||
            userProfileInfo?.userDetails?.userWishlist?.includes(eventId)
        ) {
            setEventIsFavorite(true);
        }
        // if (checked === "true") {
        //     setCheckBookmarkCheck(BookmarkFull);
        // } else {
        //     setCheckBookmarkCheck(BookmarkEmpty);
        // }
    }, []);

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

    return (
        <>
            <Link
                to={`/eventdetails/${eventId}`}
                className="EventCard-Link-wrap"
            >
                <article className="EventCardsContainer">
                    <img
                        src={
                            eventPicURL
                                ? `${backendUrl}/download/${eventPicURL}`
                                : defaultPic
                        }
                        alt="eventPic"
                        className="eventPic"
                    />
                    <div className="EventCardsDetails">
                        <p className="EventCardsDateTag">{Date}</p>
                        <p className="EventCardsTitleTag">{Title}</p>
                        <div className="EventCardsLocationIconContainer">
                            <img
                                className="EventCardsLocationIcon"
                                src={LocationIcon}
                                alt="loactionPinIcon"
                            />
                            <p className="EventCardsLocationIconText">
                                {State}
                            </p>
                        </div>
                    </div>
                    <div className="EventCardsBookmarkContainer">
                        {eventIsFavorite ? (
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
            </Link>
        </>
    );
};

export default EventCards;
