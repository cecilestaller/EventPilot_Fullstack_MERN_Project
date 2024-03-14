import Nav from "../../components/nav/Nav";
import "./Home.scss";
import Logo from "../../assets/images/Logo.svg";
import DropdownArrow from "../../assets/images/location_dropdown_arrow.svg";
import NearbyEvents from "../../components/nearbyEvents/NearbyEvents";
import UpcomingEvents from "../../components/upcomingEvents/UpcomingEvents";
import RandomEvent from "../../components/randomEvent/RandomEvent";
import SeeAllArrow from "../../assets/images/seeall_arrow.svg";
import { useNavigate } from "react-router-dom";
import { useEventFetchContext } from "../../context/eventFetchContext";
import { useEffect, useState } from "react";

const Home = ({ authorization, userProfileInfo }) => {
  const { fetchEventData, setFetchEventData } = useEventFetchContext();

  const navigate = useNavigate();

  // ============ fetching events and save into context ==================
  useEffect(() => {
    const getEventData = async () => {
      try {
        const response = await fetch(`http://localhost:3333/api/v1/events`, {
          headers: { authorization },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          const { success, result, error, message } = await response.json();
          setFetchEventData(result);
          return;
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    getEventData();
  }, []);

  console.log(userProfileInfo);
  console.log(userProfileInfo.userAddress);
  console.log(fetchEventData);

  // ========= function of "Alle zeigen" in "Anstehende Events" ===================
  const forwardToSeeAllUpcoming = () => {
    navigate("/search");
  };
  // ========= function of "Alle zeigen" in "In der Nähe" ===================
  const forwardToSeeAllNearby = () => {
    navigate("/search");
  };

  return (
    <div className="homeContainer">
      <header className="headerHome">
        <img className="logo" src={Logo} alt="logoIcon" />
        <div className="locationContainer">
          <div
            className="locationDropdownContainer"
            onClick={() => locationDropdownMenu()}
          >
            <p className="locationTitle">Standort</p>
            <img src={DropdownArrow} alt="arrowIcon" />
          </div>
          <h3 className="showCurrentLocation">Berlin, DE</h3>
        </div>
        {/* Element emptyDivForFlexSpace is invisible and only used to properly center  locationDropdownContainer */}
        <div className="emptyDivForFlexSpace">
          <img
            className="logo"
            style={{ visibility: "hidden" }}
            src={Logo}
            alt="logoIcon"
          />
        </div>
        {/* ===================================================================================================== */}
      </header>
      <div className="UpcomingTitleContainer">
        <p className="titleOfConponent">Anstehende Events</p>
        <label
          className="seeAllTextAndIcon"
          onClick={() => forwardToSeeAllUpcoming()}
        >
          Alle zeigen <img src={SeeAllArrow} alt="seeAllIcon" />
        </label>
      </div>
      <UpcomingEvents />
      <div className="NearbyTitleContainer">
        <p className="titleOfConponent">In deiner Nähe</p>
        <label
          className="seeAllTextAndIcon"
          onClick={() => forwardToSeeAllNearby()}
        >
          Alle zeigen <img src={SeeAllArrow} alt="seeAllIcon" />
        </label>
      </div>
      <NearbyEvents />
      <RandomEvent />
      <Nav highlight="explore" />
    </div>
  );
};

export default Home;
