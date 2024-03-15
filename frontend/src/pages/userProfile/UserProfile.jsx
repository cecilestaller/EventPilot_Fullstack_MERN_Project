import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import Nav from "../../components/nav/Nav";
import editIcon from "../../assets/images/profileimage_edit.svg";
import "./UserProfile.scss";
import profilePicTest from "../../assets/images/profile-pic-test.jpg";
import { useEventFetchContext } from "../../context/eventFetchContext";
import { useEffect } from "react";
import { backendUrl } from "../../api";
import locationPinGrey from "../../assets/images/Map Pin_grey.svg";
import locationPinPurple from "../../assets/images/Location Pin_purple.svg";

const UserProfile = ({ authorization, userProfileInfo }) => {
  const { fetchEventData, setFetchEventData } = useEventFetchContext();

  useEffect(() => {
    async function fetchUserProfileInfo() {
      try {
        const users = await fetch(`${backendUrl}/api/v1/user`, {
          headers: { authorization },
        });
        const { result, success, error, message } = await users.json();
        if (!success) throw new Error(error);
        return setFetchEventData(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfileInfo();
  }, []);

  console.log("fetchEventData: ", fetchEventData);

  // breakpoint function for address
  // (if address breaks to a second line --> add class 'break-point' to break right before zip code)
  // ===============================================
  const addressField = document.body.querySelector("#address").offsetHeight;
  const zipAndCityField = document.body.querySelector("#zipAndCity");
  if (addressField > 24) {
    zipAndCityField.classList.add("break-point");
  }

  return (
    <section className="user-profile-wrapper">
      <h2>John Brown</h2>
      {/* profile image */}
      <div className="profile-pic-container">
        <img className="clip" src={profilePicTest} alt="" />
      </div>

      {/* follow */}
      <article className="follow-container">
        <div className="follow-block">
          <p>{fetchEventData?.userDetails?.following.length}</p>
          <p className="text-light">Gefolgt</p>
        </div>
        <div className="line"></div>
        <div className="follow-block">
          <p>{fetchEventData?.userDetails?.follower.length}</p>
          <p className="text-light">Follower</p>
        </div>
      </article>
      {/* edit button */}
      <BtnOutlined text="edit profile" icon={editIcon} />

      {/* About */}
      <article className="user-profile-item-container">
        <h3>Über mich</h3>
        <p className="text-light">{fetchEventData?.userDetails?.bio}</p>
      </article>

      {/* Interests */}
      <article className="user-profile-item-container">
        <h3>Interessen</h3>
        <div className="interests-items-container">
          {fetchEventData?.userDetails?.interests.map((item) => (
            <p className="interests-item">{item}</p>
          ))}
        </div>
      </article>

      <article className="user-profile-item-container">
        <h3>Anschrift</h3>
        <div className="address-wrapper">
          <img src={locationPinPurple} alt="" />
          <div className="address-container">
            <p id="address">
              Gothaer Str. 34,{" "}
              <span className="" id="zipAndCity">
                33211 Schwabing
              </span>
            </p>

            {/* no address */}
            {/* <p className="no-address">Keine Anschrift hinterlegt</p> */}
            <p>Bayern</p>
          </div>
        </div>
      </article>

      <Nav highlight="profile" />
    </section>
  );
};

export default UserProfile;
