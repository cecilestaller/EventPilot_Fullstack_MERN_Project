import "./btnSubmit.scss";
import arrow from "./../../assets/images/button_arrow.svg";

const BtnSubmit = ({ text, onClick }) => {
  return (
    <button className="BtnSubmit" onClick={onClick}>
      {text}
      <span className="button-icon">
        <img src={arrow} alt="" className="btnsubmit-img" />
      </span>
    </button>
  );
};

export default BtnSubmit;
