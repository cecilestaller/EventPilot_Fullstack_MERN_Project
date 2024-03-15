import "./RandomEvent.scss"
import LocationIcon from "../../assets/images/Map Pin_grey.svg"
import BookmarkEmpty from "../../assets/images/empty_Bookmark.svg"
import BookmarkFull from "../../assets/images/full_bookmark.svg"
import { useEffect, useState } from "react";

const RandomEvent = ({ Date, Title, State, checked }) => {

    const [checkBookmarkCheck, setCheckBookmarkCheck] = useState(BookmarkEmpty)

    useEffect(() => {
        if (checked === "true") {
            setCheckBookmarkCheck(BookmarkFull)
        } else {
            setCheckBookmarkCheck(BookmarkEmpty)
        }
    }, [])

    return (
        <article className="RandomEventContainer">
            <img className="RandomEventPic" src="https://picsum.photos/92" alt="" />
            <div className="RandomEventDetails">
                <p className="RandomEventDateTag">{Date}</p>
                <p className="RandomEventTitleTag">{Title}</p>
                <div className="RandomEventLocationIconContainer">
                    <img className="RandomEventLocationIcon" src={LocationIcon} alt="loactionPinIcon" />
                    <p className="RandomEventLocationIconText">{State}</p>
                </div>
            </div>
            <div className="RandomEventBookmarkContainer">
                <img src={checkBookmarkCheck} alt="BookmarkIcon" />
            </div>
        </article>
    );
};

export default RandomEvent;
