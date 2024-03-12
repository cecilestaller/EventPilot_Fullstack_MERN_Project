import { useNavigate } from "react-router-dom";
import "./Splash.scss";

const Splash = () => {

    const navigate = useNavigate()

    const forwardToLogin = () => {
        navigate("/login")
    }

    return (
        <div onClick={() => forwardToLogin()}>
            <h2>Hi ich bin Splash</h2>
        </div>
    );
};

export default Splash;
