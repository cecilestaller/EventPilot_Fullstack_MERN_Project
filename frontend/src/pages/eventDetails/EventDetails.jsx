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
import backArrow from "../../assets/images/arrow_back.svg";
import emptyBookmark from "../../assets/images/empty_Bookmark.svg";
import fullBookmark from "../../assets/images/full_bookmark.svg";
import editIcon from "../../assets/images/profileimage_edit.svg";
import DateIcon from "../../assets/images/Date.svg";
import locationPinPurple from "../../assets/images/Location_Pin_purple.svg";
import textIcon from "../../assets/images/textblock_icon.svg";
import dateIcon from "../../assets/images/Calender.svg";
import personIcon from "../../assets/images/Profile.svg";
import mapIcon from "../../assets/images/Map Pin_grey.svg";
import compasIcon from "../../assets/images/compass_grey.svg";
import fileIcon from "../../assets/images/add_plus_white.svg";
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
    const [eventIsFavorite, setEventIsFavorite] = useState(false);
    const [userRegistered, setUserRegistered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [defaultPic, setDefaultPic] = useState();
    const [edit, setEdit] = useState(false);
    const [fullyBooked, setFullyBooked] = useState(false);
    const [isCancelled, setIsCancelled] = useState(false);
    // states for edit Event
    const [eventPicURL, setEventPicURL] = useState(null);
    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [country, setCountry] = useState("Deutschland");
    const [city, setCity] = useState("");
    // const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    const [province, setProvince] = useState("");
    const [locationInfo, setLocationInfo] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [maxGuests, setMaxGuests] = useState("");

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
                if (userProfileInfo?.userDetails?._id === result.host._id) {
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

    // -------- CANCEL Event FETCH --------------------------
    async function cancelEvent() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/events/toggleCancelled/${eventId}`,
                {
                    method: "PATCH",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            setIsCancelled(true);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    // ----------- EDIT functions ---------------
    function changeToEditMode() {
        setEdit(true);
        setTitle(eventDetails?.eventDetails?.title);
        setEventDate(eventDetails?.eventDetails?.eventDate);
        setCategory(eventDetails?.eventDetails?.category);
        setDescription(eventDetails?.eventDetails?.description);
        setLocationInfo(eventDetails?.eventDetails?.eventAddress?.locationInfo);
        setStreet(eventDetails?.eventDetails?.eventAddress?.street);
        setCity(eventDetails?.eventDetails?.eventAddress?.city);
        setProvince(eventDetails?.eventDetails?.eventAddress?.province);
        setMaxGuests(eventDetails?.eventDetails?.maxGuests);
    }

    async function editEvent(e) {
        e.preventDefault();
        if (eventPicURL) {
            // event update WITH new Pic
            const formData = new FormData();
            formData.append("image", eventPicURL, eventPicURL.filename);
            try {
                // upload new Pic and save filename in variable
                const fileResponse = await fetch(
                    `${backendUrl}/api/v1/files/upload`,
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const fileResult = await fileResponse.json();
                const uploadedFilename = fileResult.result.filename;
                // edit Event with new profilePic
                const response = await fetch(
                    `${backendUrl}/api/v1/events/edit/${eventId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            authorization,
                        },
                        body: JSON.stringify({
                            eventPicURL: uploadedFilename,
                            title,
                            eventDate,
                            eventAddress: {
                                country,
                                city,
                                street,
                                province,
                                locationInfo,
                            },
                            category,
                            description,
                            maxGuests,
                        }),
                    }
                );
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "Das Event konnte nicht bearbeitet werden"
                    );
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            // NO Pic selected
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/events/edit/${eventId}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            authorization,
                        },
                        body: JSON.stringify({
                            title,
                            eventDate,
                            eventAddress: {
                                country,
                                city,
                                street,
                                province,
                                locationInfo,
                            },
                            category,
                            description,
                            maxGuests,
                        }),
                    }
                );
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "Das Event konnte nicht bearbeitet werden"
                    );
                console.log(result);
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        }
    }

    function goBackToDetails() {
        setEdit(false);
    }

    return (
        <>
            <section className="eventDetail-wrapper">
                {userIsHost ? (
                    <>
                        {edit ? (
                            <>
                                {/* Page-Content if Host chlicked "edit event" (Form) */}
                                <div className="addevent__wrapper">
                                    <div className="addevent_header">
                                        <img
                                            src={backArrow}
                                            alt="back arrow"
                                            onClick={goBackToDetails}
                                            className="backArrow"
                                        />
                                        <p className="addevent_header-titel">
                                            Event{" "}
                                            <span className="addevent_header-title-span">
                                                Bearbeiten
                                            </span>
                                        </p>
                                        <p></p>
                                    </div>
                                    <form className="addevent_form">
                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon">
                                                <img src={textIcon} alt="" />
                                            </span>
                                            <input
                                                className="addevent_input"
                                                type="text"
                                                placeholder="Titel"
                                                value={title}
                                                onChange={(e) =>
                                                    setTitle(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon">
                                                <img src={dateIcon} alt="" />
                                            </span>
                                            <input
                                                className="addevent_input"
                                                type="datetime-local"
                                                value={eventDate}
                                                onChange={(e) =>
                                                    setEventDate(e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon">
                                                <img src={compasIcon} alt="" />
                                            </span>
                                            <select
                                                className="addevent_input"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                            >
                                                <option
                                                    className="option"
                                                    value=""
                                                >
                                                    Kategorie
                                                </option>
                                                <option value="music">
                                                    Music
                                                </option>
                                                <option value="art">Art</option>
                                                <option value="sport">
                                                    Sport
                                                </option>
                                                <option value="food">
                                                    Food
                                                </option>
                                                <option value="movie">
                                                    Movie
                                                </option>
                                                <option value="comedy">
                                                    Comedy
                                                </option>
                                                <option value="literature">
                                                    Literature
                                                </option>
                                                <option value="others">
                                                    Others
                                                </option>
                                            </select>
                                        </div>

                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon addevent_input-icon-top">
                                                <img src={textIcon} alt="" />
                                            </span>
                                            <textarea
                                                className="addevent_input addevent_input-textarea"
                                                rows={8}
                                                placeholder="Beschreibung"
                                                value={description}
                                                onChange={(e) =>
                                                    setDescription(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon">
                                                <img src={mapIcon} alt="" />
                                            </span>
                                            <input
                                                className="addevent_input"
                                                type="text"
                                                placeholder="Infos zur Location"
                                                value={locationInfo}
                                                onChange={(e) =>
                                                    setLocationInfo(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>

                                        <div className="addevent_input-group-adress">
                                            <div className="addevent_input-group-adress-field">
                                                <span className="addevent_input-icon">
                                                    <img src={mapIcon} alt="" />
                                                </span>
                                                <input
                                                    className="addevent_input"
                                                    type="text"
                                                    placeholder="Straße"
                                                    value={street}
                                                    onChange={(e) =>
                                                        setStreet(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>

                                            <div className="addevent_input-group-adress-field">
                                                <span className="addevent_input-icon">
                                                    <img src={mapIcon} alt="" />
                                                </span>
                                                <input
                                                    className="addevent_input"
                                                    type="text"
                                                    placeholder="Stadt"
                                                    value={city}
                                                    onChange={(e) =>
                                                        setCity(e.target.value)
                                                    }
                                                />
                                            </div>

                                            <div className="addevent_input-group-adress-field">
                                                <span className="addevent_input-icon">
                                                    <img
                                                        src={compasIcon}
                                                        alt=""
                                                    />
                                                </span>
                                                <select
                                                    className="addevent_input"
                                                    value={province}
                                                    onChange={(e) =>
                                                        setProvince(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    <option value="">
                                                        Bundesland
                                                    </option>
                                                    <option value="baden-württemberg">
                                                        Baden-Württemberg
                                                    </option>
                                                    <option value="bayern">
                                                        Bayern
                                                    </option>
                                                    <option value="berlin">
                                                        Berlin
                                                    </option>
                                                    <option value="brandenburg">
                                                        Brandenburg
                                                    </option>
                                                    <option value="bremen">
                                                        Bremen
                                                    </option>
                                                    <option value="hamburg">
                                                        Hamburg
                                                    </option>
                                                    <option value="hessen">
                                                        Hessen
                                                    </option>
                                                    <option value="mecklenburg-vorpommern">
                                                        Mecklenburg-Vorpommern
                                                    </option>
                                                    <option value="niedersachsen">
                                                        Niedersachsen
                                                    </option>
                                                    <option value="nordrhein-westfalen">
                                                        Nordrhein-Westfalen
                                                    </option>
                                                    <option value="rheinland-pfalz">
                                                        Rheinland-Pfalz
                                                    </option>
                                                    <option value="saarland">
                                                        Saarland
                                                    </option>
                                                    <option value="sachsen">
                                                        Sachsen
                                                    </option>
                                                    <option value="sachsen-anhalt">
                                                        Sachsen-Anhalt
                                                    </option>
                                                    <option value="schleswig-holstein">
                                                        Schleswig-Holstein
                                                    </option>
                                                    <option value="thüringen">
                                                        Thüringen
                                                    </option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="addevent_input-group">
                                            <span className="addevent_input-icon">
                                                <img src={personIcon} alt="" />
                                            </span>
                                            <input
                                                className="addevent_input"
                                                type="number"
                                                placeholder="Maximale Gäste"
                                                value={maxGuests}
                                                onChange={(e) =>
                                                    setMaxGuests(e.target.value)
                                                }
                                            />
                                        </div>

                                        <label className="addevent_input-group">
                                            <img src={fileIcon} alt="" />
                                            <span className="addevent_input-file-text">
                                                Klicke hier um ein Bild
                                                hochzuladen
                                            </span>
                                            <input
                                                name="file"
                                                id="real-file"
                                                hidden
                                                className="addevent_input-file"
                                                type="file"
                                                onChange={(e) =>
                                                    setEventPicURL(
                                                        e.target.files[0]
                                                    )
                                                }
                                            />
                                        </label>
                                    </form>
                                    <p
                                        style={{
                                            color: "red",
                                            padding: "4px 12px 8px 12px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {errorMessage}
                                    </p>
                                    <BtnSubmit
                                        text="SPEICHERN"
                                        onClick={editEvent}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Page-Content of Host */}
                                <section className="eventDetail-Host-wrapper">
                                    <article className="eventDetail-hero-wrap">
                                        <div className="eventDetail-header-wrap">
                                            <img
                                                src={arrowBack}
                                                alt="back arrow"
                                                onClick={() => navigate(-1)}
                                                className="backArrow"
                                            />
                                            <p className="eventDetails-hl">
                                                Event Details
                                            </p>
                                        </div>
                                        <img
                                            src={
                                                eventDetails?.eventDetails
                                                    ?.eventPicURL
                                                    ? `${backendUrl}/download/${eventDetails.eventDetails.eventPicURL}`
                                                    : defaultPic
                                            }
                                            alt="eventPic"
                                            className="eventPic"
                                        />
                                    </article>
                                    <article className="eventDetails-info-wrap">
                                        <h2 className="eventDetails-eventTitle">
                                            {eventDetails?.eventDetails?.title}
                                        </h2>
                                        {isCancelled ? (
                                            <p
                                                style={{
                                                    color: "red",
                                                    padding:
                                                        "4px 12px 8px 12px",
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
                                                    padding:
                                                        "4px 12px 8px 12px",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                EVENT AUSGEBUCHT
                                            </p>
                                        ) : null}
                                        <div className="eventDetails-Info-Flex-wrap">
                                            <img
                                                src={DateIcon}
                                                alt="calendar"
                                            />

                                            <div className="eventDetails-innerBox-wrap">
                                                <h3 className="eventDetails-h3">
                                                    {formattedDate}
                                                </h3>
                                                <p className="eventDetails-p">
                                                    {formattedTime}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="eventDetails-Info-Flex-wrap">
                                            <img
                                                src={locationPinPurple}
                                                alt="calendar"
                                            />
                                            <div className="eventDetails-innerBox-wrap">
                                                <h3 className="eventDetails-h3">
                                                    {
                                                        eventDetails
                                                            ?.eventDetails
                                                            ?.eventAddress
                                                            ?.street
                                                    }
                                                </h3>
                                                <p className="eventDetails-p">
                                                    {
                                                        eventDetails
                                                            ?.eventDetails
                                                            ?.eventAddress?.city
                                                    }
                                                    ,{" "}
                                                    {
                                                        eventDetails
                                                            ?.eventDetails
                                                            ?.eventAddress
                                                            ?.province
                                                    }
                                                    ,{" "}
                                                    {
                                                        eventDetails
                                                            ?.eventDetails
                                                            ?.eventAddress
                                                            ?.country
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                        <div className="eventDetails-eventInfosForHost">
                                            <h5 className="eventDetails-h3">
                                                Zusätzliche Info's für dich als
                                                Organisator:in:
                                            </h5>
                                            <div className="flex-div">
                                                <p>maximale Gäste-Anzahl:</p>
                                                <h5 className="eventDetails-h3">
                                                    {
                                                        eventDetails
                                                            ?.eventDetails
                                                            ?.maxGuests
                                                    }
                                                </h5>
                                            </div>
                                            <div className="flex-div">
                                                <p>Registrierte Gäste:</p>
                                                <h5 className="eventDetails-h3">
                                                    {
                                                        eventDetails?.amountRegisteredGuests
                                                    }
                                                </h5>
                                            </div>
                                            <div className="flex-div">
                                                <p>Event auf Wunschlisten:</p>
                                                <h5 className="eventDetails-h3">
                                                    {
                                                        eventDetails?.eventOnWishlists
                                                    }
                                                </h5>
                                            </div>
                                        </div>
                                        <Link
                                            to={`/host/${eventDetails?.host?._id}`}
                                            className="hostDetails-link"
                                        >
                                            <div className="eventDetail-hostInfoBox">
                                                <img
                                                    src={
                                                        eventDetails?.host
                                                            ?.profilePicURL
                                                            ? `${backendUrl}/download/${eventDetails.host.profilePicURL}`
                                                            : picDummy
                                                    }
                                                    alt="hostProfilePic"
                                                    className="eventDetails-hostPic"
                                                />
                                                <div className="eventDetail-hostInfo-wrap">
                                                    <h4 className="eventDetails-h4">
                                                        {
                                                            eventDetails?.host
                                                                ?.userName
                                                        }{" "}
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
                                        <p>
                                            {
                                                eventDetails?.eventDetails
                                                    ?.description
                                            }
                                        </p>
                                    </article>
                                    {!edit ? (
                                        <BtnOutlined
                                            text="EVENT BEARBEITEN"
                                            icon={editIcon}
                                            onClick={changeToEditMode}
                                        />
                                    ) : null}
                                    {!isCancelled ? (
                                        <BtnSubmit
                                            text="EVENT ABSAGEN"
                                            onClick={cancelEvent}
                                        />
                                    ) : null}
                                </section>
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
                            <div className="eventDetails-Info-Flex-wrap">
                                <img src={DateIcon} alt="calendar" />

                                <div className="eventDetails-innerBox-wrap">
                                    <h3 className="eventDetails-h3">
                                        {formattedDate}
                                    </h3>
                                    <p className="eventDetails-p">
                                        {formattedTime}
                                    </p>
                                </div>
                            </div>
                            <div className="eventDetails-Info-Flex-wrap">
                                <img src={locationPinPurple} alt="calendar" />
                                <div className="eventDetails-innerBox-wrap">
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
