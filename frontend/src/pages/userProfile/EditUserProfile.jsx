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
import { useUserProfileInfoContext } from "../../context/userProfileInfoContext";
import DropdownArrow from "../../assets/images/location_dropdown_arrow.svg";

const EditUserProfile = ({ authorization, userProfileInfo }) => {
  const [userData, setUserData] = useState();
  const { userProfileData, setUserProfileData } = useUserProfileInfoContext();
  const { fetchLocationData, setFetchLocationData } = useLocationFetchContext();
  // const { fetchEventData, setFetchEventData } = useEventFetchContext();
  const [isUserAdressEmpty, setIsUserAddressEmpty] = useState(true);
  const navigate = useNavigate();
  const [userNameDefault, setUserNameDefault] = useState("");
  const [bioDefault, setBioDefault] = useState("");
  const [interestUpdatedArray, setInterestUpdatedArray] = useState([]);
  const [zipDefault, setZipDefault] = useState("");
  const [cityDefault, setCityDefault] = useState("");
  const [provinceDefault, setProvinceDefault] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [getUserLocation, setGetUserLocation] = useState("");
  const [hideClassForDropdown, setHideClassForDropdown] = useState("hide");
  const [saveUserLocation, setSaveUserLocation] = useState("");

  const provinceArray = [
    "Baden-Württemberg",
    "Bayern",
    "Berlin",
    "Brandenburg",
    "Bremen",
    "Hamburg",
    "Hessen",
    "Mecklenburg-Vorpommern",
    "Niedersachsen",
    "Nordrhein-Westfalen",
    "Rheinland-Pfalz",
    "Saarland",
    "Sachsen",
    "Sachsen-Anhalt",
    "Schleswig-Holstein",
    "Thüringen",
  ];

  // console.log("fetchLocationData:", fetchLocationData);
  console.log({ selectedProvince });
  console.log({ provinceDefault });

  console.log("userProfileInfo.userDetails: ", userProfileInfo.userDetails);

  useEffect(() => {
    setIsUserAddressEmpty(
      Object.keys(userProfileData?.userDetails?.userAddress ?? {}).length === 0
    );
    setBioDefault(userProfileData?.userDetails?.bio);
    setUserNameDefault(userProfileData?.userDetails?.userName);
    setInterestUpdatedArray(userProfileData?.userDetails?.interests ?? []);
    setZipDefault(userProfileData?.userDetails?.userAddress?.zip);
    setCityDefault(userProfileData?.userDetails?.userAddress?.city);
    setProvinceDefault(userProfileData?.userDetails?.userAddress?.province);
  }, [userProfileData]);

  // ==================== dropdown menu function ==============================
  const locationDropdownMenu = () => {
    setHideClassForDropdown(hideClassForDropdown === "hide" ? "" : "hide");
  };

  const changeLocationInfo = (province) => {
    // setSaveUserLocation(province); //changes location value displayed
    setSelectedProvince(province);
    setHideClassForDropdown("hide");
  };

  useEffect(() => {
    setSaveUserLocation(getUserLocation);
    setFetchLocationData(getUserLocation);
  }, [getUserLocation]);

  const hideStateSelectionAgain = () => {
    setHideClassForDropdown("hide");
  };

  const saveChanges = async () => {
    try {
      // Check if zip and city were deleted in frontend
      const zipAndCityDeleted = zipDefault === "" && cityDefault === "";

      // Check if province was changed
      const provinceChanged =
        saveUserLocation !==
        userProfileData?.userDetails?.userAddress?.province;

      const profileDataChanged =
        userNameDefault !== userProfileData.userDetails.userName ||
        bioDefault !== userProfileData.userDetails.bio ||
        zipDefault !== userProfileData.userDetails.userAddress.zip ||
        cityDefault !== userProfileData.userDetails.userAddress.city ||
        interestUpdatedArray.length !==
          userProfileData.userDetails.interests.length ||
        saveUserLocation !==
          userProfileData?.userDetails?.userAddress?.province;

      if (profileDataChanged) {
        // if (
        //   userNameDefault !== userProfileData.userDetails.userName ||
        //   bioDefault !== userProfileData.userDetails.bio ||
        //   zipDefault !== userProfileData.userDetails.userAddress.zip ||
        //   cityDefault !== userProfileData.userDetails.userAddress.city ||
        //   provinceDefault !== userProfileData.userDetails.userAddress.province ||
        //   interestUpdatedArray.length !==
        //     userProfileData.userDetails.interests.length
        // )
        // if zip and city were deleted, remove them from userAddress
        const updatedUserAddress = {
          zip: zipDefault,
          city: cityDefault,
          // province: selectedProvince,
          province: saveUserLocation,
        };
        // const updatedUserAddress = zipAndCityDeleted
        // ? { province: selectedProvince }
        //   : { zip: zipDefault, city: cityDefault, province: selectedProvince };

        // save changes in database
        const response = await fetch(`${backendUrl}/api/v1/user/edit-profile`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: authorization,
          },
          body: JSON.stringify({
            userName: userNameDefault,
            bio: bioDefault,
            userAddress: updatedUserAddress,
            //   province: provinceDefault,

            interests: interestUpdatedArray,
          }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }

        // if saving changes was successful --> navigate to "/profile"
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
      case "zip":
        setZipDefault(value);
        break;
      case "city":
        setCityDefault(value);
        break;
      // case "province":
      //   setProvinceDefault(value);
      //   break;
    }
  };

  const deleteInterest = (index) => {
    const newInterestsArray = [...interestUpdatedArray];
    newInterestsArray.splice(index, 1);
    setInterestUpdatedArray(newInterestsArray);
  };

  return (
    <>
      <section className="user-edit-profile-wrapper">
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
            {userProfileData?.userDetails?.interests?.map((item, index) => (
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
          <div className="edit-address-wrapper">
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
                  {/* ============================= */}
                  {/* NEU für Bundesland */}
                  <div
                    className="locationContainer"
                    onClick={() => locationDropdownMenu()}
                  >
                    <div className="locationDropdownContainer">
                      {/* <p className="locationTitle">Standort</p> */}
                      <p className="showCurrentLocation">
                        {selectedProvince
                          ? selectedProvince
                          : "Wähle dein Bundesland"}
                        {/* {saveUserLocation
                          ? saveUserLocation
                          : "Wähle dein Bundesland"} */}
                      </p>
                      <img src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <div
                      onClick={() => hideStateSelectionAgain()}
                      className={`dropdownAddressMenuContainer ${hideClassForDropdown}`}
                    >
                      <div className={`dropdownAddressMenu`}>
                        <p
                          onClick={() => changeLocationInfo(getUserLocation)}
                          className={`HomeDropdownSelections DeinStandortTag`}
                        >
                          Wähle ein Bundesland: {getUserLocation}
                        </p>
                        {Array.from(
                          provinceArray.map((province) => (
                            <p
                              onClick={() => changeLocationInfo(province)}
                              className={`HomeDropdownSelections`}
                              key={province}
                            >
                              {province}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                    {/* <p className="showCurrentLocation">{saveUserLocation}</p> */}
                  </div>

                  {/* ============================= */}
                </>
              ) : (
                <>
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
                  {/* ============================= */}
                  {/* NEU für Bundesland */}
                  <div
                    className="locationContainer"
                    onClick={() => locationDropdownMenu()}
                  >
                    <div className="locationDropdownContainer">
                      {/* <p className="locationTitle">Standort</p> */}
                      <p className="showCurrentLocation">
                        {selectedProvince
                          ? selectedProvince
                          : "Wähle dein Bundesland"}
                        {/* {saveUserLocation
                          ? saveUserLocation
                          : "Wähle dein Bundesland"} */}
                      </p>
                      <img src={DropdownArrow} alt="arrowIcon" />
                    </div>
                    <div
                      onClick={() => hideStateSelectionAgain()}
                      className={`dropdownAddressMenuContainer ${hideClassForDropdown}`}
                    >
                      <div className={`dropdownAddressMenu`}>
                        <p
                          onClick={() => changeLocationInfo(getUserLocation)}
                          className={`HomeDropdownSelections DeinStandortTag`}
                        >
                          Wähle ein Bundesland: {getUserLocation}
                        </p>
                        {Array.from(
                          provinceArray.map((province) => (
                            <p
                              onClick={() => changeLocationInfo(province)}
                              className={`HomeDropdownSelections`}
                              key={province}
                            >
                              {province}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ============================= */}
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
