import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import Nav from "../../components/nav/Nav";
import editIcon from "../../assets/images/profileimage_edit.svg";
import "./UserProfile.scss";
import picDummy from "../../assets/images/eventDefaultPics/picDummy.png";
import arrowBack from "../../assets/images/arrow_back.svg";
import profileIcon from "../../assets/images/Profile.svg";
import aboutIcon from "../../assets/images/textblock_icon.svg";
import { useUserProfileInfoContext } from "../../context/userProfileInfoContext";
import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../../api";
import locationPinGrey from "../../assets/images/Map Pin_grey.svg";
import locationPinPurple from "../../assets/images/Location_Pin_purple.svg";
import { useNavigate } from "react-router-dom";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";

const UserProfile = ({ authorization, userProfileInfo, onLogout }) => {
    const { userProfileData, setUserProfileData } = useUserProfileInfoContext();
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    // states for edit Profile:
    const [userName, setUserName] = useState("");
    const [bio, setBio] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [profilePicURL, setProfilePicURL] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const users = await fetch(`${backendUrl}/api/v1/user`, {
                    headers: { authorization },
                });
                const { result, success, error, message } = await users.json();
                if (!success) throw new Error(error);
                setUserProfileData(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);

    // ------- EDIT FUNCTIONS --------
    function changeToEditMode() {
        setEdit(true);
        setBio(userProfileData?.userDetails?.bio);
        setUserName(userProfileData?.userDetails?.userName);
        setCity(userProfileData?.userDetails?.userAddress?.city);
        setProvince(userProfileData?.userDetails?.userAddress?.province);
    }

    async function saveChanges(e) {
        e.preventDefault();
        if (profilePicURL) {
            // profile update WITH new Pic
            const formData = new FormData();
            formData.append("image", profilePicURL, profilePicURL.filename);
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
                // edit Profile with new profilePic
                const response = await fetch(
                    `${backendUrl}/api/v1/user/edit-profile`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            authorization,
                        },
                        body: JSON.stringify({
                            profilePicURL: uploadedFilename,
                            userName,
                            bio,
                            userAddress: {
                                city,
                                province,
                            },
                        }),
                    }
                );
                const { success, result, error, message } =
                    await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "Dein Profil konnte nicht bearbeitet werden"
                    );
                const profileResponse = await fetch(
                    backendUrl + "/api/v1/user",
                    {
                        headers: { authorization },
                    }
                );
                const data = await profileResponse.json();
                await setUserProfileData(data.result);
                setEdit(false);
            } catch (error) {
                console.log(error);
            }
        } else {
            // NO Pic selected
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/user/edit-profile`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            authorization,
                        },
                        body: JSON.stringify({
                            userName,
                            bio,
                            userAddress: {
                                city,
                                province,
                            },
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
                const profileResponse = await fetch(
                    backendUrl + "/api/v1/user",
                    {
                        headers: { authorization },
                    }
                );
                const data = await profileResponse.json();
                await setUserProfileData(data.result);
                setEdit(false);
            } catch (error) {
                console.log(error);
            }
        }
    }

    // ------ LOGOUT FETCH --------
    async function doLogout() {
        try {
            const response = await fetch(backendUrl + "/api/v1/user/logout", {
                method: "POST",
                credentials: "include",
                headers: { authorization },
            });
            const { success } = await response.json();
            if (!success) alert("Could not logout");
            onLogout(); // reset local authorization state (with token inside)
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {edit ? (
                <section className="user-edit-profile-wrapper">
                    <article className="top-container">
                        <img
                            className="arrow-back"
                            src={arrowBack}
                            alt="zurück"
                            onClick={() => setEdit(false)}
                        />
                        <h2>Profil Bearbeiten</h2>
                        <p>o</p>
                    </article>

                    {/* profile image */}
                    <div className="profile-pic-container">
                        <img
                            className="clip"
                            src={
                                userProfileData?.userDetails?.profilePicURL
                                    ? `${backendUrl}/download/${userProfileData.userDetails.profilePicURL}`
                                    : picDummy
                            }
                            alt="profilePic"
                        />
                    </div>
                    <form className="editProfile-form">
                        {/* User name */}
                        <article className="edit-name-about-wrapper">
                            <div className="edit-input-container">
                                <span className="edit-input-icon">
                                    <img src={profileIcon} alt="" />
                                </span>
                                <input
                                    className="edit-input-text"
                                    type="text"
                                    name="userName"
                                    placeholder=""
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
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
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                            </div>
                        </article>

                        {/* Address */}
                        <article className="user-profile-formItem-container">
                            <h3>Anschrift</h3>
                            <div className="edit-address-wrapper">
                                <div className="editProfile_input-group-adress-field">
                                    <span className="addevent_input-icon">
                                        <img src={locationPinGrey} alt="" />
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
                                {/* für Bundesland */}
                                <div className="editProfile_input-group-adress-field">
                                    <span className="addevent_input-icon">
                                        <img src={locationPinGrey} alt="" />
                                    </span>
                                    <input
                                        className="addevent_input"
                                        type="text"
                                        placeholder="Bundesland"
                                        value={province}
                                        onChange={(e) =>
                                            setProvince(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </article>
                        <div className="editProfile_input-group">
                            <label
                                className="addFile-profilePic"
                                htmlFor="real-file"
                            >
                                <span className="addevent_input-file-text">
                                    Bild hochladen
                                </span>
                            </label>
                            <input
                                name="file"
                                id="real-file"
                                type="file"
                                onChange={(e) =>
                                    setProfilePicURL(e.target.files[0])
                                }
                            />
                        </div>

                        <BtnSubmit text="übernehmen" onClick={saveChanges} />
                    </form>
                </section>
            ) : (
                <section className="user-profile-wrapper">
                    <h2>{userProfileData?.userDetails?.userName}</h2>
                    {/* profile image */}
                    <div className="profile-pic-container">
                        <img
                            className="clip"
                            src={
                                userProfileData?.userDetails?.profilePicURL
                                    ? `${backendUrl}/download/${userProfileData.userDetails.profilePicURL}`
                                    : picDummy
                            }
                            alt=""
                        />
                    </div>
                    {/* edit button */}
                    <BtnOutlined
                        className="btn-edit"
                        text="Profil Bearbeiten"
                        icon={editIcon}
                        onClick={changeToEditMode}
                    />
                    {/* About */}
                    <article className="user-profile-item-container">
                        <h3>Über mich</h3>
                        <p className="text-light aboutMe">
                            {userProfileData?.userDetails?.bio}
                        </p>
                    </article>

                    {/* Address */}
                    <article className="user-profile-item-container">
                        <h3>Anschrift</h3>
                        <div className="address-wrapper">
                            <div className="location-pin-container">
                                <img src={locationPinGrey} alt="locationPin" />
                            </div>

                            <div className="address-container">
                                {!userProfileData?.userDetails?.userAddress
                                    ?.city ? (
                                    <>
                                        <p className="text-light">
                                            Keine Anschrift hinterlegt
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p id="zipAndCity">
                                            {
                                                userProfileData?.userDetails
                                                    ?.userAddress?.city
                                            }
                                        </p>

                                        <p>
                                            {
                                                userProfileData?.userDetails
                                                    ?.userAddress?.province
                                            }
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    </article>
                    <BtnSubmit text="Ausloggen" onClick={doLogout} />
                </section>
            )}
            <Nav highlight="profile" />
        </>
    );
};

export default UserProfile;
