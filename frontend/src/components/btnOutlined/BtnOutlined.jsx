import "./BtnOutlined.scss";

const BtnOutlined = ({ icon, text, onClick }) => {
  return (
    <button className="btn-outlined" onClick={onClick}>
      <img src={icon} alt={text} />
      <span>{text}</span>
    </button>
  );
};

export default BtnOutlined;
