import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import Nav from "../../components/nav/Nav";
import editIcon from "../../assets/images/profileimage_edit.svg";
import "./UserProfile.scss";
import profilePicTest from "../../assets/images/profile-pic-test.jpg";
import { useLocationFetchContext } from "../../context/locationFetchContext";
import { useEffect, useRef, useState } from "react";
import { backendUrl } from "../../api";
import locationPinGrey from "../../assets/images/Map Pin_grey.svg";
import locationPinPurple from "../../assets/images/Location_Pin_purple.svg";
import { useNavigate } from "react-router-dom";

const UserProfile = ({ authorization, userProfileInfo }) => {
  const [userData, setUserData] = useState();
  const { fetchLocationData, setFetchLocationData } = useLocationFetchContext();
  const zipAndCityRef = useRef(null);
  const [isUserAdressEmpty, setIsUserAddressEmpty] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const users = await fetch(`${backendUrl}/api/v1/user`, {
          headers: { authorization },
        });
        const { result, success, error, message } = await users.json();
        if (!success) throw new Error(error);
        setUserData(result);
        setIsUserAddressEmpty(
          Object.keys(result?.userDetails?.userAddress ?? {}).length === 0
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData();
  }, []);

  console.log("userData: ", userData);
  console.log("fetchLocationData:", fetchLocationData);
  console.log("userProfileInfo: ", userProfileInfo);

  const goToEditPage = () => {
    navigate("/profile/edit");
  };

  // breakpoint function for address
  // (if address breaks to a second line --> add class 'break-point' to break right before zip code)
  // ===============================================
  useEffect(() => {
    if (zipAndCityRef.current?.offsetHeight > 24) {
      zipAndCityRef.current.classList.add("break-point");
    }
  }, [userData]);

  return (
    <section className="user-profile-wrapper">
      <h2>{userData?.userDetails?.userName}</h2>
      {/* profile image */}
      <div className="profile-pic-container">
        <img className="clip" src={profilePicTest} alt="" />
      </div>

      {/* follow */}
      {/* <article className="follow-container">
        <div className="follow-block">
          <p>{userData?.userDetails?.following.length}</p>
          <p className="text-light">Gefolgt</p>
        </div>
        <div className="line"></div>
        <div className="follow-block">
          <p>{userData?.userDetails?.follower.length}</p>
          <p className="text-light">Follower</p>
        </div>
      </article> */}

      {/* edit button */}
      <BtnOutlined
        className="btn-edit"
        text="Profil Bearbeiten"
        icon={editIcon}
        onClick={goToEditPage}
      />

      {/* About */}
      <article className="user-profile-item-container">
        <h3>Über mich</h3>
        <p className="text-light">{userData?.userDetails?.bio}</p>
      </article>

      {/* Interests */}
      <article className="user-profile-item-container">
        <h3>Interessen</h3>
        <div className="interests-items-container">
          {userData?.userDetails?.interests.map((item) => (
            <p className="interests-item">{item}</p>
          ))}
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

          <div className="address-container">
            {isUserAdressEmpty ? (
              <>
                <p className="text-light">Keine Anschrift hinterlegt</p>
                <p>{fetchLocationData}</p>
              </>
            ) : (
              <>
                <p ref={zipAndCityRef} id="zipAndCity">
                  {userData?.userDetails?.userAddress?.zip &&
                  userData?.userDetails?.userAddress?.city ? (
                    <>
                      {userData.userDetails.userAddress.zip}
                      <br />
                      {userData.userDetails.userAddress.city}
                    </>
                  ) : (
                    <>
                      {!userData?.userDetails?.userAddress?.zip &&
                      userData?.userDetails?.userAddress?.city ? (
                        <>
                          <span className="text-light">
                            Keine PLZ hinterlegt
                          </span>
                          <br />
                          {userData.userDetails.userAddress.city}
                        </>
                      ) : (
                        <>
                          {userData?.userDetails?.userAddress?.zip ? (
                            <>
                              {userData.userDetails.userAddress.zip}
                              <br />
                              <span className="text-light">
                                Keine Stadt hinterlegt
                              </span>
                            </>
                          ) : (
                            <span className="text-light">
                              Keine PLZ und Stadt hinterlegt
                            </span>
                          )}
                        </>
                      )}
                    </>
                  )}
                </p>

                <p>{fetchLocationData}</p>
              </>
            )}
          </div>
        </div>
      </article>

      <Nav highlight="profile" />
    </section>
  );
};

export default UserProfile;
