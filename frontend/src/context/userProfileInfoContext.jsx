import { createContext, useContext, useState } from "react";

const userProfileInfoContext = createContext();

export const useUserProfileInfoContext = () => {
  const context = useContext(userProfileInfoContext);
  return context;
};

export const UserProfileInfoProvider = ({ children }) => {
  const [userProfileData, setUserProfileData] = useState([]);
  return (
    <userProfileInfoContext.Provider
      value={{ userProfileData, setUserProfileData }}
    >
      {children}
    </userProfileInfoContext.Provider>
  );
};
