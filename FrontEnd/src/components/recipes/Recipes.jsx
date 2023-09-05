import React, { useState } from "react"
import { Header } from "../common/Header"


import "../styles/recipes.css"
import "../styles/specialRecipes.css"

export const Recipes = () => {
    const [recipeList, setRecipeList] = useState([]);
    const [recipeModal, setRecipeModal] = useState([]);

    function getRecipeList() {
        const searchQ = document.querySelector('.searchRecipe').value;
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQ}`)
        .then(response => response.json())
        .then(data => {
            if(data.meals){
                setRecipeList(data.meals)
            }
        });
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

    return (
        <>
            <header class="header">
                <Header />
                <div class = "container">
                    <div class = "meal-wrapper">
                    <div class = "meal-search">
                        <h2 class = "title">Pop in your ingredients and find a tasty meal!</h2>
                        <blockquote>Real food doesn't have ingredients = real food is ingredients.<br/>
                        </blockquote>

                        <div class = "meal-search-box">
                            <div class="input-box">
                                <i class="uil uil-search"></i>
                                <input type="text" className="searchRecipe" placeholder="Search here..." />
                                <button class="button" onClick={() => getRecipeList()}>Search</button>
                            </div>
                        </div>
                    </div>

                    <div class = "meal-result">
                        <h2 class = "title">Your Search Results:</h2>
                        <div id="meal">
                            {recipeList.map((meal => (
                                    <div class="meal-item" data-id ={meal.idMeal}>
                                        <div >
                                        <div class="image"><img src={meal.strMealThumb} alt=""/></div>
                                        <div class="rating">
                                            <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                                            <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                                            <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                                            <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                                            <span><i style={{color: "orange"}} class="bx bxs-star"></i></span>
                                        </div>
                                        <h4>{meal.strMeal}</h4>
                                        <div class="price">
                                            <span>Price: </span><span class="color">${20}</span>
                                        </div>
                                        <div onClick = {(e) => showModal(e)} class="button btn" style={{marginTop: "20px", marginBottom: "20px"}}>View Recipe</div>
                                        </div>
                                    </div>
                                )
                                ))}
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
                    </div>
                    </div>
                
            </header>

        </>
    )
}