import React from "react";
import logo_everis from "../Static/Img/images/logo-everis.png";

export const PublicNavbarComponent = () => {
  return (
    <>
      <nav
        class="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item">
            <figure class="image is-48x48">
              <figure class="image">
                <img src={logo_everis} alt="logo everis"/>
              </figure>
            </figure>
          </div>
        </div>
        <div class="navbar-item">
            <h3>Business Development</h3>
        </div>

        <div class="navbar-end">
          <div class="navbar-item"></div>
        </div>
      </nav>

    
    </>
  );
};

export default PublicNavbarComponent;
