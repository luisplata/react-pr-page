import React, { useState } from "react";
const MEDIA_BASE_URL = process.env.REACT_APP_MEDIA_BASE_URL;

const Galeria = ({ items }) => {
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState(false);
  const [modalMediaIndex, setModalMediaIndex] = useState(0);
  const nextMedia = (next)=>{
    if(items){
        let newIndex = 0;
        if(next){
            newIndex = modalMediaIndex + 1 < paths.length ? modalMediaIndex + 1: 0;
        }
        else{
            newIndex = modalMediaIndex === 0 ? paths.length - 1: modalMediaIndex - 1;
        }
        setModalMediaIndex(newIndex);
    }
  }

  const toggleModal = ()=> {    
    setModal(!modal);
  }
  const paths = [];
  
  if(items)
  {for(let item of items){
    paths.push({
        type: item.type,
        media: MEDIA_BASE_URL+item.file_path
    });
  }}

  const filteredItems = items?.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  if (modal){
    document.body.classList.add('active-modal')
  }
  else {
    document.body.classList.remove('active-modal')
  }

  return (
    <div style={{ padding: "20px"}}>
      <h2 style={{textAlign: "center"}} className="my-3">Galería</h2>

      <div className="d-flex flex-wrap gap-2 justify-content-center" style={{ marginBottom: "10px", gap: "8px" }}>
        <button
            type="button" class="btn" style={{background: "var(--special-background-color)", color: "var(--special-color)"}}
            onClick={() => setFilter("all")}
        >
            Todos
        </button>
        <button
            type="button" class="btn" style={{background: "var(--special-background-color)", color: "var(--special-color)"}}
            
            onClick={() => setFilter("image")}
        >
            Fotos
        </button>
        <button
            type="button" class="btn" style={{background: "var(--special-background-color)", color: "var(--special-color)"}}
            
            onClick={() => setFilter("video")}
        >
            Videos
        </button>
        </div>

      <div 
        >
        {
        filteredItems?.map((item, index) => (
            <button
            className="mb-5"
            key={index}
            onClick={()=> {

                setModalMediaIndex(index);
                toggleModal();}}
            style={{
                width: "100%",
                maxWidth: "500px",
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0",
                border: "0px",
                padding: "0px",
                margin: "auto",
                marginBottom: "50px",
            }}
            >
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
                }}
                >
                <source src={MEDIA_BASE_URL+item.file_path} type="video/mp4" />
                Tu navegador no soporta videos.
                </video>
            )}
            </button>
        ))}
        </div>
        {modal && (
            <div className="modal1">
            <div className="overlay1"
            onClick= {toggleModal}
            ></div>
            <div className="modal-content1 model-tag">
                <button className="chevronButton fs-1" onClick={()=> nextMedia(false)}><i className="bi bi-chevron-left model-tag"></i></button>
                <div
                style={{height: "100%"}}
                >
                {paths[modalMediaIndex].type === "image" ? (
                    <img
                    style={{
                        height: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                    }}
                src={paths[modalMediaIndex].media} alt="imagen"></img>
                ) : (
                    <video
                    controls
                    style={{
                        height: "100%",
                        maxWidth: "100%",
                        objectFit: "contain",
                    }}
                >
                    <source  src={paths[modalMediaIndex].media} type="video/mp4" />
                </video>
                )}
                </div>
                <button className="chevronButton fs-1" onClick={()=> nextMedia(true)}><i className="bi bi-chevron-right model-tag"></i></button>
            </div>
        </div>
    )}
    </div>
  );
};

export default Galeria;
