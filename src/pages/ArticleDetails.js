import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Header from "../components/Header";
import Galery from "../components/Galery";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { Link } from "react-scroll";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;

const ArticleDetails = () => {
  const { id } = useParams();
  

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}people/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  useEffect(() => {
        
    fetch(`${API_BASE_URL}increment/${id}`)
      .then((response) => response.json())
      .then((json) => console.log(json)
      )
      .catch((error) => console.error("Error:", error));
  }, []);

  const [mostrarCompleto, setMostrarCompleto] = useState(false);

  const toggleDescripcion = () => {
    setMostrarCompleto(!mostrarCompleto);
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${data?.whatsapp}?text=${"Hola " + data?.nombre + "! Vi tu aviso https://lobasvip.com.ve ¿Como estas? Te quería consultar informacion sobre..."}`, '_blank');
  };

  const handleTelegramClick = () => {
    console.log(`https://t.me/${data?.telegram}`);
    
    window.open(`https://t.me/${data?.telegram.replaceAll("@","")}`, '_blank');
  };

  const services = [];
  const subServices = [];
  const displayedTags = [];

  if(data){
    for (let prop of data.tags){

      const propTipo = prop.tipo.toLowerCase();
      
      if (prop.tipo === "Servicios" ){
        services.push(prop.valor);
      }
        
      else if(propTipo.includes("virtuales") || propTipo.includes("adicionales") || propTipo.includes("fantasias") || propTipo.includes("métodos de pago") || 
        propTipo.includes("masajes") || propTipo.includes("oral") || propTipo.includes("presencial")){
        let obj = subServices.find(item => item.name === prop.tipo);
        
        if (obj) {
            obj.list.push(prop.valor);
        } else {
            subServices.push({ name: prop.tipo, list: [prop.valor] });
        }
      }
      else{
        displayedTags.push(prop);
      }
    }
  }

  return (
    <div>
        <Header></Header>
        <article className="container-fluid">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-3 text-center">
                <div 
                  style={{maxWidth: 250,
                  maxHeight: 250,
                  margin: "auto",
                  position: "relative",
                  overflow: "hidden",
                }}
                >
                  <img
                    src={MEDIA_BASE_URL + data?.media[0].file_path}
                    alt="Imagen de la persona"
                    className="rounded-circle"
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                    }}  
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h4>{data?.nombre}</h4>
                <div >
                </div>
                <div >
                  {displayedTags?.map((tag, index) => (
                    <div className="model-tag d-inline-flex px-2 me-1 rounded-3" style={{marginBottom: "2px"}}>
                      {tag.tipo}&nbsp;
                      {tag.valor && (
                        <strong>{tag.valor}</strong>
                      )}
                    </div>
                  ))}
                </div>

                <div className="row mt-3">
                  <div className="col-md-8">
                    <h5>Descripción</h5>
                    <p>
                      {mostrarCompleto
                        ? data?.about
                        : data?.about.slice(0, 150) + (data?.about.length > 150 ? "..." : "")}
                        {data?.about.length > 150 && (
                      <button
                        className="btn btn-link p-0 ps-1 pb-1 m-0 border-0 text-decoration-none"
                        style={{
                          color: "#038093"
                        }}
                        onClick={toggleDescripcion}
                      >
                        {mostrarCompleto ? "Mostrar menos" : "Mostrar más"}
                      </button>
                    )}
                    </p>
                    
                  </div>
                  <div className="col-md-4">
                    <h5>Horario Disponible</h5>
                    <p>{data?.horario}</p>
                  </div>
                </div>
              </div>
        
              <div className="col-md-3 text-end">
                <div className="container p-0">
                  {data?.whatsapp !== undefined && data?.whatsapp !== null && data?.whatsapp !== "" && (
                  <button 
                  className="ms-2 rounded-3 border-0 px-3 py-1 mb-2 text-light" 
                  onClick={handleWhatsAppClick}
                  style={{backgroundColor: "#c90035"}}>
                    <i className="bi bi-whatsapp fs-5"></i>
                  </button>
                  )}
                  {data?.telegram !== undefined && data?.telegram !== null && data?.telegram !== "" && (
                  <button 
                  className="ms-2 rounded-3 border-0 px-3 py-1 mb-2 text-light" 
                  onClick={handleTelegramClick}
                  style={{backgroundColor: "#c90035"}}>
                    <i className="bi bi-telegram fs-5"></i>
                  </button>
                  )}
                </div>
                <h5>Tarifa por hora</h5>
                <h3>${data?.tarifa}</h3>
              </div>
            </div>
          </div>

          <div className="container mt-5">
            <nav className="navbar navbar-expand-lg ">
              <div className="container custom-container justify-content-center">
                <ul className="navbar-nav model-tag p-1 rounded-4">
                  <li className="nav-item d-flex justify-content-center">
                    <Link className="model-tag nav-link" to="galeria">Galería</Link>
                  </li>
                  <li className="nav-item d-flex justify-content-center">
                    <Link className="model-tag nav-link" to="servicios">Servicios</Link>
                  </li>
                </ul>
              </div>
            </nav>


            <Galery items={data?.media}/>
            <Services services={services}
                subServices={subServices} />
          </div>
        </article>
        <Footer></Footer>
      </div>
    );
  };

export default ArticleDetails;
