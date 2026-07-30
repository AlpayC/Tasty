import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSection from "./components/LoadingSection";
import FavoritesProvider from "./context/FavoritesProvider";
import { DEFAULT_AREA } from "./data/areas";
import { lazy, Suspense, useEffect, useState } from "react";

// Import-Funktionen einmal definieren, damit sie sowohl von lazy() als auch
// vom Prefetch (siehe useEffect unten) benutzt werden können.
const routeImports = [
  () => import("./pages/Home"),
  () => import("./pages/Onboarding"),
  () => import("./pages/SearchInput"),
  () => import("./pages/SearchAreas"),
  () => import("./pages/SearchCategory"),
  () => import("./pages/Details"),
  () => import("./pages/Favorites"),
  () => import("./pages/Profile"),
];

const Home = lazy(routeImports[0]);
const Onboarding = lazy(routeImports[1]);
const SearchInput = lazy(routeImports[2]);
const SearchAreas = lazy(routeImports[3]);
const SearchCategory = lazy(routeImports[4]);
const Details = lazy(routeImports[5]);
const Favorites = lazy(routeImports[6]);
const Profile = lazy(routeImports[7]);
import {
  CategoryFilterContext,
  SearchbarCategoryContext,
  FilteredAreaContext,
  SearchTermAreaContext,
  SearchTermAllProductsContext,
  ThemeContext,
  ThemeDetailContext, NavContext
} from "./context/Context";

function App() {
  const [theme, setTheme] = useState(false);
  const [themeDetailPage, setThemeDetailPage] = useState(false);
  const [loading, setLoading] = useState();
  const [categoryFilter, setCategoryFilter] = useState("Beef");
  const [searchInputCategory, setSearchInputCategory] = useState("");
  const [filteredArea, setFilteredArea] = useState(DEFAULT_AREA);
  const [searchInputArea, setSearchInputArea] = useState("");
  const [searchInputAllProducts, setsearchInputAllProducts] = useState("");
  const [nav, setNav] = useState("home");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  // Route-Chunks nach dem Initial-Render im Leerlauf vorladen, damit die
  // Navigation über die Navbar ohne kurzen Suspense-Loader (türkiser Splash)
  // erfolgt. Läuft mit niedriger Priorität, blockiert den ersten Paint nicht.
  useEffect(() => {
    const prefetchRoutes = () => routeImports.forEach((load) => load());
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetchRoutes);
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetchRoutes, 1500);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className={theme ? "dark" : "light"}>
      <NavContext.Provider value={{nav, setNav}}>
      <ThemeDetailContext.Provider
        value={{ themeDetailPage, setThemeDetailPage }}
      >
    <ThemeContext.Provider value={{ theme, setTheme }}>
          <FilteredAreaContext.Provider
            value={{ filteredArea, setFilteredArea }}
          >
              <SearchTermAreaContext.Provider
                value={{ searchInputArea, setSearchInputArea }}
              >
                <SearchTermAllProductsContext.Provider
                  value={{ searchInputAllProducts, setsearchInputAllProducts }}
                >
                  <SearchbarCategoryContext.Provider
                    value={{ searchInputCategory, setSearchInputCategory }}
                  >
                    <CategoryFilterContext.Provider
                      value={{ categoryFilter, setCategoryFilter }}
                    >
                      <FavoritesProvider>
                      <BrowserRouter>
                        <Suspense fallback={<LoadingSection />}>
                        <Routes>
                          <Route
                            path="/"
                            element={
                              loading ? <LoadingSection /> : <Onboarding />
                            }
                          />
                          <Route path="/home" element={<Home />} />
                          <Route
                            path="/search/input"
                            element={<SearchInput />}
                          />
                          <Route
                            path="/search/areas"
                            element={<SearchAreas />}
                          />
                          <Route
                            path="/search/category"
                            element={<SearchCategory />}
                          />

                        <Route path="/detail/:id" element={<Details />} />
                          <Route path="/favorites" element={<Favorites />} />
                          <Route path="/profile" element={<Profile />} />
    </Routes>
    </Suspense>
    </BrowserRouter>
    </FavoritesProvider>
    </CategoryFilterContext.Provider>
    </SearchbarCategoryContext.Provider>
    </SearchTermAllProductsContext.Provider>
    </SearchTermAreaContext.Provider>
    </FilteredAreaContext.Provider>
    </ThemeContext.Provider>
      </ThemeDetailContext.Provider>
      </NavContext.Provider>
    </section>
  );
}

export default App;
