import { User } from "../models/index.js";

export async function signUpUser({ userName, email, password }) {
  // check if user with same email or userName already exists
  const foundUserWithSameEmail = await User.find({ email: email });
  if (foundUserWithSameEmail.length > 0)
    throw new Error("User with this email already exists");
  const foundUserWithSameUserName = await User.find({ userName: userName });
  if (foundUserWithSameUserName.length > 0)
    throw new Error("User with user name already exists");

  const user = await User.create({
    userName,
    email,
    password,
  });

  return userToProfileInfo(user);
}

function userToProfileInfo({ _id, userName, email }) {
  return { _id, userName, email };
}
