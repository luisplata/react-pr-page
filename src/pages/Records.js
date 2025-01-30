import React, { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Modal } from "react-bootstrap";

const records = [
    {
        userName:"User1",
        userIcon:"https://picsum.photos/50/50",
        userPhone:"3333333333",
        record:"https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
        recordPreview:"https://picsum.photos/50/50"
    },
    {
        userName:"User2",
        userIcon:"https://picsum.photos/50/50",
        userPhone:"3333333333",
        record:"https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
        recordPreview:"https://picsum.photos/50/50"
    },
    {
        userName:"User3",
        userIcon:"https://picsum.photos/50/50",
        userPhone:"3333333333",
        record:"https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4",
        recordPreview:"https://picsum.photos/50/50"
    },
]



const Records = () =>{
    
const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

return (
    <div>
        <Header></Header>
            <div
            className="container"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 250px)",
                gap: "1px",
                justifyContent: "start",
            }}>
                {records.map((item)=>(
                    <div>
      {/* Imagen de vista previa */}
      <img
        src= {item.recordPreview}
        alt="Vista previa del video"
        style={{ width: "100%", cursor: "pointer", borderRadius: "10px" }}
        onClick={handleShow}
      />

      {/* Modal para video a pantalla completa */}
      <Modal 
        show={show} 
        onHide={() => setShow(false)} 
        dialogClassName="custom-modal"
        centered
        size="lg"
        >
            
        <Modal.Body className="d-flex align-items-center justify-content-center bg-dark flex-column">
            <video src={item.record} controls autoPlay style={{ maxWidth: "100%", maxHeight: "100%" }} />
        </Modal.Body>
        </Modal>
    </div>
                ))}
            </div>
        <Footer></Footer>
    </div>
)
}

export default Records;