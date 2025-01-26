import React from "react";

const Header = () => {
    return (
        <header className="py-2">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="navbar-brand fs-1" href="/"><i className="bi bi-heart me-2"></i></a>
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
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="/feed"><i className="bi bi-house-fill me-2"></i>Novedades</a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="/records"><i className="bi bi-youtube me-2"></i>Videos</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="#calidad-3"><i className="bi bi-camera-video-fill me-2"></i>Videollamadas</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="#calidad-3"><i className="bi bi-cloud-upload-fill me-2"></i>Publicar</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="#calidad-3"><i className="bi bi-star-fill me-2"></i></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link fs-5 ms-3" href="#calidad-3"><i className="bi bi-three-dots-vertical me-2"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    );
};

export default Header;