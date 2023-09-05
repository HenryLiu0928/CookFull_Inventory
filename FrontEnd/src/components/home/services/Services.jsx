import React from 'react'

import MI from "../../assets/images/meat-icon.svg"
import DI from "../../assets/images/delivery-icon.svg"
import PI from "../../assets/images/phone-icon.svg"

import "../../styles/services.css"

export const Services = () => {
    return (
        <>
            <section class="section services" id="services">
                <div class="row container">
                    
                    <div class="col">
                    <div class="card">
                        <img src={MI} alt="" />
                        <h3>
                        Recipes for all <br />
                        your favorite <br />
                        Foods
                        </h3>
                    </div>
                    </div>
                    <div class="col">
                    <div class="card">
                        <img src={DI} alt="" />
                        <h3>
                        New Daily <br />
                        Recipes<br />
                        Uploaded
                        </h3>
                    </div>
                    </div>
                    <div class="col">
                    <div class="card">
                        <img src={PI} alt="" />
                        <h3>
                        We have <br />
                        400+ Review <br />
                        On our app
                        </h3>
                    </div>
                    </div>
                </div>
            </section>
        </>
    )
}