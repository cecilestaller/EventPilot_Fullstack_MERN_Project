import "./btnSubmitAsInput.scss";
import arrow from "./../../assets/images/button_arrow.svg";

const BtnSubmitAsInput = ({ text, onClick }) => {
  return (
    <div className="BtnSubmitAsInputContainer">
      <input className="BtnSubmitAsInput" onClick={onClick} type="submit" value="" />
      {text}
      <span className="button-iconAsInput">
        <img src={arrow} alt="" className="btnsubmit-imgAsInput" />
      </span>
    </div>
  );
};

export default BtnSubmitAsInput;
