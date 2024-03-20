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
    const [dropdownHideState, setDropdownHideState] = useState("hide")

    const navigate = useNavigate();

    const handleSubmit = () => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("image", eventPicURL, eventPicURL.name);

        fetch(backendUrl + "/api/v1/files/upload", {
            method: "POST",
            body: formData,
            headers: { authorization },
        })
            .then((res) => res.json())
            .then(({ success, result, error, message }) => {
                if (success) return result.filename;
                else {
                    console.log({ message });
                    throw error;
                }
            })
            .then((uploadFilename) =>
                fetch(backendUrl + `/api/v1/events/`, {
                    method: "POST",
                    body: JSON.stringify({
                        eventPicURL: uploadFilename,
                        title,
                        eventDate,
                        eventAddress: {
                            country,
                            city,
                            zip,
                            street,
                            province,
                            locationInfo,
                        },
                        category,
                        description,
                        maxGuests,
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        authorization,
                    },
                })
            )
            .then((res) => res.json())
            .then(({ success, result, error, message }) => {
                console.log({ success, result, error, message });
                navigate(`/eventdetails/${result._id}`);
            })
            .catch((error) => console.log(error));

        // hier können wir dann zum angelegten event springen
        // navigate(`/eventdetails/::id`)
    };

    // =============== Entrance anmiation ====================
    useEffect(() => {
        setTimeout(() => {
            setHideEntranceAnimation("hide");
        }, 600);
    }, []);


    console.log(dropdownHideState);
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

                <div onClick={() => setDropdownHideState("")} className="addevent_input-group">
                    <span className="addevent_input-icon">
                        <img src={compasIcon} alt="" />
                    </span>
                    <div className="addevent_input">
                        <div className={`AddEventDropdownCategory ${dropdownHideState}`}>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="music">Musik</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="art">Kunst</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="sport">Sport</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="food">Essen</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="movie">Film</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="comedy">Komödie</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="literature">Literatur</p>
                            <p className={`AddEventPTagDropdown`} onClick={(e) => {setCategory(e.target.value); setDropdownHideState("hide");}} value="others">Sonstige</p>
                        </div>
                    </div>
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
                        placeholder="Veranstaltungsort"
                        value={locationInfo}
                        onChange={(e) => setLocationInfo(e.target.value)}
                    />
                </div>

                <div className="addevent_input-group-adress">
                    {/* <div className="addevent_input-group-adress-field">
            <span className="addevent_input-icon">
              <img src={mapIcon} alt="" />
            </span>
            <input
              className="addevent_input"
              type="text"
              placeholder="Land"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div> */}

                    <div className="addevent_input-group-adress-field">
                        <span className="addevent_input-icon">
                            <img src={mapIcon} alt="" />
                        </span>
                        <input
                            className="addevent_input"
                            type="text"
                            placeholder="Straße"
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
                            placeholder="Stadt"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
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
                            <img src={compasIcon} alt="" />
                        </span>
                        <select
                            className="addevent_input"
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                        >
                            <option value="">Bundesland</option>
                            <option value="baden-württemberg">
                                Baden-Württemberg
                            </option>
                            <option value="bayern">Bayern</option>
                            <option value="berlin">Berlin</option>
                            <option value="brandenburg">Brandenburg</option>
                            <option value="bremen">Bremen</option>
                            <option value="hamburg">Hamburg</option>
                            <option value="hessen">Hessen</option>
                            <option value="mecklenburg-vorpommern">
                                Mecklenburg-Vorpommern
                            </option>
                            <option value="niedersachsen">Niedersachsen</option>
                            <option value="nordrhein-westfalen">
                                Nordrhein-Westfalen
                            </option>
                            <option value="rheinland-pfalz">
                                Rheinland-Pfalz
                            </option>
                            <option value="saarland">Saarland</option>
                            <option value="sachsen">Sachsen</option>
                            <option value="sachsen-anhalt">
                                Sachsen-Anhalt
                            </option>
                            <option value="schleswig-holstein">
                                Schleswig-Holstein
                            </option>
                            <option value="thüringen">Thüringen</option>
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
