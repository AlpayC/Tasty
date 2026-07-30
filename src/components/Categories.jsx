import './Categories.css'
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { CategoryFilterContext } from '../context/Context'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const {categoryFilter, setCategoryFilter} = useContext(CategoryFilterContext)

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
        .then((res) => res.json())
        .then((data) => setCategories(data.categories))
        .catch((err) => console.log(`Fehler: ${err}`))
    },[])

    return ( 
        <section className='categories'>
            <div className='search-box'>
                <h3>Categories</h3>
                <Link className='see-all' to='/search/category'>See All</Link>
            </div>
            <figure className='categories-wrapper'>
            {categories ? (
                categories.map((category, index) => {return (
                <Link key={category.idCategory} to='/search/category' >
                    <article onClick={() => setCategoryFilter(category.strCategory)} key={category.idCategory} className="category-card">
                    <img src={category.strCategoryThumb} alt={category.strCategory} loading="lazy" />
                    <h5>{category.strCategory}</h5>
                    </article>
                </Link>
            )})
            ) : (
                <p>loeading data...</p>
            )}
            </figure>
        </section>
     );
}

export default Categories;