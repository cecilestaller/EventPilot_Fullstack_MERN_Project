import Nav from "../../components/nav/Nav";
import editIcon from "../../assets/images/profileimage_edit.svg";
import "./EditUserProfile.scss";
import profilePicTest from "../../assets/images/profile-pic-test.jpg";
import { useEventFetchContext } from "../../context/eventFetchContext";
import { useLocationFetchContext } from "../../context/locationFetchContext";
import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../../api";
import locationPinGrey from "../../assets/images/Map Pin_grey.svg";
import locationPinPurple from "../../assets/images/Location_Pin_purple.svg";
import { useNavigate } from "react-router-dom";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import arrowBack from "../../assets/images/arrow_back.svg";
import profileIcon from "../../assets/images/Profile.svg";
import aboutIcon from "../../assets/images/textblock_icon.svg";
import deleteIcon from "../../assets/images/x-icon.svg";
import addIcon from "../../assets/images/plus.svg";

const EditUserProfile = ({ authorization, userProfileInfo }) => {
  const { fetchEventData, setFetchEventData } = useEventFetchContext();
  const { fetchLocationData, setFetchLocationData } = useLocationFetchContext();
  const zipAndCityRef = useRef(null);
  const [isUserAdressEmpty, setIsUserAddressEmpty] = useState(true);
  const navigate = useNavigate();
  const [userNameDefault, setUserNameDefault] = useState("");
  const [bioDefault, setBioDefault] = useState("");
  const [interestUpdatedArray, setInterestUpdatedArray] = useState([]);
  const [streetDefault, setStreetDefault] = useState("");
  const [zipDefault, setZipDefault] = useState("");
  const [cityDefault, setCityDefault] = useState("");
  const [provinceDefault, setProvinceDefault] = useState("");

  useEffect(() => {
    async function fetchUserProfileInfo() {
      try {
        const users = await fetch(`${backendUrl}/api/v1/user`, {
          headers: { authorization },
        });
        const { result, success, error, message } = await users.json();
        if (!success) throw new Error(error);
        setFetchEventData(result);
        setIsUserAddressEmpty(
          Object.keys(result?.userDetails?.userAddress ?? {}).length === 0
        );
        setBioDefault(result?.userDetails?.bio);
        setUserNameDefault(result?.userDetails?.userName);
        setInterestUpdatedArray(result?.userDetails?.interests ?? []);
        setStreetDefault(result?.userDetails?.userAddress?.street);
        setZipDefault(result?.userDetails?.userAddress?.zip);
        setCityDefault(result?.userDetails?.userAddress?.city);
        // setProvinceDefault(fetchLocationData);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfileInfo();
  }, []);

  console.log("fetchEventData: ", fetchEventData);
  console.log("fetchLocationData:", fetchLocationData);

  const saveChanges = async () => {
    try {
      if (
        userNameDefault !== userProfileInfo.userDetails.userName ||
        bioDefault !== userProfileInfo.userDetails.bio ||
        streetDefault !== userProfileInfo.userDetails.userAddress.street ||
        zipDefault !== userProfileInfo.userDetails.userAddress.zip ||
        cityDefault !== userProfileInfo.userDetails.userAddress.city ||
        // provinceDefault !== userProfileInfo.userDetails.userAddress.province ||
        interestUpdatedArray.length !==
          userProfileInfo.userDetails.interests.length
      ) {
        // save changes in database
        const response = await fetch(`${backendUrl}/api/v1/user/edit-profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorization,
          },
          body: JSON.stringify({
            userName: userNameDefault,
            bio: bioDefault,
            userAddress: {
              street: streetDefault,
              zip: zipDefault,
              city: cityDefault,
              //   province: provinceDefault,
            },
            interests: interestUpdatedArray,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        // if saving changes was successful --> navigate to /profile
        navigate("/profile", {
          state: { successMessage: "Profil erfolgreich gespeichert" },
        });
      } else {
        // if no changes made
        console.log("Keine Änderungen vorgenommen.");
      }
    } catch (error) {
      console.error("Could not save user profile changes: ", error);
    }
  };

  const goToProfilePage = () => {
    navigate("/profile");
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "userName":
        setUserNameDefault(value);
        break;
      case "about":
        setBioDefault(value);
        break;
      case "street":
        setStreetDefault(value);
        break;
      case "zip":
        setZipDefault(value);
        break;
      case "city":
        setCityDefault(value);
        break;
      //   case "province":
      //     setProvinceDefault(value);
      //     break;
    }
  };

  const deleteInterest = (index) => {
    const newInterestsArray = [...interestUpdatedArray];
    newInterestsArray.splice(index, 1);
    setInterestUpdatedArray(newInterestsArray);
  };

  return (
    <>
      <section className="user-profile-wrapper">
        <article className="top-container">
          <img
            className="arrow-back"
            src={arrowBack}
            alt="zurück"
            onClick={goToProfilePage}
          />
          <h2>Profil Bearbeiten</h2>
          <p>o</p>
        </article>

        {/* profile image */}
        <div className="profile-pic-container">
          <img className="clip" src={profilePicTest} alt="" />
        </div>

        {/* User name */}
        <article className="edit-name-about-wrapper">
          <form>
            <div className="edit-input-container">
              <span className="edit-input-icon">
                <img src={profileIcon} alt="" />
              </span>
              <input
                className="edit-input-text"
                type="text"
                name="userName"
                placeholder=""
                value={userNameDefault}
                onChange={handleFormInputChange}
              />
            </div>

            {/* About */}
            <div className="edit-textarea-container">
              <span className="edit-input-icon">
                <img src={aboutIcon} alt="" />
              </span>
              <textarea
                name="about"
                id="about"
                cols="30"
                rows="5"
                placeholder="Über mich"
                value={bioDefault}
                onChange={handleFormInputChange}
              ></textarea>
            </div>
          </form>
        </article>

        {/* Interests */}
        <article className="user-profile-item-container">
          <h3>Interessen</h3>
          <div className="interests-items-container">
            {fetchEventData?.userDetails?.interests.map((item, index) => (
              <div key={index} className="interests-item">
                <p>{item}</p>
                <img src={deleteIcon} onClick={() => deleteInterest(index)} />
              </div>
            ))}
            <div className="add-interest-item">
              <p>Neu</p>
              <img src={addIcon} alt="+" />
            </div>
          </div>
        </article>

        {/* Address */}
        <article className="user-profile-item-container">
          <h3>Anschrift</h3>
          <div className="address-wrapper">
            <div className="location-pin-container">
              <img
                src={isUserAdressEmpty ? locationPinGrey : locationPinPurple}
                alt=""
                className={isUserAdressEmpty ? "location-pin-adjust" : ""}
              />
            </div>

            <form className="address-container">
              {isUserAdressEmpty ? (
                <>
                  <input
                    className="edit-input-text"
                    type="text"
                    name="street"
                    placeholder="Straße + Hausnummer"
                    value={streetDefault}
                    onChange={handleFormInputChange}
                  />
                  <div className="zip-city-container">
                    <input
                      className="edit-input-text"
                      type="text"
                      name="zip"
                      placeholder="PLZ"
                      value={zipDefault}
                      onChange={handleFormInputChange}
                    />
                    <input
                      className="edit-input-text"
                      type="text"
                      name="city"
                      placeholder="Stadt"
                      value={cityDefault}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <select
                    name="provice"
                    id="province"
                    // value={provinceDefault}
                    // onChange={handleFormInputChange}
                  >
                    <option value="Nordrhein-Westfalen">
                      Nordrhein-Westfalen
                    </option>
                    <option value="Baden-Württemberg">Baden-Württemberg</option>
                    <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                    <option value="Hessen">Hessen</option>
                    <option value="Saarland">Saarland</option>
                    <option value="Bayern">Bayern</option>
                    <option value="Sachsen">Sachsen</option>
                    <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                    <option value="Thüringen">Thüringen</option>
                    <option value="Brandenburg">Brandenburg</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Mecklenburg-Vorpommern">
                      Mecklenburg-Vorpommern
                    </option>
                    <option value="Schleswig-Holstein">
                      Schleswig-Holstein
                    </option>
                    <option value="Niedersachsen">Niedersachsen</option>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Bremen">Bremen</option>
                  </select>
                  <p>{fetchLocationData}</p>
                </>
              ) : (
                <>
                  <input
                    className="edit-input-text"
                    type="text"
                    name="street"
                    placeholder="Straße + Hausnummer"
                    value={streetDefault}
                    onChange={handleFormInputChange}
                  />
                  <div className="zip-city-container">
                    <input
                      className="edit-input-text"
                      type="text"
                      name="zip"
                      placeholder="PLZ"
                      value={zipDefault}
                      onChange={handleFormInputChange}
                    />
                    <input
                      className="edit-input-text"
                      type="text"
                      name="city"
                      placeholder="Stadt"
                      value={cityDefault}
                      onChange={handleFormInputChange}
                    />
                  </div>
                  <select
                    name="provice"
                    id="province"
                    // value={provinceDefault}
                    // onChange={handleFormInputChange}
                  >
                    <option value="Nordrhein-Westfalen">
                      Nordrhein-Westfalen
                    </option>
                    <option value="Baden-Württemberg">Baden-Württemberg</option>
                    <option value="Rheinland-Pfalz">Rheinland-Pfalz</option>
                    <option value="Hessen">Hessen</option>
                    <option value="Saarland">Saarland</option>
                    <option value="Bayern">Bayern</option>
                    <option value="Sachsen">Sachsen</option>
                    <option value="Sachsen-Anhalt">Sachsen-Anhalt</option>
                    <option value="Thüringen">Thüringen</option>
                    <option value="Brandenburg">Brandenburg</option>
                    <option value="Berlin">Berlin</option>
                    <option value="Mecklenburg-Vorpommern">
                      Mecklenburg-Vorpommern
                    </option>
                    <option value="Schleswig-Holstein">
                      Schleswig-Holstein
                    </option>
                    <option value="Niedersachsen">Niedersachsen</option>
                    <option value="Hamburg">Hamburg</option>
                    <option value="Bremen">Bremen</option>
                  </select>
                </>
              )}
              {/* <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Magni reprehenderit repellendus nisi illo necessitatibus quos
                  adipisci maxime! Laborum et facere tempore voluptatum
                  voluptates temporibus obcaecati, porro doloribus reiciendis
                  aspernatur? Laudantium qui dignissimos nisi itaque ullam
                  harum, saepe necessitatibus placeat alias! Totam, a quas
                  dolore possimus porro voluptatibus dicta? Excepturi quos
                  reprehenderit repellat, qui, inventore voluptate nihil, nulla
                  eaque sunt ea ab expedita? Sit, nemo qui possimus inventore
                  odio voluptates accusamus tempora labore? Expedita totam
                  quibusdam quaerat fugit incidunt dolorem iure corrupti
                  consequatur eveniet? Quo cupiditate autem saepe enim
                  aspernatur ea adipisci esse possimus veritatis temporibus
                  accusamus, molestias ducimus delectus vero.
                </p> */}
            </form>
          </div>
        </article>

        <BtnSubmit text="übernehmen" onClick={saveChanges} />
      </section>

      <Nav highlight="profile" />
    </>
  );
};

export default EditUserProfile;
