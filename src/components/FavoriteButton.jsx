import { useContext } from "react";
import { FavoritesContext } from "../context/Context";
import Heart from "../images/nav-icon/Heart.svg";
import HeartActive from "../images/nav-icon/HeartActive.svg";
import "./FavoriteButton.css";

const FavoriteButton = ({ meal }) => {
  const { isFavorite, toggleFavorite } = useContext(FavoritesContext);

  if (!meal) return null;

  const active = isFavorite(meal.idMeal);

  return (
    <button
      type="button"
      className={active ? "favorite-btn active" : "favorite-btn"}
      onClick={() => toggleFavorite(meal)}
      aria-label={
        active ? "Aus Favoriten entfernen" : "Zu Favoriten hinzufügen"
      }
      aria-pressed={active}
    >
      <img src={active ? HeartActive : Heart} alt="" />
    </button>
  );
};

export default FavoriteButton;
