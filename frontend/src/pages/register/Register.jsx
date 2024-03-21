import "./Register.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { backendUrl } from "../../api/index";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import logo from "../../assets/images/Logo.svg";
import nameIcon from "../../assets/images/Profile.svg";
import mailIcon from "../../assets/images/email_icon.svg";
import passwordIcon from "../../assets/images/Lock.svg";
import arrowBack from "../../assets/images/arrow_back.svg";
import hidePassword from "../../assets/images/hide_password.svg";
import showPassword from "../../assets/images/eye.svg";
import BtnSubmitAsInput from "../../components/btnSubmitAsInput/btnSubmitAsInput";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState("password")
  const [passwordVisibilityToggleWdh, setPasswordVisibilityToggleWdh] = useState("password")

  const navigate = useNavigate();

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const registerUser = () => {
    setIsLoading(true);
    if (!name || !email || !password) {
      setErrorMessage("Fülle bitte alle Felder aus!");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Dein Passwort stimmt nicht überein!");
      return;
    }

    fetch(backendUrl + "/api/v1/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: name, email, password }),
    })
      .then((res) => res.json())
      .then(({ success, result, message }) => {
        if (!success)
          return setErrorMessage(message || "Registrierung fehlgeschlagen");
        setSuccessMessage(
          `Willkommen, ${name}! Wir leiten dich zum Login weiter...`
        );

        setErrorMessage("");
        // setName("");
        // setEmail("");
        // setPassword("");
        // setConfirmPassword("");

        setTimeout(() => navigate("/login"), 3000);
      });
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
                type={passwordVisibilityToggle}
                placeholder="Passwort"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
              <img 
                className="registerPasswordVisibilityToggle" 
                src={passwordVisibilityToggle === "password" ? hidePassword : showPassword } 
                onClick={() => setPasswordVisibilityToggle(passwordVisibilityToggle === "password" ? "text" : "password")} 
                alt="toggleVisibilityIcon" 
              />
            </div>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={passwordIcon} alt="" />
              </span>
              <input
                className="register_input"
                type={passwordVisibilityToggleWdh}
                placeholder="Passwort wiederholen"
                value={confirmPassword}
                onChange={handleInputChange(setConfirmPassword)}
              />
              <img 
                className="registerPasswordVisibilityToggle" 
                src={passwordVisibilityToggleWdh === "password" ? hidePassword : showPassword } 
                onClick={() => setPasswordVisibilityToggleWdh(passwordVisibilityToggleWdh === "password" ? "text" : "password")} 
                alt="toggleVisibilityIcon" 
              />
            </div>
            <BtnSubmitAsInput
              text={isLoading ? "Lädt..." : "Account erstellen"}
              onClick={registerUser}
              disabled={isLoading}
            />
          </form>
        </div>
        <p className="register_success-message">{successMessage}</p>
        <p className="register_error-message">{errorMessage}</p>
        <BtnSubmit
          text={isLoading ? "Lädt..." : "Account erstellen"}
          onClick={registerUser}
          disabled={isLoading}
        />
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
