import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";
import BackBtn from "../components/BackBtn";
import { FavoritesContext, NavContext } from "../context/Context";
import Heart from "../images/nav-icon/Heart.svg";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { setNav } = useContext(NavContext);

  useEffect(() => {
    setNav("like");
  }, []);

  return (
    <section className="favorites-page">
      <BackBtn title="Favorites" />

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <img src={Heart} alt="" />
          <p>No favorites yet.</p>
          <span>Tap the heart on a recipe to save it here.</span>
        </div>
      ) : (
        <section className="favorites-list">
          {favorites.map((meal) => (
            <article className="favorite-card" key={meal.idMeal}>
              <NavLink
                to={`/detail/${meal.idMeal}`}
                className="favorite-card-link"
              >
                <img
                  className="favorite-card-img"
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  loading="lazy"
                />
                <div className="favorite-card-text">
                  <h2>{meal.strMeal}</h2>
                  <p>
                    {meal.strCategory}
                    {meal.strArea ? ` · ${meal.strArea}` : ""}
                  </p>
                </div>
              </NavLink>
              <button
                type="button"
                className="favorite-remove"
                onClick={() => removeFavorite(meal.idMeal)}
                aria-label={`Remove ${meal.strMeal} from favorites`}
              >
                ×
              </button>
            </article>
          ))}
        </section>
      )}

      <Nav />
    </section>
  );
};

export default Favorites;
