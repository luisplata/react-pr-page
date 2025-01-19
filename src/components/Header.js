import React from "react";

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">Bellse</a>
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
                            <a className="nav-link" href="#calidad-1">Calidad 1</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#calidad-2">Calidad 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#calidad-3">Calidad 3</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;