import { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddTag from "../components/AddTag";
import DeleteMediaButton from "../components/DeleteMediaButton";
import ConfirmActionModal from "../components/ConfirmActionModal";
import DeleteTagButton from "../components/DeleteTagButton";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [modal, setModal] = useState(false); 
  const [actionText, setActionText] = useState("");
  const [handleAction, setHandleAction] = useState(null);
  const toggleModal = ()=> {        
    setModal(!modal);
  }

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
      setNewTag({
        ...newTag,
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

  
  const [currentModel, setcurrentModel] = useState(null);
  const handleChangeCreate = (e) => {
    setCreateData({
      ...createData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitCreate = async (e) => {
    e.preventDefault();
    setError(null);    
    const method = modelToSearchId ? "PUT" : "POST";  
    const data = createData;
    if (modelToSearchId){
      data.token = token;
    }
    try {
      const response = await fetch(`${API_BASE_URL}${modelToSearchId ? "update" : "create"}${modelToSearchId ? `/${modelToSearchId}` : ""}`, {
        method: method,
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(modelToSearchId ? data : createData),
      });

      if (!response.ok){
        throw new Error("Error al autenticar");
      }

      
      if (modelToSearchId) toggleModal();
      const result = await response.json();
      
      setModelToSearchId(result.id)
      handleGetPerson(null, result.id);
      setForm(2);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteModel = async (e) => {
    console.log("deleting");
    
    e?.preventDefault();
    setError(null);      
    
    
    try {
      const response = await fetch(`${API_BASE_URL}delete/${modelToSearchId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({token : token}),
      });
      

      if (!response.ok){
        throw new Error("Error al eliminar modelo");
      }
      navigate(0);
      const result = await response.json();
      console.log(result);
      
    } catch (error) {
      setError(error.message);
    }
  };

  const [modelToSearchId, setModelToSearchId] = useState(null);
  const handleGetPerson = async (e, id) => {
    e?.preventDefault();
    setError(null);      
    try {
      const response = await fetch(`${API_BASE_URL}people/${modelToSearchId? modelToSearchId : id}`);

      if (!response.ok){
        throw new Error("Error al buscar persona");
      }

      const result = await response.json();
      setcurrentModel(result);
      setCreateData(result)
    } catch (error) {
      setError(error.message);
    }
  };

  const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
  const allowedVideoTypes = ["video/mp4", "video/webm", "video/ogg"];

  const [selectedFile, setSelectedFile] = useState(null);
  const [imageError, setImageError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    

    if (file) {
      if (allowedImageTypes.includes(file.type) || allowedVideoTypes.includes(file.type)) {
        setSelectedFile(file);
        setImageError();
      } else {
        setSelectedFile(null);
        setImageError("Solo se permiten imágenes (PNG, JPG, GIF) o videos (MP4, WEBM, OGG).");
      }
    }
  };

  const handleCreateMedia = async (e) => {
    e.preventDefault();
    setError(null);
    const mediaType = allowedImageTypes.includes(selectedFile.type) ? "image":"video";
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("token", token); 
    
    try {
      const response = await fetch(`${API_BASE_URL}upload/${mediaType}/${modelToSearchId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok){
        throw new Error("Error al subir archivo a galeria");
      }

      const result = await response.json();
      console.log(result);
      handleGetPerson();
    } catch (error) {
      setError(error.message);
    }
  };

  const [newTag, setNewTag] = useState({
    tipo: "",
    valor: "",
    token: "",
  })

  const handleChangeTag = (e) => {
    setNewTag({
      ...newTag,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTag = async (e, tagTipo) => {
    e?.preventDefault();
    setError(null);      
    try {
      const response = await fetch(`${API_BASE_URL}add-tag/${modelToSearchId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tagTipo ? {
          tipo: tagTipo,
          valor: newTag.valor,
          token: newTag.token,
        } : newTag),
      });

      if (!response.ok){
        throw new Error("Error al autenticar");
      }

      const result = await response.json();
      console.log(result);
      handleGetPerson();
      
    } catch (error) {
      setError(error.message);
    }
  };

  const services = [];
  const subServices = [];
  const displayedTags = [];

  if(currentModel){
    for (let prop of currentModel.tags){

      const propTipo = prop.tipo.toLowerCase();
      
      if (prop.tipo === "Servicios" ){
        services.push({valor: prop.valor, id: prop.id});
      }
        
      else if(propTipo.includes("virtuales") || propTipo.includes("adicionales") || propTipo.includes("fantasias") || propTipo.includes("métodos de pago") || 
        propTipo.includes("masajes") || propTipo.includes("oral") || propTipo.includes("presencial")){
        let obj = subServices.find(item => item.name === prop.tipo);
        
        if (obj) {
            obj.list.push({valor: prop.valor, id: prop.id});
        } else {
            subServices.push({ name: prop.tipo, list: [{valor: prop.valor, id: prop.id}]});
        }
      }
      else{
        displayedTags.push(prop);
      }
    }
    
  }
  
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
                                  {/*<button className="btn general-btn m-1" onClick={() => {setForm(1)}}>Crear Modelo</button>*/}
                                  <button className="btn general-btn m-1" onClick={() => {setForm(2)}}>Actualizar</button>
                              </div>
                          </div>
                      )
                  }{
                      (form === 1 || (form === 2 && currentModel)) && (  
                        <> 
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
                                    value={createData.nombre}
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
                                    value={createData.mapa}
                                    onChange={handleChangeCreate}
                                    required
                                    />
                              </div>
                              <div >
                                {form === 2 ? (<>
                                  {displayedTags?.map((tag, index) => (
                                    <>
                                  <div className="model-tag d-inline-flex px-2 me-1 rounded-3" style={{marginBottom: "2px", }}>
                                  {tag.tipo}&nbsp;
                                  {tag.valor && (
                                    <strong>{tag.valor}</strong>
                                  )}
                                  </div>
                                  <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                                  </>
                                ))}
                                <br/>
                                <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag}/>
                                
                                </>) : "Tags (Disponible en paso 2)"}
                              </div>
              
                              <div className="row mt-3">
                                <div className="col-md-8">
                                  <h5 className="ms-2">Descripción</h5>
                                  <p>
                                    <input 
                                      type="text"
                                      name="about"
                                      className="t-0 model-tag rounded-4 p-1 mb-3"
                                      style={{borderColor: "var(--tag-color)"}} 
                                      placeholder="Descripcion"
                                      onChange={handleChangeCreate}
                                      value={createData.about}
                                      required
                                    />
                                  </p>
                                  
                                </div>
                                <div className="col-md-4">
                                  <h5 className="ms-2">Horario Disponible</h5>
                                  <p>
                                    <input 
                                      type="text"
                                      name="horario"
                                      className="t-0 model-tag rounded-4 p-1 mb-3"
                                      style={{borderColor: "var(--tag-color)"}} 
                                      placeholder="Horario"
                                      onChange={handleChangeCreate}
                                      value={createData.horario}
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
                                  value={createData.whatsapp}
                                  required
                                />
                                <input 
                                  type="text"
                                  name="telegram"
                                  className="t-0 model-tag rounded-4 p-1 mb-3"
                                  style={{borderColor: "var(--tag-color)"}} 
                                  placeholder="Telegram (usuario)"
                                  onChange={handleChangeCreate}
                                  value={createData.telegram}
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
                                  value={createData.tarifa}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="d-flex justify-content-center my-5" >
                            <div className="d-flex justify-content-around my-5" style={{width: "60%"}}>
                              {form === 1 ? (
                                <button className="btn general-btn" type="submit">Crear</button>
                              )
                              :
                              (
                                <>
                                  <button className="btn btn-danger" type="button" onClick={()=>{
                                    toggleModal();
                                    setActionText("eliminar al usuario");
                                    setHandleAction(() => handleDeleteModel);
                                  }}>Eliminar</button>
                                  <button className="btn general-btn" type="button" onClick={()=>{
                                    toggleModal();
                                    setActionText("modificar al usuario");
                                    setHandleAction(() => handleSubmitCreate);
                                  }}>Actualizar</button>
                                  <ConfirmActionModal modal={modal} toggleModal={toggleModal} actionText={actionText} handleAction={handleAction}/>
                                </>
                              )
                              
                              }
                              
                            </div>
                          </div>
                        </form>

                        {currentModel && (<>
                        
                          <div 
                          >
                          {
                          currentModel.media.map((item, index) => (
                            <div
                            className="mb-5"
                            key={index}
                            style={{
                              width: "100%",
                              maxWidth: "500px",
                              borderRadius: "5px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "0px",
                              padding: "0px",
                              margin: "auto",
                              marginBottom: "50px",
                              position: "relative"
                            }}
                            >
                              <DeleteMediaButton setError={setError} token={token} media={item} handleGetPerson={handleGetPerson}/>
                            {item.type === "image" ? (
                              <img
                              src={MEDIA_BASE_URL+item.file_path}
                              alt={item.alt || "Foto"}
                              style={{
                                  width: "100%",
                              }}
                              />
                            ) : (
                                <video
                                controls
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "cover",
                                    background: "var(--bg-color)",
                                }}
                                >
                                <source src={MEDIA_BASE_URL+item.file_path} type="video/mp4" />
                                Tu navegador no soporta videos.
                                </video>
                            )
                            }
                            </div>
                          ))}

                            

                            <div className="d-flex flex-column justify-content-center align-items-center" style={{gap:"20px"}}>
                              <input className="btn general-btn" type="file"  onChange={handleFileChange}/>
                              {(selectedFile && !imageError) && (
                                <button className="create-media btn general-btn" type="button" onClick={handleCreateMedia}>
                                  <i className="bi bi-plus" />
                                </button>
                              )}
                              {
                                (imageError) && (
                                  <span className="text-danger">{imageError}</span>
                                )
                              }
                            </div>
                          </div>
                        
                        <div id="servicios" className="container my-5">
                          <h2 className="mb-4">Servicios Ofrecidos</h2>
                            {services?.map((services) => (
                              <div className="d-inline-flex px-2 me-1 rounded-3">{services}</div>
                            ))}
                          <div>
                            <h4 className="mt-3">Métodos de pago</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "métodos de pago")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Métodos de Pago"}/>
                            <h4 className="mt-3">Presenciales</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "presencial")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Presencial"}/>
                            <h4 className="mt-3">Virtuales</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "virtuales")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Virtuales"}/>
                            <h4 className="mt-3">Masajes</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "masajes")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Masajes"}/>
                            <h4 className="mt-3">Oral</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "oral")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Oral"}/>
                            <h4 className="mt-3">Fantasias</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "fantasias")?.list.map((tag) => (
                              <>
                                <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                                <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                              </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Fantasias"}/>
                            <h4 className="mt-3">Adicionales</h4>
                            {subServices.find((subServive) => subServive.name.toLowerCase() === "adicionales")?.list.map((tag) => (
                              <>
                              <div className=" d-inline-flex px-2 me-1 mb-1 rounded-3 model-tag">{tag.valor}</div>
                              <DeleteTagButton  setError={setError} token={token} tag={tag.id} handleGetPerson={handleGetPerson}/>
                            </>
                            ))}
                            <AddTag handleChangeTag={handleChangeTag} newTag={newTag} handleCreateTag={handleCreateTag} tagTipo={"Adicionales"}/>
                          </div>
                          
                        </div>
                        
                        </>)}
                      </>
                    )

                      
                  }{
                    (form === 2 && !currentModel) && (
                      <>
                        <div className="d-flex justify-content-center mb-3" style={{paddingTop: 225, paddingBottom: 225}}>
                          <input className="t-0 model-tag rounded-4 me-2 p-1" 
                          style={{borderColor: "var(--tag-color)"}} 
                          onChange={(e)=>{setModelToSearchId(e.target.value);}} 
                          placeholder="Id de la modelo"
                          />
                          <button className="btn general-btn" onClick={handleGetPerson}>Buscar</button>
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
