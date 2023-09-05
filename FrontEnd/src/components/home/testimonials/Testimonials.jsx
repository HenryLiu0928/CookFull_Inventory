import React, { useEffect, useState } from "react"
import { testemonials  } from "../../assets/data/Testimonials"

import "../../styles/testimonials.css"

import P1 from "../../assets/images/profile-1.jpg"
import P2 from "../../assets/images/profile-2.jpg"
import P3 from "../../assets/images/profile-3.jpg"
import P4 from "../../assets/images/profile-4.jpg"

export const Testimonials = () => {

    function filterSelected(e) {
        const filterKey = e.target.closest('.card').getAttribute('data-filter');

        const cards = [...document.querySelectorAll('.testimonials .card')];
        const testimonial = [...document.querySelectorAll('.testimonial')];

        testimonial.map((item) => {
            item.classList.remove('active');
            
            if(item.getAttribute('data-id') == filterKey) {
                item.classList.add('active');

                cards.map((card) => {
                    card.classList.remove('active');

                    if(card.getAttribute('data-filter') == filterKey) {
                        card.classList.add('active');
                    }
                })
            }

        })
    }

    return (
        <>
            <section class="section testimonials" id="testimonials">
                <div class="row container">
                    <div class="col">
                    <div class="card active" onClick = {(event) => filterSelected(event)} data-filter="rosele">
                        <div class="d-flex">
                        <div class="image">
                            <img src={P1} alt="" />
                        </div>
                        <div>
                            <h4>Rosele Desoza</h4>
                            <span>Gym Enthusiast</span>
                        </div>
                        </div>
                    </div>
                    <div class="card" onClick = {(event) => filterSelected(event)} data-filter="marvin">
                        <div class="d-flex">
                        <div class="image">
                            <img src={P2} alt="" />
                        </div>
                        <div>
                            <h4>Marvin McKinney</h4>
                            <span>Web Designer</span>
                        </div>
                        </div>
                    </div>
                    <div class="card" onClick = {(event) => filterSelected(event)} data-filter="guy">
                        <div class="d-flex">
                        <div class="image">
                            <img src={P3} alt="" />
                        </div>
                        <div>
                            <h4>Guy Hawkins</h4>
                            <span>World Traveller</span>
                        </div>
                        </div>
                    </div>
                    <div class="card" onClick = {(event) => filterSelected(event)} data-filter="kathryn">
                        <div class="d-flex">
                        <div class="image">
                            <img src={P4} alt="" />
                        </div>
                        <div>
                            <h4>Kathryn Murphy</h4>
                            <span>Yoga Instructor</span>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col">
                    <h2>
                        What our Customers <br />
                        <span>are saying</span>
                    </h2>
                    <div class="test-wrapper">
                        {testemonials.map((item, i) => (
                            <div class={`testimonial ${i == 0 && 'active'}`} data-id={item.firstName}>
                                <div class="d-flex">
                                    <div>
                                        <h4>{item.name}</h4>
                                        <span>{item.position}</span>
                                    </div>
                    
                                    <div class="rating">
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class="bx bxs-star"></i></span>
                                        <span><i class='bx bxs-star-half' ></i></span>
                                        <span><i class='bx bxs-star-half' ></i></span>
                                    </div>
                                </div>
                
                                <p>{item.info}</p>
                            </div>
                        ))}
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}