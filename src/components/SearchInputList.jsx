import "./SearchInputList.css";
import { useEffect, useState, useContext } from "react";
import SearchInputItem from "./SearchInputItem";
import { SearchTermAllProductsContext } from "../context/Context";

const SearchInputList = () => {
  const [searchedData, setSearchedData] = useState([]);
  const { searchInputAllProducts, setsearchInputAllProducts } = useContext(
    SearchTermAllProductsContext
  );
  //   #Fetch aller Produkte nach Suchbegriff und immer dann, wenn der User etwas im Inputfeld eingibt
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputAllProducts}`,
        { signal: controller.signal }
      )
        .then((response) => response.json())
        .then((data) => {
          setSearchedData(data.meals);
        })
        .catch((error) => {
          if (error.name !== "AbortError") console.log("Fehler beim Laden", error);
        });
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchInputAllProducts]);
  return (
    <>
      <section className="search-item-list">
        {searchedData ? (
          searchedData.map((meal, index) => {return <SearchInputItem meal={meal} key={index} />})
        ) : (
          <p>loading data...</p>
        )}
      </section>
    </>
  );
};

export default SearchInputList;
