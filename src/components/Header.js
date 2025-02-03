import React from "react";
import { useState, useRef } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Header = () => {

    const [showFavorites, setShowFavorites] = useState(false);
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const buttonRef = useRef(null);
    const favorites = [
        {
            userId: "1",
            userImage: "https://picsum.photos/50/50",
            userName: "name1"
        },
        
        {
            userId: "2",
            userImage: "https://picsum.photos/50/50",
            userName: "name2text"
        },
        
        {
            userId: "2",
            userImage: "https://picsum.photos/50/50",
            userName: "name3texttext"
        },
        
    ]

    const navigate = useNavigate();

    const handleArticleClick = (url) => {
    navigate(`/${url}/`, { state: { url } });
    };
    
    return (
        <header className="py-2">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="navbar-brand fs-1 text-dark" href="/"><img className="me-2 rounded-4" width={50} src="/image.jpg" alt="logo"></img></a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {/* <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" onClick={() => handleArticleClick("feed")}><i className="bi bi-house-fill me-2"></i>Novedades</a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" onClick={() => handleArticleClick("records")}><i className="bi bi-youtube me-2"></i>Videos</a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" href="#calidad-3"><i className="bi bi-camera-video-fill me-2"></i>Videollamadas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" href="#calidad-3"><i className="bi bi-cloud-upload-fill me-2"></i>Publicar</a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" onClick={() => setShowFavorites(!showFavorites)}><i className="bi bi-star-fill me-2">
                            <div style={{ position: "relative", display: "inline-block"}}>

                                {showFavorites && (
                                    <Card
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: "0",
                                        marginTop: "5px",
                                        zIndex: 1000,
                                        padding: "10px",
                                    }}
                                    >
                                    <span className="m-2 ms-3 mb-4">Favoritas</span>
                                    {favorites.map((item)=>(
                                        <div className="d-flex m-2 align-items-center">
                                            <img
                                            src={item.userImage}
                                            className="rounded-circle" 
                                            alt="profile icon"
                                            ></img>
                                            <span className="align-middle mx-3">{item.userName}</span>
                                            <i className="bi bi-whatsapp ms-auto"></i>
                                            <i className="bi bi-trash ms-3"></i>
                                        </div>
                                    ))}
                                    </Card>
                                )}
                            </div>    
                            </i></a>
                        </li> */}
                        {/* <li className="nav-item">
                            <a className="nav-link fs-5 ms-3 text-dark" onClick={() => setShowOptionsMenu(!showOptionsMenu)}><i className="bi bi-three-dots-vertical me-2">
                            <div style={{ position: "relative", display: "inline-block"}}>
                                {showOptionsMenu && (
                                    <Card
                                    style={{
                                        position: "absolute",
                                        top: "100%",
                                        left: "0",
                                        marginTop: "5px",
                                        zIndex: 1000,
                                        padding: "10px",
                                    }}
                                    >
                                    Menu
                                    </Card>
                                )}
                            </div>
                                </i></a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    );
};

export default Header;