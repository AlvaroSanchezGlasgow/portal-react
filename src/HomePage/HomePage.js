import React from "react";
import IndexSection from "../Sections/IndexSection";
import ClientsSection from "../Sections/ClientsSection";

function HomePage() {
  return (
    <>
      <div class="container">
        <section id="index_section">
          <IndexSection />
        </section>

        <section id="clients_section">
            <ClientsSection />
          
        </section>
      </div>
    </>
  );
}

export default HomePage;
