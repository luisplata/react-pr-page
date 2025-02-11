import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Dashboard = () => {

  const [error, setError] = useState(null);
  const [form, setForm] = useState(0);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });    
  const [token, setToken] = useState(null);
  const handleChangeLogin = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setError(null);
      
    try {
      const response = await fetch(`${API_BASE_URL}login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(loginData),
      });

      if (!response.ok){
        throw new Error("Error al autenticar");
      }

      const result = await response.json();
      setError(null);
      setToken(result.token);
      setCreateData({
        ...createData,
        "token": result.token,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const [createData, setCreateData] = useState({
    nombre: "",
    about: "",
    horario: "",
    tarifa: "",
    whatsapp: "",
    telegram: "",
    mapa: "",
    token: "",
  });

  
  const [currentModelId, setcurrentModelId] = useState(null);
    const handleChangeCreate = (e) => {
      setCreateData({
        ...createData,
        [e.target.name]: e.target.value,
      });
  };
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setError(null);      
    try {
      const response = await fetch(`${API_BASE_URL}create`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(createData),
      });

      if (!response.ok){
        throw new Error("Error al autenticar");
      }

      const result = await response.json();
      setcurrentModelId(result.id);
      setForm(2);
    } catch (error) {
      setError(error.message);
    }
  };


  
  return (
  <>
      <Header />
      <main style={!token || form === 0 ? {paddingTop: 225, paddingBottom: 225} : {}}>

          {token ? (
              <>
                  {
                      form === 0 && (
                          <div className="d-flex justify-content-center">
                              <div className="d-flex flex-column justify-content-center">
                                  <button className="btn general-btn m-1" onClick={() => {setForm(1)}}>Crear Modelo</button>
                                  <button className="btn general-btn m-1" onClick={() => {setForm(2)}}>Actualizar</button>
                              </div>
                          </div>
                      )
                  }{
                      (form === 1 || (form === 2 && currentModelId)) && (   
                          <form className="container mt-5" onSubmit={handleSubmitCreate}>
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
                                  src="https://placehold.co/250x250"
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
                              <h4 className="ms-2">Nombre</h4>
                              <div >
                                  <input 
                                    type="text"
                                    name="nombre"
                                    className="t-0 model-tag rounded-4 p-1 mb-3"
                                    style={{borderColor: "var(--tag-color)"}} 
                                    placeholder="Nombre"
                                    value={loginData.nombre}
                                    onChange={handleChangeCreate}
                                    required
                                    />
                              </div>
                              <h4 className="ms-2">Zona (nacionalidad)</h4>
                              <div >
                                  <input 
                                    type="text"
                                    name="mapa"
                                    className="t-0 model-tag rounded-4 p-1 mb-3"
                                    style={{borderColor: "var(--tag-color)"}} 
                                    placeholder="Zona"
                                    value={loginData.mapa}
                                    onChange={handleChangeCreate}
                                    required
                                    />
                              </div>
                              <div >
                                {form === 2 ? (<>
                                  
                                </>) : "Tags (Disponible en paso 2)"}
                              </div>
              
                              <div className="row mt-3">
                                <div className="col-md-8">
                                  <h5>Descripción</h5>
                                  <p>
                                    <input 
                                      type="text"
                                      name="about"
                                      className="t-0 model-tag rounded-4 p-1 mb-3"
                                      style={{borderColor: "var(--tag-color)"}} 
                                      placeholder="Descripcion"
                                      onChange={handleChangeCreate}
                                      value={loginData.about}
                                      required
                                    />
                                  </p>
                                  
                                </div>
                                <div className="col-md-4">
                                  <h5>Horario Disponible</h5>
                                  <p>
                                    <input 
                                      type="text"
                                      name="horario"
                                      className="t-0 model-tag rounded-4 p-1 mb-3"
                                      style={{borderColor: "var(--tag-color)"}} 
                                      placeholder="Horario"
                                      onChange={handleChangeCreate}
                                      value={loginData.horario}
                                      required
                                    />
                                  </p>
                                </div>
                              </div>
                            </div>
                      
                            <div className="col-md-3 text-end">
                              <div className="container p-0">
                                <input 
                                  type="text"
                                  name="whatsapp"
                                  className="t-0 model-tag rounded-4 p-1 mb-3"
                                  style={{borderColor: "var(--tag-color)"}} 
                                  placeholder="Whatsapp (numero)"
                                  onChange={handleChangeCreate}
                                  value={loginData.whatsapp}
                                  required
                                />
                                <input 
                                  type="text"
                                  name="telegram"
                                  className="t-0 model-tag rounded-4 p-1 mb-3"
                                  style={{borderColor: "var(--tag-color)"}} 
                                  placeholder="Telegram (usuario)"
                                  onChange={handleChangeCreate}
                                  value={loginData.telegram}
                                  required
                                />
                              </div>
                              <h5>Tarifa por hora</h5>
                              <div className="d-flex justify-content-end">
                              <h3>
                                $ 
                              </h3>
                                <input 
                                  type="text"
                                  name="tarifa"
                                  className="t-0 model-tag rounded-4 p-1 mb-3"
                                  style={{borderColor: "var(--tag-color)"}} 
                                  placeholder="Tarifa"
                                  onChange={handleChangeCreate}
                                  value={loginData.tarifa}
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-center my-5">
                            <button className="btn general-btn" type="submit">Crear</button>
                          </div>
                        </form>

                      )

                      
                  }{
                    (form === 2 && !currentModelId) && (
                      <>
                        <div className="d-flex justify-content-center mb-3" style={{paddingTop: 225, paddingBottom: 225}}>
                          <input className="t-0 model-tag rounded-4 me-2 p-1" style={{borderColor: "var(--tag-color)"}} />
                          <button className="btn general-btn">Buscar</button>
                        </div>
                      </>
                    )
                  }
              </>) 
              : (
              <div>
                  <form className="d-flex justify-content-center" onSubmit={handleSubmitLogin}>
                      <div className="d-inline-flex justify-content-center flex-column mb-3" >
                          <input
                              type="text"
                              name="email"
                              className="t-0 model-tag rounded-4 p-1 text-center"
                              style={{borderColor: "var(--tag-color)"}} 
                              placeholder="Usuario"
                              value={loginData.email}
                              onChange={handleChangeLogin}
                              required
                          /> 
                          <br/>
                          <input
                              type="password"
                              name="password"
                              className="t-0 model-tag rounded-4 p-1 text-center"
                              style={{borderColor: "var(--tag-color)"}} 
                              placeholder="Contraseña"
                              value={loginData.password}
                              onChange={handleChangeLogin}
                              required
                          />
                          <br></br>
                          <button className="btn general-btn mt-2" type="submit">Ingresar</button>
                      </div>
                  </form>
              </div>)}
          {error && <p style={{ color: "red" }}>{error}</p>}

      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
