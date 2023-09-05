import React from "react"

import { Header } from "../common/Header"
import { Landing } from "./landing/Landing"
import { Services } from "./services/Services"
import { SpecialRecipes } from "./specialRecipes/SpecialRecipes"
import { Testimonials } from "./testimonials/Testimonials"

import "../styles/landing.css"


export const Home = () => {
    return (
        <>
            <header class="header">
                <Header />
                <Landing />
            </header>
            <Services />
            <SpecialRecipes />
            <Testimonials />
            
        </>
    )
}