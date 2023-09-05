import React, { useEffect, useState } from "react"
import Swiper, { Navigation, Pagination } from 'swiper';


import "../../styles/specialRecipes.css"


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "../../styles/recipes.css" 

export const SpecialRecipes = () => {

    let swiper;
    Swiper.use([Navigation, Pagination]);

    const [recipe, setRecipe] = useState("rice");
    const [recipeList, setRecipeList] = useState([]);
    const [recipeModal, setRecipeModal] = useState([]);

    useEffect(() => {
        swiper = new Swiper(".mySwiper", {
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 15,
            pagination: {
                el: ".custom-pagination",
                clickable: true
            },
            breakpoints: {
                567: {
                slidesPerView: 2,
                },
                996: {
                slidesPerView: 3,
                },
                1200: {
                slidesPerView: 4,
                },
            },
            });

        changeRecipeList(recipe);
    }, [])

    async function changeActiveTab(e) {
        const filters = [...document.querySelectorAll(".filters span")];

        const id = e.target.getAttribute("data-filter");
        const target = e.target;
        // const products = await getProducts();
        filters.forEach((btn) => {
            btn.classList.remove("active");
        });
        target.classList.add("active");

        setRecipe(id);
        changeRecipeList(recipe);
    }

    function showModal(e) {
        e.preventDefault();

        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => setRecipeModal(data.meals[0]));

        const mealDetailsContent = document.querySelector('.meal-details-content');
        mealDetailsContent.parentElement.classList.add('showRecipe');
    }

    function hideModal() {
        const mealDetailsContent = document.querySelector('.meal-details-content');
        mealDetailsContent.parentElement.classList.remove('showRecipe');
        setRecipeModal([])
    }

    function changeRecipeList(recipe) {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${recipe}`)
        .then(response => response.json())
        .then(data => {
            if(data.meals){
                setRecipeList(data.meals)
                swiper.update()
            }
        });
    }

    return (
        <>
            <section class="section recipes" id="recipes">
                <h2 style={{color: "#3d85f9"}}>Try Our Special Recipes</h2>
                <div class="row container">
                    <div class="filters d-flex">
                        <span data-filter="rice" className="active" onClick={(e) => changeActiveTab(e)}>Rice</span>
                        <span data-filter="egg" onClick={(e) => changeActiveTab(e)}>Egg</span>
                        <span data-filter="chicken" onClick={(e) => changeActiveTab(e)}>Chicken</span>
                        <span data-filter="tofu" onClick={(e) => changeActiveTab(e)}>Tofu</span>
                        <span data-filter="beef" onClick={(e) => changeActiveTab(e)}>Beef</span>
                    </div>
                    <div class="products">
                    <div class="swiper mySwiper">
                        <div class="swiper-wrapper" id="products-wrapper">
                            {recipeList.map((meal => (
                                <div class="swiper-slide" data-id ={meal.idMeal}>
                                    <div class="card d-flex">
                                    <div class="image"><img src={meal.strMealThumb} alt=""/></div>
                                    <div class="rating">
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                    </div>
                                    <h4>{meal.strMeal.substring(0,10)+"..."}</h4>
                                    <div class="price">
                                        <span>Price: </span><span class="color">${20}</span>
                                    </div>
                                    <div onClick = {(e) => showModal(e)} class="button btn">View Recipe</div>
                                    </div>
                                </div>
                            )
                            ))}
                        </div>
                    </div>
                    <div class="pagination">
                        <div className="custom-pagination"></div>
                    </div>
                    </div>
                </div>

                <div className = {"meal-wrapper"}>
                    <div class = "meal-details">
                        <button type = "button" class = "btn recipe-close-btn" id = "recipe-close-btn" onClick={() => hideModal()}>x</button>
                        <div class = "meal-details-content">
                            <h2 class = "recipe-title">{recipeModal.strMeal}</h2>
                            <div class = "recipe-meal-img" style={{marginBottom: "2.5em"}}>
                                <img src ={recipeModal.strMealThumb} alt = ""/>
                            </div>
                            <p class = "recipe-category">{recipeModal.strCategory}</p>
                            <div class = "recipe-instruct">
                                <h3>Instructions:</h3>
                                <p>{recipeModal.strInstructions}</p>
                            </div>
                            
                            <div class = "recipe-link">
                                <a style={{ fontSize: "2rem", textDecoration: "underline"}} href={recipeModal.strYoutube}>Watch Video</a>
                            </div>
                        </div>
                    </div>
                </div>
                
            </section>
        </>
    )
}