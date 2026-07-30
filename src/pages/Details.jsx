import BackBtn2 from "../components/BackBtn2";
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import Nav from "../components/Nav";
import Toggle from "../components/Toggle";
import FavoriteButton from "../components/FavoriteButton";
import "./Details.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeDetailContext } from "../context/Context";
import { usePrint } from "react-recipes";

const Details = () => {
  const [printData, setPrintData] = useState("recipe-informations-print-off");
  const params = useParams();
  const idDish = params.id;
  const [mealData, setMealData] = useState();
  const { themeDetailPage, setThemeDetailPage } =
    useContext(ThemeDetailContext);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idDish}`)
      .then((res) => res.json())
      .then((data) => {
        setMealData(data.meals[0]);
      })
      .catch((error) => {
        console.error("Fehler beim Fetch", error);
      });
  }, [idDish]);

  return (
    <section className="detail-page">
      <div
        className="detail-hero"
        style={{ backgroundImage: `url(${mealData?.strMealThumb})` }}
      >
        <BackBtn2 />
      </div>

      <section
        className={
          themeDetailPage
            ? "detail-content detail-content-dark"
            : "detail-content detail-content-light"
        }
      >
        <div className="favorite-btn-wrapper">
          <FavoriteButton meal={mealData} />
        </div>

        <h1 className="meal-title">{mealData?.strMeal}</h1>
        <p className="meal-meta">
          {mealData?.strCategory}
          {mealData?.strArea ? ` · ${mealData.strArea}` : ""}
        </p>
        <Toggle />
      </section>

      <Nav />
    </section>
  );
};

export default Details;
