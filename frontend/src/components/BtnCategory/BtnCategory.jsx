import "./BtnCategory.scss"

const BtnCategory = ({ icon, text, onClickEvent, isActive  }) => {

    return ( 
        <div className={`BtnCategoryContainer ${isActive ? 'SearchButtonHighlight' : ''}`} onClick={onClickEvent}>
            <img className="BtnCategoryIcon" src={icon} alt={`${text} icon`} />
            <p className="BtnCategroyText">{text}</p>
        </div>
    );
}

export default BtnCategory;