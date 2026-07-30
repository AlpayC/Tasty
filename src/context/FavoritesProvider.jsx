import { useState, useEffect, useCallback } from "react";
import { FavoritesContext } from "./Context";

const STORAGE_KEY = "tasty-favorites";

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavorites);

  // Bei jeder Änderung in localStorage persistieren
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = useCallback(
    (id) => favorites.some((meal) => meal.idMeal === id),
    [favorites]
  );

  const toggleFavorite = useCallback((meal) => {
    setFavorites((prev) => {
      if (prev.some((m) => m.idMeal === meal.idMeal)) {
        return prev.filter((m) => m.idMeal !== meal.idMeal);
      }
      // Nur die für die Favoritenliste benötigten Felder speichern
      const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meal;
      return [...prev, { idMeal, strMeal, strMealThumb, strCategory, strArea }];
    });
  }, []);

  const removeFavorite = useCallback((id) => {
    setFavorites((prev) => prev.filter((meal) => meal.idMeal !== id));
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isFavorite, toggleFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
