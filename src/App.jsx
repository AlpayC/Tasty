import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingSection from "./components/LoadingSection";
import { DEFAULT_AREA } from "./data/areas";
import { lazy, Suspense, useEffect, useState } from "react";

const Home = lazy(() => import("./pages/Home"));
const Onboarding = lazy(() => import("./pages/Onboarding"));
const SearchInput = lazy(() => import("./pages/SearchInput"));
const SearchAreas = lazy(() => import("./pages/SearchAreas"));
const SearchCategory = lazy(() => import("./pages/SearchCategory"));
const Details = lazy(() => import("./pages/Details"));
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
    </Routes>
    </Suspense>
    </BrowserRouter>
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
