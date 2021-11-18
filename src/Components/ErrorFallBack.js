import React from "react";

import NavbarComponent from "../components/NavbarComponent";
import error_img from "../assets/img/svg/error.svg";

export default function ErrorFallBackComponent({ error }) {
  return (
    <>
      <section>
        <NavbarComponent />
        <div class="container">
          <section id="error_section">
            <div class="container">
              <div class="columns">
                <div class="column">
                  <div class="notification is-danger">
                    {`Something went wrong -  ${error.message}`}
                  </div>
                </div>
              </div>
              <div class="columns is-centered is-vcentered">
                <div class="column">
                  <a href="/home" className="button is-text">
                    Home
                  </a>
                </div>
                <div class="column">
                  <figure className="image">
                    <img src={error_img} alt="error" />
                  </figure>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
