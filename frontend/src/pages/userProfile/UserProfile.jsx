import BtnOutlined from "../../components/btnOutlined/BtnOutlined";
import Nav from "../../components/nav/Nav";
import editIcon from "../../assets/images/profileimage_edit.svg";
import "./UserProfile.scss";
import profilePicTest from "../../assets/images/profile-pic-test.jpg";

const UserProfile = () => {
  return (
    <section className="user-profile-wrapper">
      <h2>John Brown</h2>
      {/* profile image */}
      <div className="profile-pic-container">
        <img className="clip" src={profilePicTest} alt="" />
      </div>

      {/* follow */}
      <article className="follow-container">
        <div className="follow-block">
          <p>300</p>
          <p className="text-light">Gefolgt</p>
        </div>
        <div className="line"></div>
        <div className="follow-block">
          <p>50</p>
          <p className="text-light">Follower</p>
        </div>
      </article>
      {/* edit button */}
      <BtnOutlined text="edit profile" icon={editIcon} />

      {/* About */}
      <article className="about-container">
        <h3>Über mich</h3>
        <p className="text-light">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum quasi,
          perferendis dolores beatae illum provident minima, quae sint sapiente
          ipsa deserunt molestias dolorum ipsam. Quidem aliquam velit repellat
          iste architecto.
        </p>
      </article>

      {/* Interests */}
      <article className="interests-wrapper">
        <h3>Interessen</h3>
        {/* Interests grid */}
        <div className="interests-items-container">
          <p className="interests-item">Konzerte</p>
          <p className="interests-item">Kunst</p>
          <p className="interests-item">Filme</p>
          <p className="interests-item">Music</p>
          <p className="interests-item">Web-Entwicklung</p>
          <p className="interests-item">Raumfahrt</p>
          <p className="interests-item">Comedy</p>
        </div>
      </article>

      <Nav highlight="profile" />
    </section>
  );
};

export default UserProfile;
