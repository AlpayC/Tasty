import { useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { FavoritesContext, NavContext } from "../context/Context";
import Heart from "../images/nav-icon/Heart.svg";
import ArrowRight from "../images/arrow-right.svg";
import "./Favorites.css";

const Favorites = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const { setNav } = useContext(NavContext);
  const navigate = useNavigate();

  useEffect(() => {
    setNav("like");
  }, []);

  return (
    <section className="favorites-page">
      <header className="favorites-header">
        <button
          type="button"
          className="favorites-back"
          onClick={() => navigate(-1)}
          aria-label="Zurück"
        >
          <img src={ArrowRight} alt="" />
        </button>
        <h1 className="favorites-title">Favorites</h1>
        <span className="favorites-header-spacer" />
      </header>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <img src={Heart} alt="" />
          <p>Noch keine Favoriten.</p>
          <span>Tippe bei einem Rezept auf das Herz, um es hier zu speichern.</span>
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
                aria-label={`${meal.strMeal} aus Favoriten entfernen`}
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
