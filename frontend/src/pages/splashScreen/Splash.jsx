import "./Splash.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../assets/images/Logo.svg";

const Splash = () => {
  const navigate = useNavigate();

  const forwardToLogin = () => {
    navigate("/login");
  };

  return (
    <div onClick={() => forwardToLogin()}>
      <div className="splash__wrapper">
        <div className="splash_logo">
          <img src={logo} alt="" />
          <p className="splash_logo-title">
            vent<span className="splash_logo-title-span">Pilot</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Splash;
