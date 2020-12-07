import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import AsideDrawerComponent from "../Components/AsideDrawerComponent";


export const NavbarComponent = () => {
  return (
    <>
    
      <nav
        class="navbar is-transparent has-shadow"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item">
            
            <AsideDrawerComponent />
          </div>
          <div class="navbar-item"><h3>Business Development</h3></div>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start"></div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <PersonIcon /> {sessionStorage.getItem("username").toUpperCase()}
          </div>
        </div>
      </nav>
      <br />
    </>
  );
};

export default NavbarComponent;
