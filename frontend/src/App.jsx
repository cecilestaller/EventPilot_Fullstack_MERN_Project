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
import LoadingWrapper from "./components/LoadingWrapper";
import { EventFetchProvider } from "./context/eventFetchContext";
import { LocationFetchProvider } from "./context/locationFetchContext";
import EditUserProfile from "./pages/userProfile/EditUserProfile";
import { UserProfileInfoProvider } from "./context/userProfileInfoContext";

function App() {
  const [authorization, setAuthorization] = useState(null);
  const [userProfileInfo, setUserProfileInfo] = useState(null);
  return (
    <>
      <BrowserRouter>
        <EventFetchProvider>
          <LocationFetchProvider>
            <UserProfileInfoProvider>
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
                <Route
                  path="/home"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <Home
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                        onLogout={() => setAuthorization(null)}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/search"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <SearchEvents
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <UserProfile
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/profile/edit"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <EditUserProfile
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/addevent"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <AddEvent
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/likedevents"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <LikedEvents
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/eventdetails/:eventId"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <EventDetails
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
                <Route
                  path="/host/:hostId"
                  element={
                    <LoadingWrapper
                      authorization={authorization}
                      saveAuthorization={(auth) => setAuthorization(auth)}
                      saveUserProfileInfo={(user) => setUserProfileInfo(user)}
                    >
                      <HostProfile
                        authorization={authorization}
                        userProfileInfo={userProfileInfo}
                      />
                    </LoadingWrapper>
                  }
                />
              </Routes>
            </UserProfileInfoProvider>
          </LocationFetchProvider>
        </EventFetchProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
