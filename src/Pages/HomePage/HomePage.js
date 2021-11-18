import React from "react";

import ClientsSection from "../Sections/ClientsSection";
import NavbarComponent from "../../components/NavbarComponent";

function HomePage() {
  return (
    <>

      <NavbarComponent />
      <div class="container">
        <section id="clients_section">
          <ClientsSection />
        </section>
      </div>
    </>
  );
}

export default HomePage;
