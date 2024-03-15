import "./AddEvent.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/index";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import backArrow from "../../assets/images/arrow_back.svg";
import dateIcon from "../../assets/images/Calender.svg";
import textIcon from "../../assets/images/textblock_icon.svg";
import personIcon from "../../assets/images/Profile.svg";
import mapIcon from "../../assets/images/Map Pin_grey.svg";
import compasIcon from "../../assets/images/compass_grey.svg";

const AddEvent = ({ authorization, userProfileInfo }) => {
  const [eventPicURL, setEventPicURL] = useState("");
  const [title, setTitle] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [locationInfo, setLocationInfo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [maxGuests, setMaxGuests] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    // event.preventDefault();
    const eventData = {
      title,
      eventDate,
      eventAddress: { country, city, zip, street, province, locationInfo },
      category,
      description,
      maxGuests,
    };
    console.log(eventData);
    fetch(backendUrl + `/api/v1/events/`, {
      method: "POST",
      body: JSON.stringify(eventData),
      headers: { "Content-Type": "application/json", authorization },
    })
      .then((res) => res.json())
      .then(({ success, result, error, message }) => {
        console.log({ success, result, error, message });
      })
      .catch((error) => console.log(error));

    // hier können wir dann zum angelegten event springen
    // navigate("/eventDetail");
  };

  return (
    <div className="addevent__wrapper">
      <div className="addevent_header">
        <img src={backArrow} alt="Zurück" onClick={() => navigate("/home")} />
        <p className="addevent_header-titel">
          Add <span className="addevent_header-title-span">Event</span>
        </p>
        <p></p>
      </div>
      <form className="addevent_form" onSubmit={handleSubmit}>
        <p className="addevent_heading">Neues Event</p>

        <div className="addevent_input-group">
          <span className="addevent_input-icon">
            <img src="" alt="" />
          </span>
          <label htmlFor="file">Event-Bild</label>
          <input
            name="file"
            className="addevent_input"
            type="file"
            value={eventPicURL}
            onChange={(e) => setEventPicURL(e.target.value)}
          />
        </div>

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
            <img src={mapIcon} alt="" />
          </span>
          <input
            className="addevent_input"
            type="text"
            placeholder="Land"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="addevent_input-group">
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

        <div className="addevent_input-group">
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

        <div className="addevent_input-group">
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

        <div className="addevent_input-group">
          <span className="addevent_input-icon">
            <img src={mapIcon} alt="" />
          </span>
          <input
            className="addevent_input"
            type="text"
            placeholder="Ort"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />
        </div>

        <div className="addevent_input-group">
          <span className="addevent_input-icon">
            <img src={mapIcon} alt="" />
          </span>
          <input
            className="addevent_input"
            type="text"
            placeholder="Location Info"
            value={locationInfo}
            onChange={(e) => setLocationInfo(e.target.value)}
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
            <option value="">Kategorie</option>
            <option value="music">Music</option>
            <option value="art">Art</option>
            <option value="sport">Sport</option>
            <option value="food">Food</option>
            <option value="movie">Movie</option>
            <option value="comedy">Comedy</option>
            <option value="literature">Literature</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="addevent_input-group">
          <span className="addevent_input-icon">
            <img src={textIcon} alt="" />
          </span>
          <textarea
            className="addevent_input"
            placeholder="Beschreibung"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
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
      </form>
      <BtnSubmit text="Add Event" onClick={handleSubmit} />
    </div>
  );
};

export default AddEvent;