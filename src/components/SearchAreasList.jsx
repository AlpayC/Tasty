import { useEffect, useContext, useState } from "react";
import { FilteredAreaContext, SearchTermAreaContext } from "../context/Context";
import SearchAreasItem from "./SearchAreasItem";
import "./SearchAreasList.css";

const SearchAreasList = () => {
  const { filteredArea } = useContext(FilteredAreaContext);
  const { searchInputArea } = useContext(SearchTermAreaContext);
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [loading, setLoading] = useState(true);

  //   #Fetch der Produkte nach Area
  useEffect(() => {
    setLoading(true);
    fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filteredArea}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Die API liefert für Areas ohne Rezepte { meals: null } -> zu [] normalisieren
        const meals = data.meals || [];
        setOriginalData(meals);
        setFilteredData(meals);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Fehler beim Laden", error);
        setLoading(false);
      });
  }, [filteredArea]);

  //   #Filtern der bisherigen Suchergebnisse nach Inputfeld
  useEffect(() => {
    if (searchInputArea) {
      const filteredResults = originalData.filter((item) =>
        item.strMeal.toLowerCase().includes(searchInputArea.toLowerCase())
      );
      setFilteredData(filteredResults);
    } else {
      setFilteredData(originalData);
    }
  }, [searchInputArea, originalData]);

  return (
    <>
      <section className="area-item-list">
        {loading ? (
          <p>loading data...</p>
        ) : filteredData.length === 0 ? (
          <p className="area-empty">No recipes found for this area.</p>
        ) : (
          filteredData.map((meal) => (
            <SearchAreasItem meal={meal} key={meal.idMeal} />
          ))
        )}
      </section>
    </>
  );
};

export default SearchAreasList;
