import React from "react";
import { useHistory } from "react-router-dom";

export const PublicNavbarComponent = () => {
  let history = useHistory();

  return (
    <>
      <nav
        class="navbar is-transparent"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
          <div class="navbar-item">
          <h3>Business Development App</h3>
          </div>
        </div>
        <div class="navbar-item">
          
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
          <button className="button is-dark" onClick={() => history.push("/users")}>
            Admin
          </button>
          </div>
        </div>
      </nav>

    
    </>
  );
};

export default PublicNavbarComponent;
