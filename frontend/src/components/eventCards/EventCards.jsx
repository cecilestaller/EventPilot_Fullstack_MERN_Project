import "./EventCards.scss"
import LocationIcon from "../../assets/images/Map Pin_grey.svg"
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg"
import BookmarkFull from "../../assets/images/full_bookmark.svg"
import { useEffect, useState } from "react";

const EventCards = ({ Date, Title, State, checked }) => {

    const [checkBookmarkCheck, setCheckBookmarkCheck] = useState(BookmarkEmpty)

    useEffect(() => {
        if (checked === "true") {
            setCheckBookmarkCheck(BookmarkFull)
        } else {
            setCheckBookmarkCheck(BookmarkEmpty)
        }
    }, [])

    return (
        <article className="EventCardsContainer">
            <img className="EventCardsPic" src="https://picsum.photos/92" alt="" />
            <div className="EventCardsDetails">
                <p className="EventCardsDateTag">{Date}</p>
                <p className="EventCardsTitleTag">{Title}</p>
                <div className="EventCardsLocationIconContainer">
                    <img className="EventCardsLocationIcon" src={LocationIcon} alt="loactionPinIcon" />
                    <p className="EventCardsLocationIconText">{State}</p>
                </div>
            </div>
            <div className="EventCardsBookmarkContainer">
                <img src={checkBookmarkCheck} alt="BookmarkIcon" />
            </div>
        </article>
    );
};

export default EventCards;
