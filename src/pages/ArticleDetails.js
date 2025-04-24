import React, { useEffect, useState } from "react";
import { useParams} from "react-router-dom";
import Header from "../components/Header";
import Galery from "../components/Galery";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { Link } from "react-scroll";
import InteractiveMap from "../components/InteractiveMap";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;

const ArticleDetails = () => {
  const { id } = useParams();
  
  const diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
  const abreviaturas = diasSemana.map(d => d.slice(0, 3));

  const [data, setData] = useState(null);
  const [coords, setCoords] = useState();
  const [mapLabel, setMapLabel] = useState();

  useEffect(() => {
    fetch(`${API_BASE_URL}people/${id}`)
      .then((response) => response.json())
      .then((data) => {
        onDataReceived(data)
      })
      .catch((error) => console.error("Error al obtener los datos:", error));
  }, []);

  const onDataReceived = (data) => {
    data.about = data.tags.find((a)=>a.tipo === "about_me")?.valor;
    data.nombre = data.tags.find((a)=>a.tipo === "nombre")?.valor;
    const whatsapp = data.tags.find((a)=>a.tipo === "tel_whatssapp")?.valor.replace("|", "");
    const telegram = data.tags.find((a)=>a.tipo === "tel_telegram")?.valor;
    data.whatsapp = whatsapp ? whatsapp : "";
    data.telegram = telegram ? telegram : "";
    const dataCoords = data.tags.find(tag => tag.tipo === "mapa");
    if (dataCoords){
      setCoords(dataCoords.valor);
      setMapLabel(`${data.tags.find(tag => tag.tipo === "ciudad").valor}, ${data.tags.find(tag => tag.tipo === "nacionalidad").valor}`)
    } 
    const horario = data.tags.find(tag => tag.tipo === "horario");
    if (horario){
      const { horaInicio: hi, horaFin: hf, diasSeleccionados: ds } = parseAvailabilityString(horario.valor);
      data.horario = toReadableString(hi, hf, ds);
    }
    setData(data);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}increment/${id}`);
  
        if (!response.ok){
          throw new Error("Error al buscar persona");
        }
  
        const result = await response.json();
          
      } catch (error) {
          console.log(error.message);
        }

    }
    fetchData();
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

  function diasLegibles(dias) {
    const indices = dias.map(d => diasSemana.indexOf(d)).filter(i => i !== -1).sort((a, b) => a - b);
  
    let resultado = [];
    let inicio = indices[0];
    let anterior = indices[0];
  
    for (let i = 1; i <= indices.length; i++) {
      if (indices[i] !== anterior + 1) {
        if (inicio === anterior) resultado.push(abreviaturas[inicio]);
        else resultado.push(`${abreviaturas[inicio]} - ${abreviaturas[anterior]}`);
        inicio = indices[i];
      }
      anterior = indices[i];
    }
  
    return resultado.join(", ");
  }
  
  function formatearHora(hora) {
    const [h, m] = hora.split(":").map(Number);
    const sufijo = h >= 12 ? "pm" : "am";
    const hora12 = h % 12 || 12;
    return `${hora12}:${m.toString().padStart(2, "0")} ${sufijo}`;
  }
  
  function toReadableString(horaInicio, horaFin, diasSeleccionados) {
    const dias = diasLegibles(diasSeleccionados);
    return `${dias} ${formatearHora(horaInicio)} - ${formatearHora(horaFin)}`;
  }

  const services = [];
  const subServices = [{name:"Fantasias", list:[]} ,
    {name:"Tipo de Oral", list:[] },
    {name:"Tipos de Masajes", list:[] },
    {name:"Servicios Virtuales", list:[] },
    {name:"Servicios Adicionales", list:[] },
    {name:"Metodos de Pago", list:[] },];
  const displayedTags = [];

  const addSubService = (propTipo, type, name, valor) =>{
    if(propTipo.includes(type))
      {
        let obj = subServices.find(item => item.name === name);
        if (obj) {
            obj.list.push(valor);
        } else {
            subServices.push({ name: name, list: [valor] });
        }
      }
  }

  function parseAvailabilityString(str) {
    const [horaInicio, horaFin, diasStr] = str.split("|");
    const diasSeleccionados = diasStr ? diasStr.split(",") : [];
    return { horaInicio, horaFin, diasSeleccionados };
  }

  if(data){
    for (let prop of data.tags){

      const propTipo = prop.tipo.toLowerCase();
      
      if (prop.tipo === "servicio" ){
        services.push(prop.valor);
      }
      else if (prop.tipo === "tipo_fantasia"){
        subServices.find(item => item.name === "Fantasias").list.push(prop.valor)
      }
      else if (prop.tipo === "tipo_oral"){
        subServices.find(item => item.name === "Tipo de Oral").list.push(prop.valor)
      }
      else if (prop.tipo === "tipo_masajes"){
        subServices.find(item => item.name === "Tipos de Masajes").list.push(prop.valor)
      }
      else if (prop.tipo === "servicios_virtuales"){
        subServices.find(item => item.name === "Servicios Virtuales").list.push(prop.valor)
      }
      else if (prop.tipo === "adicionales"){
        subServices.find(item => item.name === "Servicios Adicionales").list.push(prop.valor)
      }
      else if (prop.tipo === "metodo_de_pago"){
        subServices.find(item => item.name === "Metodos de Pago").list.push(prop.valor)
      }
      else if (!propTipo.includes("nombre") && !propTipo.includes("categoria") && !propTipo.includes("about_me") && 
      !propTipo.includes("kyc") && !propTipo.includes("tel") && !propTipo.includes("views") && !prop.tipo.includes("horario")){
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
                    src={data?.media[0] ? MEDIA_BASE_URL + data?.media[0].file_path : "https://dummyimage.com/300/eee/aaa"}
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
                {/* <h5>Tarifa por hora</h5>
                <h3>${data?.tarifa}</h3> */}
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

            {coords && (
              <InteractiveMap coords={coords}  label={mapLabel}/>
            )}
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
