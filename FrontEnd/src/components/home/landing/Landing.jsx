import React from "react"

import landingImage from "../../assets/images/landingImage.webp"
import FF from "../../assets/images/french-fries.svg"
import "../../styles/landing.css"

export const Landing = () => {
    return (
        <>
            <div class="home">
                <div class="row container">
                    <div class="col">
                        <div class="faster">
                        Search Ingredients
                        <div class="image d-flex">
                            <img src={FF} alt="" />
                        </div>
                        </div>
                        <h1>
                        Recipes <br />
                        <span class="color">That are TasteFull</span>
                        </h1>
                        <p>
                        World Recipes that are one click away. Recipes from all over the Internet. Recipes from all over the Internet.
                        </p>
                        <a href="" class="btn">Explore Recipes</a>
                    </div>
                    <div class="col">
                        <img src={landingImage}alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}