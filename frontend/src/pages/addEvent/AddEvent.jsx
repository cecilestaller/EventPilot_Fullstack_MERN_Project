import "./AddEvent.scss";
import Nav from "../../components/nav/Nav";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/index";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import backArrow from "../../assets/images/arrow_back.svg";
import dateIcon from "../../assets/images/Calender.svg";
import textIcon from "../../assets/images/textblock_icon.svg";
import personIcon from "../../assets/images/Profile.svg";
import mapIcon from "../../assets/images/Map Pin_grey.svg";
import compasIcon from "../../assets/images/compass_grey.svg";
import fileIcon from "../../assets/images/add_plus_white.svg";

const AddEvent = ({ authorization }) => {
    const [eventPicURL, setEventPicURL] = useState(null);
    const [title, setTitle] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [country, setCountry] = useState("Deutschland");
    const [city, setCity] = useState("");
    const [zip, setZip] = useState("");
    const [street, setStreet] = useState("");
    const [province, setProvince] = useState("");
    const [locationInfo, setLocationInfo] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [maxGuests, setMaxGuests] = useState("");
    const [hideEntranceAnimation, setHideEntranceAnimation] = useState("");
    // const [dropdownHideState, setDropdownHideState] = useState("hide");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        event.preventDefault();

        if (eventPicURL) {
            // add Event WITH new Pic
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
                const response = await fetch(`${backendUrl}/api/v1/events`, {
                    method: "POST",
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
                });
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "Das Event konnte nicht bearbeitet werden"
                    );
                navigate(`/eventdetails/${result._id}`);
            } catch (error) {
                console.log(error);
            }
        } else {
            // NO Pic selected
            try {
                const response = await fetch(`${backendUrl}/api/v1/events`, {
                    method: "POST",
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
                });
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "Das Event konnte nicht bearbeitet werden"
                    );
                // console.log(result);
                navigate(`/eventdetails/${result._id}`);
            } catch (error) {
                console.log(error);
            }
        }
    };

    // =============== Entrance anmiation ====================
    useEffect(() => {
        setTimeout(() => {
            setHideEntranceAnimation("hide");
        }, 600);
    }, []);

    // ================= toggle hide state ===========================

    const toggleHideState = () => {
        if (dropdownHideState === "hide") {
            setDropdownHideState("");
        } else {
            setDropdownHideState("hide");
        }
    };

    return (
        <div className="addevent__wrapper">
            <div className="addevent_header">
                <img
                    src={backArrow}
                    alt="Zurück"
                    onClick={() => navigate(-1)}
                />
                <p className="addevent_header-titel">
                    Add{" "}
                    <span className="addevent_header-title-span">Event</span>
                </p>
                <p></p>
            </div>
            <form className="addevent_form" onSubmit={handleSubmit}>
                <p className="addevent_heading">Neues Event</p>

                <div className="addevent_input-group">
                    <span className="addevent_input-icon">
                        <img src={textIcon} alt="" />
                    </span>
                    <input
                        className="addevent_input"
                        type="text"
                        placeholder="Titel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                        onChange={(e) => setEventDate(e.target.value)}
                    />
                </div>

                <div className="addevent_input-group">
                    <span className="addevent_input-icon">
                        <img src={compasIcon} alt="" />
                    </span>
                    <select
                        className="addevent_input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option className="option" value="" disabled>
                            Kategorie
                        </option>
                        <option value="music">Musik</option>
                        <option value="art">Kunst</option>
                        <option value="sport">Sport</option>
                        <option value="food">Essen</option>
                        <option value="movie">Filme</option>
                        <option value="comedy">Komödie</option>
                        <option value="literature">Literatur</option>
                        <option value="others">Sonstige</option>
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
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="addevent_input-group">
                    <span className="addevent_input-icon">
                        <img src={mapIcon} alt="" />
                    </span>
                    <input
                        className="addevent_input"
                        type="text"
                        placeholder="Name Veranstaltungsort"
                        value={locationInfo}
                        onChange={(e) => setLocationInfo(e.target.value)}
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
                            placeholder="Straße und Nr."
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                        />
                    </div>

                    <div className="addevent_input-group-adress-field">
                        <span className="addevent_input-icon">
                            <img src={mapIcon} alt="" />
                        </span>
                        <input
                            className="addevent_input"
                            type="text"
                            placeholder="PLZ"
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
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
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>

                    <div className="addevent_input-group-adress-field">
                        <span className="addevent_input-icon">
                            <img src={compasIcon} alt="" />
                        </span>
                        <select
                            className="addevent_input"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            <option value="">Bundesland</option>
                            <option value="Baden-Württemberg">
                                Baden-Württemberg
                            </option>
                            <option value="Bayern">Bayern</option>
                            <option value="Berlin">Berlin</option>
                            <option value="Brandenburg">Brandenburg</option>
                            <option value="Bremen">Bremen</option>
                            <option value="Hamburg">Hamburg</option>
                            <option value="Hessen">Hessen</option>
                            <option value="Mecklenburg-Vorpommern">
                                Mecklenburg-Vorpommern
                            </option>
                            <option value="Niedersachsen">Niedersachsen</option>
                            <option value="Nordrhein-Westfalen">
                                Nordrhein-Westfalen
                            </option>
                            <option value="Rheinland-Pfalz">
                                Rheinland-Pfalz
                            </option>
                            <option value="Saarland">Saarland</option>
                            <option value="Sachsen">Sachsen</option>
                            <option value="Sachsen-Anhalt">
                                Sachsen-Anhalt
                            </option>
                            <option value="Schleswig-Holstein">
                                Schleswig-Holstein
                            </option>
                            <option value="Thüringen">Thüringen</option>
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
                        onChange={(e) => setMaxGuests(e.target.value)}
                    />
                </div>

                <label className="addevent_input-group">
                    <img src={fileIcon} alt="" />
                    <span className="addevent_input-file-text">
                        Klicke hier um ein Bild hochzuladen
                    </span>
                    <input
                        name="file"
                        id="real-file"
                        hidden
                        className="addevent_input-file"
                        type="file"
                        onChange={(e) => setEventPicURL(e.target.files[0])}
                    />
                </label>
            </form>
            <BtnSubmit text="Event anlegen" onClick={handleSubmit} />
            <Nav highlight="addEvent" />
            {/* Entrance animation divs */}
            <div
                className={`AddEventEntranceTransition ${hideEntranceAnimation}`}
            >
                <div className="AddEventEntranceTransitionEffectPurple"></div>
                <div className="AddEventEntranceTransitionEffectWhite"></div>
            </div>
        </div>
    );
};

export default AddEvent;
