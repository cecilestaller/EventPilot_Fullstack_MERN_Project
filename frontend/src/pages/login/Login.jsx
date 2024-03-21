import "./Login.scss";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { silentRefreshLoop } from "../../utils/tokens";
import { backendUrl } from "../../api/index";
import BtnSubmit from "../../components/btnSubmit/btnSubmit";
import logo from "../../assets/images/Logo.svg";
import hidePassword from "../../assets/images/hide_password.svg";
import showPassword from "../../assets/images/eye.svg";
import mailIcon from "../../assets/images/email_icon.svg";
import passwordIcon from "../../assets/images/Lock.svg";
import arrowBack from "../../assets/images/arrow_back.svg";
import BtnSubmitAsInput from "../../components/btnSubmitAsInput/btnSubmitAsInput";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordVisibilityToggle, setPasswordVisibilityToggle] = useState("password")

    const navigate = useNavigate();

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const loginUser = (event) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage("Bitte gebe Email und Passwort an");
            return;
        }

        fetch(backendUrl + "/api/v1/user/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
            .then((res) => res.json())
            .then(({ success, result, message }) => {
                if (!success) return setErrorMessage(message || "Login failed");
                // result.tokens.refreshToken;
                const authorization = `Bearer ${result.tokens.accessToken}`;
                onLoginSuccess(authorization, result);

                silentRefreshLoop(
                    result.tokens.accessToken,
                    function onSiletRefreshDoneCallback(newAccessToken) {
                        const authorization = `Bearer ${newAccessToken}`;
                        onLoginSuccess(authorization, result); // update suthorization state
                    }
                );
                setErrorMessage(""); // reset error message after success
                setSuccessMessage("Login successful, enjoy!");
                navigate("/home");
            });
    };

    return (
        <>
            <div className="login__wrapper">
                <Link to="/login">
                    <img
                        src={arrowBack}
                        alt=""
                        style={{ visibility: "hidden" }}
                    />
                </Link>
                <div className="login_header">
                    <img src={logo} alt="logo" className="login_logo" />
                    <p className="login_logo-title">
                        Event<span className="login_logo-subtitle">Pilot</span>
                    </p>
                </div>

                <div className="login_sign-up-form">
                    <p className="login_heading">Login</p>
                    <form onSubmit={loginUser}>
                        <div className="login_input-group">
                            <span className="login_input-icon">
                                <img src={mailIcon} alt="" />
                            </span>
                            <input
                                className="login_input"
                                type="email"
                                placeholder="deinemail@email.com"
                                value={email}
                                onChange={handleInputChange(setEmail)}
                            />
                        </div>
                        <div className="login_input-group">
                            <span className="login_input-icon">
                                <img src={passwordIcon} alt="" />
                            </span>
                            <input
                                className="login_input"
                                type={passwordVisibilityToggle}
                                placeholder="Passwort"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                            />
                            <img 
                                className="loginPasswordVisibilityToggle" 
                                src={passwordVisibilityToggle === "password" ? hidePassword : showPassword } 
                                onClick={() => setPasswordVisibilityToggle(passwordVisibilityToggle === "password" ? "text" : "password")} 
                                alt="toggleVisibilityIcon" 
                            />
                        </div>
                        <BtnSubmitAsInput text="LOGIN" onClick={loginUser} /> 
                    </form>
                </div>
                <p className="login_success-message">{successMessage}</p>
                <p className="login_error-message">{errorMessage}</p>
                <BtnSubmit text="Login" onClick={loginUser} />
                <p className="login_sign-in-prompt">
                    Du hast keinen Account?
                    <Link className="login_link" to="/register">
                        Account erstellen
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
