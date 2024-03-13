import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Splash from "./pages/splashScreen/Splash";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import SearchEvents from "./pages/searchEvent/SearchEvents";
import UserProfile from "./pages/userProfile/UserProfile";
import AddEvent from "./pages/addEvent/AddEvent";
import LikedEvents from "./pages/likedEvents/LikedEvents";
import EventDetails from "./pages/eventDetails/EventDetails";
import HostProfile from "./pages/hostProfile/HostProfile";

function App() {
  const [authorization, setAuthorization] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route
            path="/login"
            element={
              <Login
                onLoginSuccess={(authorization, userProfileInfo) => {
                  setAuthorization(authorization);
                  setUserProfileInfo(userProfileInfo);
                }}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchEvents />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/likedevents" element={<LikedEvents />} />
          <Route path="/eventdetails/:eventId" element={<EventDetails />} />
          <Route path="/host/:hostId" element={<HostProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
