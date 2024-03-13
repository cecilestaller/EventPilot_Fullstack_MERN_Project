import "./Register.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import logo from "../../assets/images/Logo.svg";
import nameIcon from "../../assets/images/Profile.svg";
import mailIcon from "../../assets/images/email_icon.svg";
import passwordIcon from "../../assets/images/Lock.svg";
import arrowBack from "../../assets/images/arrow_back.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const registerUser = (event) => {
    event.preventDefault();

    if (!name || !email || !password) {
      setErrorMessage("Fülle bitte alle Felder aus!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Dein Passwort stimmt nicht überein!");
      return;
    }
  };

  return (
    <>
      <div className="register__wrapper">
        <Link to="/login">
          <img src={arrowBack} alt="" />
        </Link>
        <div className="register_header">
          <img src={logo} alt="logo" className="register_logo" />
          <p className="register_logo-title">
            Event<span className="register_logo-subtitle">Pilot</span>
          </p>
        </div>

        <div className="register_sign-up-form">
          <p className="register_heading">Account erstellen</p>
          <form onSubmit={registerUser}>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={nameIcon} alt="" />
              </span>
              <input
                className="register_input"
                type="text"
                placeholder="Dein Name"
                value={name}
                onChange={handleInputChange(setName)}
              />
            </div>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={mailIcon} alt="" />
              </span>
              <input
                className="register_input"
                type="email"
                placeholder="deinemail@email.com"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </div>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={passwordIcon} alt="" />
              </span>
              <input
                className="register_input"
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </div>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={passwordIcon} alt="" />
              </span>
              <input
                className="register_input"
                type="password"
                placeholder="Passwort wiederholen"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
              />
            </div>
          </form>
        </div>
        <p className="register_error-message">{errorMessage}</p>
        <BtnSubmit text="Account erstellen" onClick={registerUser} />
        <p className="register_sign-in-prompt">
          Du hast bereits einen Account?
          <Link className="register_link" to="/login">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
