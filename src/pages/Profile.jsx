import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { NavContext } from "../context/Context";
import ArrowRight from "../images/arrow-right.svg";
import "./Profile.css";

const STORAGE_KEY = "tasty-profile";
const AVATARS = ["🧑‍🍳", "👩‍🍳", "🧑", "👩", "🧔", "👵", "🐱", "🍔"];

const loadProfile = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { name: "", avatar: AVATARS[0] };
  } catch {
    return { name: "", avatar: AVATARS[0] };
  }
};

const Profile = () => {
  const { setNav } = useContext(NavContext);
  const navigate = useNavigate();

  const stored = loadProfile();
  const [name, setName] = useState(stored.name);
  const [avatar, setAvatar] = useState(stored.avatar);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setNav("profile");
  }, []);

  const handleSave = (event) => {
    event.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, avatar }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section className="profile-page">
      <header className="profile-header">
        <button
          type="button"
          className="profile-back"
          onClick={() => navigate(-1)}
          aria-label="Zurück"
        >
          <img src={ArrowRight} alt="" />
        </button>
        <h1 className="profile-title">Profile</h1>
        <span className="profile-header-spacer" />
      </header>

      <div className="profile-avatar-display">{avatar}</div>
      <p className="profile-greeting">{name ? `Hi, ${name}!` : "Willkommen!"}</p>

      <form className="profile-form" onSubmit={handleSave}>
        <label className="profile-label" htmlFor="profile-name">
          Name
        </label>
        <input
          id="profile-name"
          className="profile-input"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Dein Name"
        />

        <span className="profile-label">Avatar</span>
        <div className="profile-avatar-grid">
          {AVATARS.map((option) => (
            <button
              type="button"
              key={option}
              className={
                option === avatar
                  ? "profile-avatar-option active"
                  : "profile-avatar-option"
              }
              onClick={() => setAvatar(option)}
              aria-label={`Avatar ${option}`}
              aria-pressed={option === avatar}
            >
              {option}
            </button>
          ))}
        </div>

        <button type="submit" className="profile-save">
          {saved ? "Gespeichert ✓" : "Speichern"}
        </button>
      </form>

      <Nav />
    </section>
  );
};

export default Profile;
