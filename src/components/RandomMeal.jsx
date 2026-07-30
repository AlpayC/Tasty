import "./RandomMeal.css";
import { useEffect, useState } from "react";
import Ellipse from "../images/Ellipse.png";
import logo from "../images/logo.svg";
import { NavLink } from "react-router-dom";

const RandomMeal = () => {
  const [randomDish, setRandomDish] = useState();
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((random) => {
        setRandomDish(random.meals[0]);
      })
      .catch((error) => {
        console.error("Fehler beim Fetch", error);
      });
  }, []);

  // Bild vorladen, damit der Loader sichtbar bleibt, bis das Bild wirklich da ist
  useEffect(() => {
    if (!randomDish?.strMealThumb) return;
    const img = new Image();
    img.onload = () => setImgLoaded(true);
    img.onerror = () => setImgLoaded(true);
    img.src = randomDish.strMealThumb;
  }, [randomDish]);

  const isLoading = !imgLoaded;

  return (
    <div className="RandomMealSection">
      <h3 className="RandomDishTitle">Meal of the Day</h3>
      <NavLink to={randomDish ? `/detail/${randomDish.idMeal}` : "#"}>
        <div
          className={isLoading ? "RandomMealBox loading" : "RandomMealBox"}
          style={
            imgLoaded
              ? { backgroundImage: `url(${randomDish.strMealThumb})` }
              : undefined
          }
        >
          {isLoading ? (
            <div className="RandomMealLoader">
              <img className="RandomMealLoaderImg" src={logo} alt="" />
            </div>
          ) : (
            <article className="RandomMealTextBox">
              <h2 className="RandomDishName">{randomDish.strMeal}</h2>
              <div className="RandomDishCatAr">
                <div className="RandomDishCatPoint">
                  <img className="Ellipse" src={Ellipse} alt="" />
                  <p className="RandomDishCat">{randomDish.strCategory}</p>
                </div>
                <p className="RandomDishAr">{randomDish.strArea}</p>
              </div>
            </article>
          )}
        </div>
      </NavLink>
    </div>
  );
};

export default RandomMeal;
