import { backendUrl } from "../api";

function decodeTokenPayload(token) {
  // token: headerBase64.payloadBase64.signature
  if (typeof token !== "string")
    throw new Error("Token must be a valid string");
  const [_, payloadBase64] = token.split(".");
  if (!payloadBase64) throw new Error("Inavlid token format: No payload");
  const payloadJsonString = atob(payloadBase64);
  const payload = JSON.parse(payloadJsonString);
  return payload;
}

function calcRefreshTokenAfterMs(token) {
  const payload = decodeTokenPayload(token);
  const expirationPeriodSeconds = payload.exp - payload.iat;
  const expirationMs = expirationPeriodSeconds * 1000;
  const ONE_MINUTE = 30 * 1000;
  const refreshTokenAfterMs = expirationMs - ONE_MINUTE;
  return refreshTokenAfterMs;
}

export async function doSilentRefresh() {
  try {
    const response = await fetch(backendUrl + "/api/v1/user/refreshToken", {
      method: "POST",
      credentials: "include", // nimm den httpOnly cookies und sende sie in der request mit
    });
    const { success, result, error, message } = await response.json();
    if (!success) {
      console.log(error);
      console.log(message);
      throw new Error("Could not refresh token, please login");
    }
    return result.newAccessToken;
  } catch (err) {
    console.log(err);
    throw new Error("Could not refresh token, please login");
  }
}

export function silentRefreshLoop(currentAccessToken, onSiletRefreshDoneCb) {
  // abwarten, zeit: calcRefreshTokenAfterMs(accessToken)
  const delay = calcRefreshTokenAfterMs(currentAccessToken);
  console.log("delaying silent refresh to", delay, "ms");
  setTimeout(async () => {
    // fetch refresh endpoint with refreshToken --> newAccessToken
    console.log("doing silent refresh...");
    const newAccessToken = await doSilentRefresh();
    console.log(
      "silent refresh success, token length:",
      newAccessToken?.length
    );
    onSiletRefreshDoneCb(newAccessToken);
    // start the loop
    // doSilentRefresh for newAccessToken too!!
    silentRefreshLoop(newAccessToken, onSiletRefreshDoneCb);
  }, delay);
}
