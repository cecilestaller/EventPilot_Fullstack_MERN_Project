import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

// blacklist to store invalid/deleted tokens
const tokenBlacklist = [];

export function createToken(user, tokenType = "access") {
  const expiresIn =
    {
      access: "1h",
      refresh: "10d",
    }[tokenType] || "10min";
  const tokenPayload = {
    sub: user._id.toString(),
    type: tokenType,
  };
  const options = { algorithm: "HS256", expiresIn };
  const tokenString = jwt.sign(tokenPayload, jwtSecret, options);
  return tokenString;
}
// export function createToken(){}

export function deleteToken(token) {
  try {
    // check, if token exists in blacklist
    if (tokenBlacklist.includes(token)) {
      return { success: false, message: "Token is already invalid" };
    }

    // verify token
    const decoded = jwt.verify(token, jwtSecret);

    // add token to blacklist
    tokenBlacklist.push(token);

    return { success: true, message: "Token successfully added to blacklist" };
  } catch (error) {
    // if token cannot be validated: it could be already expired or it's invalid
    return {
      success: false,
      message: "Failed to verify or add token to blacklist",
    };
  }
}
