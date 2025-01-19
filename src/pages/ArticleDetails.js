import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Galery from "../components/Galery";
import Services from "../components/Services";
import Map from "../components/Map";
import Comments from "../components/Comments";
import Experiences from "../components/Experiences";

const ArticleDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const ejemploPersona = {
    imagen: "https://picsum.photos/200/200",
    costoPorHora: 50,
    nombre: "Juan Pérez",
    categorias: ["Programación", "Diseño", "Marketing", "Programación", "Diseño", "Marketing", "Programación", "Diseño", "Marketing", "Programación", "Diseño", "Marketing"],
    servicios: [
        { nombre: "React", nivel: "Avanzado" },
        { nombre: "Node.js", nivel: "Intermedio" },
        { nombre: "Photoshop" },
        { nombre: "React", nivel: "Avanzado" },
        { nombre: "Node.js", nivel: "Intermedio" },
        { nombre: "Photoshop" },
        { nombre: "React", nivel: "Avanzado" },
        { nombre: "Node.js", nivel: "Intermedio" },
        { nombre: "Photoshop" }, 
    ],
    descripcion:
      "Soy un desarrollador con 5 años de experiencia en React y Node.js. Me apasiona trabajar en proyectos innovadores y aportar valor a los equipos con los que colaboro. También tengo experiencia en diseño gráfico y marketing digital.",
    horarioDisponible: "Lunes a Viernes: 9:00 AM - 6:00 PM",
  };

  const items = [
    { type: "photo", src: "https://picsum.photos/200", alt: "Foto de ejemplo 1" },
    { type: "photo", src: "https://picsum.photos/200", alt: "Foto de ejemplo 2" },
    { type: "photo", src: "https://picsum.photos/200", alt: "Foto de ejemplo 3" },
    { type: "video", src: "https://www.youtube.com/watch?v=EngW7tLk6R8&t=3s" },
    { type: "video", src: "https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4" },
  ];

  const [mostrarCompleto, setMostrarCompleto] = useState(false);

  const toggleDescripcion = () => {
    setMostrarCompleto(!mostrarCompleto);
  };

  return (
    <div>
        <Header></Header>
        <article>
        <div className="container mt-5">
      <div className="row">
        {/* Imagen a la izquierda */}
        <div className="col-md-3 text-center">
          <img
            src={ejemploPersona.imagen}
            alt="Imagen de la persona"
            className="img-fluid rounded-circle"
          />
        </div>
        {/* Descripción al centro */}
        <div className="col-md-6">
          {/* Nombre */}
          <h4>{name}</h4>
          {/* Categorías */}
          <div className="">
            {ejemploPersona.categorias.map((categoria, index) => (
              <span
                key={index}
                className="badge text-light me-1"
                style={{
                  backgroundColor: "#007bff",
                  padding: "5px 5px",
                  borderRadius: "5px",
                }}
              >
                {categoria}
              </span>
            ))}
          </div>
          {/* Servicios */}
          <div>
            {ejemploPersona.servicios.map((servicio, index) => (
              <span
                key={index}
                className="badge text-dark me-1"
                style={{
                  backgroundColor: "#f1f1f1",
                  padding: "5px 5px",
                  borderRadius: "5px",
                  display: "inline-block",
                }}
              >
                {servicio.nombre}{" "}
                {servicio.nivel && (
                  <strong>({servicio.nivel})</strong>
                )}
              </span>
            ))}
          </div>

          <div className="row mt-3">
            {/* Descripción de la persona */}
            <div className="col-md-8">
              <h5>Descripción</h5>
              <p>
                {mostrarCompleto
                  ? ejemploPersona.descripcion
                  : ejemploPersona.descripcion.slice(0, 150) + (ejemploPersona.descripcion.length > 150 ? "..." : "")}
                  {ejemploPersona.descripcion.length > 150 && (
                <button
                  className="btn btn-link p-0"
                  onClick={toggleDescripcion}
                >
                  {mostrarCompleto ? "Mostrar menos" : "Mostrar más"}
                </button>
              )}
              </p>
              
            </div>
            {/* Horario disponible */}
            <div className="col-md-4">
              <h5>Horario Disponible</h5>
              <p>{ejemploPersona.horarioDisponible}</p>
            </div>
          </div>
        </div>
        
        {/* Costo por hora a la derecha */}
        <div className="col-md-3 text-center">
          <h3>${ejemploPersona.costoPorHora} / hora</h3>
        </div>
      </div>
    </div>

    <div className="container mt-5">
      {/* Navbar centrada */}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container custom-container justify-content-center">
          <ul className="navbar-nav bg-light p-1 rounded-4">
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="#galeria">Galería</a>
            </li>
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="#servicios">Servicios</a>
            </li>
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="#mapa">Mapa</a>
            </li>
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="#comentarios">Comentarios</a>
            </li>
            <li className="nav-item d-flex justify-content-center">
              <a className="nav-link" href="#experiencia">Experiencia</a>
            </li>
          </ul>
        </div>
      </nav>

        {/* Secciones */}
        <Galery items={items}/>
        <Services services={["element 1", "element 2", "element 3", "element 4", "element 5"]}
            subServices={[
            { name: "SubServicio 1", list: ["element 1", "element 2", "element 3", "element 4", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5", "element 5" ]},
            { name: "SubServicio 2", list: ["element 1", "element 2", "element 3", "element 4", "element 5" ]},
            { name: "SubServicio 3", list: ["element 1", "element 2", "element 3", "element 4", "element 5" ]},
            { name: "Adicionales", list: ["element 1", "element 2", "element 3", "element 4", "element 5" ]},
        ]} />
        <Map />
        <Comments />
        <Experiences />
    </div>
        </article>
    </div>
    );
};

export default ArticleDetails;
