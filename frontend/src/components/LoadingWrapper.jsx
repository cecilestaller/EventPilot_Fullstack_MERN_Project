import { useEffect, useState } from "react";
import { doSilentRefresh, silentRefreshLoop } from "../utils/tokens.js";
import { Navigate, useLocation } from "react-router-dom";
import { backendUrl } from "../api/index";

const LoadingWrapper = ({
  authorization,
  saveAuthorization,
  saveUserProfileInfo,
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  //   console.log({ isLoading, authorization });

  useEffect(() => {
    async function tryRefreshToken() {
      if (!isLoading) return;
      if (authorization) {
        setIsLoading(false);
        return;
      }
      console.log("trying to refresh token");
      try {
        const accessToken = await doSilentRefresh();
        const authorization = `Bearer ${accessToken}`;

        saveAuthorization(authorization);

        const response = await fetch(backendUrl + "/api/v1/user", {
          headers: { authorization },
        });
        const { success, result, error } = await response.json();
        await saveUserProfileInfo(result);

        setIsLoading(false);

        silentRefreshLoop(accessToken, (newAccessToken) => {
          const authorization = `Bearer ${newAccessToken}`;
          saveAuthorization(authorization);
        });
      } catch (error) {
        console.log("Fehler im LW");
        console.log(error);
        setIsLoading(false);
      }
    }

    tryRefreshToken();
  }, []);

  const location = useLocation();

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (authorization) {
    return <>{children}</>;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default LoadingWrapper;
