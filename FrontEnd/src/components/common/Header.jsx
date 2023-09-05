import React from "react";
import "../styles/header.css";

import Logo from "../assets/images/logo.png";

export const Header = () => {
  return (
    <>
      <nav class="navbar">
        <div class="row d-flex container">
          <a href="" class="logo d-flex">
            <img src={Logo} alt="" />
            CookFull
          </a>

          <ul class="nav-list d-flex">
            <a href="/">Home</a>
            <a href="/recipes">Recipes</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/inventory">Inventory</a>
            <span class="close d-flex">
              <i class="bx bx-x"></i>
            </span>
          </ul>

          <div class="col d-flex">
            <div class="cart-icon d-flex">
              <i class="bx bx-shopping-bag"></i>
              <span>0</span>
            </div>
            <a class="btn signin">Sign In</a>
          </div>

          <div class="hamburger d-flex">
            <i class="bx bx-menu"></i>
          </div>
        </div>
      </nav>
    </>
  );
};
