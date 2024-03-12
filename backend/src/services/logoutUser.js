import { deleteToken } from "../utils/jwt.js";

export async function logoutUser(refreshToken) {
  try {
    const result = deleteToken(refreshToken);

    if (result.success) {
      return { success: true, message: "User successfully logged out" };
    } else {
      return {
        success: false,
        message: "Logout failed. Token may already be invalid",
      };
    }
  } catch (error) {
    return { success: false, message: "Error during logout process" };
  }
}
