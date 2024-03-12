import "./Login.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import logo from "../../assets/images/Logo.svg";
import mailIcon from "../../assets/images/email_icon.svg";
import passwordIcon from "../../assets/images/Lock.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const loginUser = (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Bitte gebe Email und Passwort an");
      return;
    }
  };

  return (
    <>
      <div className="register__wrapper">
        <div className="register_header">
          <img src={logo} alt="logo" className="register_logo" />
          <p className="register_logo-title">
            Event <span className="register_logo-subtitle">Pilot</span>
          </p>
        </div>

        <div className="register_sign-up-form">
          <p className="register_heading">Login</p>
          <form onSubmit={loginUser}>
            <div className="register_input-group">
              <span className="register_input-icon">
                <img src={mailIcon} alt="" />
              </span>
              <input
                type="email"
                placeholder="deinemail@email.com"
                value={email}
                onChange={handleInputChange(setEmail)}
              />
            </div>
            <div className="input-group">
              <span className="input-icon">
                <img src={passwordIcon} alt="" />
              </span>
              <input
                type="password"
                placeholder="Passwort"
                value={password}
                onChange={handleInputChange(setPassword)}
              />
            </div>
          </form>
        </div>
        <p style={{ color: "red" }}>{errorMessage}</p>
        <BtnSubmit text="Login" onClick={loginUser} />
        <p className="register_sign-in-prompt">
          Du hast keinen Account?
          <Link to="/register">
            <button>Account erstellen</button>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
