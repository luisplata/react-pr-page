import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3">
            <h5>Contacto</h5>
            <p>Email: contacto@tuapp.com</p>
            <p>Teléfono: +52 123 456 7890</p>
            <p>Dirección: Calle Falsa 123, Ciudad de México</p>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="#galeria" className="text-light text-decoration-none">Galería</a></li>
              <li><a href="#servicios" className="text-light text-decoration-none">Servicios</a></li>
              <li><a href="#mapa" className="text-light text-decoration-none">Mapa</a></li>
              <li><a href="#comentarios" className="text-light text-decoration-none">Comentarios</a></li>
              <li><a href="#experiencia" className="text-light text-decoration-none">Experiencia</a></li>
            </ul>
          </div>

          <div className="col-md-4 mb-3">
            <h5>Síguenos</h5>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-facebook" style={{ fontSize: "1.5rem" }}></i>
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light me-3"
            >
              <i className="bi bi-twitter" style={{ fontSize: "1.5rem" }}></i>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-light"
            >
              <i className="bi bi-instagram" style={{ fontSize: "1.5rem" }}></i>
            </a>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="mb-0">&copy; 2025 TuApp. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
