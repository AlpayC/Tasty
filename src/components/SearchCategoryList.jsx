import { useEffect, useContext, useState } from 'react';
import './SearchCategoryList.css'
import { CategoryFilterContext, SearchbarCategoryContext } from '../context/Context';
import SearchCategoryItem from './SearchCategoryItem';

const SearchCategoryList = () => {
    const {categoryFilter, setCategoryFilter} = useContext(CategoryFilterContext)
    const { searchInputCategory, setSearchInputCategory } = useContext(SearchbarCategoryContext)
    const [filteredData, setFilteredData] = useState([])
    const [originalData, setOriginalData] = useState([])

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryFilter}`)
        .then((res) => res.json())
        .then((data) => {
            setOriginalData(data.meals)
            setFilteredData(data.meals)
        })
        .catch((err) => console.log(`Fehler: ${err}`))
    },[categoryFilter])

    useEffect(() => {
        if(searchInputCategory){
            const filteredResults = originalData.filter((meal) => meal.strMeal.toLowerCase().includes(searchInputCategory.toLowerCase()))
            setFilteredData(filteredResults)
        } else {
            setFilteredData(originalData)
        }
    },[searchInputCategory, originalData])

    return (
        <>
        <section className="category-item-list">
            {filteredData ? (
                filteredData.map((meal, index) => {return <SearchCategoryItem meal={meal} key={index} />})
            ) : (
                <p>loading data..</p>
            )}
        </section>
        </>
     );
}

export default SearchCategoryList;