import "./BtnCategory.scss"

const BtnCategory = ({ icon, text, onClickEvent }) => {

    return ( 
        <div className="BtnCategoryContainer" onClick={onClickEvent}>
            <img className="BtnCategoryIcon" src={icon} />
            <p className="BtnCategroyText">{text}</p>
        </div>
    );
}

export default BtnCategory;