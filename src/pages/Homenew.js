import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Galeria = () => (
  <div id="galeria" className="mt-5">
    <h2>Galería</h2>
    <p>Contenido de la galería...</p>
  </div>
);

const Servicios = () => (
  <div id="servicios" className="mt-5">
    <h2>Servicios</h2>
    <p>Contenido de los servicios...</p>
  </div>
);

const Mapa = () => (
  <div id="mapa" className="mt-5">
    <h2>Mapa</h2>
    <p>Contenido del mapa...</p>
  </div>
);

const Comentarios = () => (
  <div id="comentarios" className="mt-5">
    <h2>Comentarios</h2>
    <p>Contenido de los comentarios...</p>
  </div>
);

const Experiencia = () => (
  <div id="experiencia" className="mt-5">
    <h2>Experiencia</h2>
    <p>Contenido de la experiencia...</p>
  </div>
);

const App = () => {
  return (
    <div className="container mt-5">
      {/* Navbar centrada */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#galeria">Galería</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#servicios">Servicios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#mapa">Mapa</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#comentarios">Comentarios</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#experiencia">Experiencia</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Secciones */}
      <Galeria />
      <Servicios />
      <Mapa />
      <Comentarios />
      <Experiencia />
    </div>
  );
};

export default App;
