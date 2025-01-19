import React, { useState, useRef } from "react";

const Filters = ({ setFilters }) => {
    const [searchName, setSearchName] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null); // Para manejar qué filtro está abierto
    const buttonRefs = {
        name: useRef(null),
        zone: useRef(null),
        category: useRef(null),
    };

    // Filtros de zonas y categorías
    const zones = ["Zona 1", "Zona 2", "Zona 3"];
    const categories = ["Categoria 1", "Categoria 2", "Categoria 3"];

    const handleSearchChange = (e) => {
        setSearchName(e.target.value);
        setFilters((prev) => ({
            ...prev,
            name: e.target.value,
        }));
    };

    const handleZoneChange = (e) => {
        setSelectedZone(e.target.value);
        setFilters((prev) => ({
            ...prev,
            zone: e.target.value,
        }));
    };

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategories((prev) => {
            const newCategories = prev.includes(value)
                ? prev.filter((cat) => cat !== value)
                : [...prev, value];
            setFilters((prevFilters) => ({
                ...prevFilters,
                categories: newCategories,
            }));
            return newCategories;
        });
    };

    // Maneja la apertura de cada filtro
    const handleFilterToggle = (filterName) => {
        if (activeFilter === filterName) {
            setActiveFilter(null); // Cierra el filtro si ya está abierto
        } else {
            setActiveFilter(filterName); // Abre el filtro seleccionado
        }
    };

    const getFilterPosition = (filterName) => {
        const button = buttonRefs[filterName].current;
        if (button) {
            const rect = button.getBoundingClientRect();
            return {
                top: rect.bottom + window.scrollY, // Posiciona debajo del botón
                left: rect.left + window.scrollX,  // Alinea al lado izquierdo del botón
            };
        }
        return { top: 0, left: 0 };
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-start mb-3 ms-3">
                {/* Filtro por nombre */}
                <button
                    ref={buttonRefs.name}
                    className="btn btn-outline-primary"
                    style={{ width: "auto" }}
                    onClick={() => handleFilterToggle("name")}
                >
                    Filtro por Nombre
                </button>

                {/* Filtro por zona */}
                <button
                    ref={buttonRefs.zone}
                    className="btn btn-outline-primary ms-2"
                    style={{ width: "auto" }}
                    onClick={() => handleFilterToggle("zone")}
                >
                    Filtro por Zona
                </button>

                {/* Filtro por categoría */}
                <button
                    ref={buttonRefs.category}
                    className="btn btn-outline-primary ms-2"
                    style={{ width: "auto" }}
                    onClick={() => handleFilterToggle("category")}
                >
                    Filtro por Categoría
                </button>
            </div>

            {/* Filtro por nombre flotante */}
            {activeFilter === "name" && (
                <div
                    className="position-absolute mt-2 p-3 bg-white border rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("name").top}px`,
                        left: `${getFilterPosition("name").left}px`,
                        width: "auto",
                    }}
                >
                    <input
                        type="text"
                        className="form-control"
                        value={searchName}
                        onChange={handleSearchChange}
                        placeholder="Escribe el nombre del artículo"
                    />
                </div>
            )}

            {/* Filtro por zona flotante */}
            {activeFilter === "zone" && (
                <div
                    className="position-absolute mt-2 p-3 bg-white border rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("zone").top}px`,
                        left: `${getFilterPosition("zone").left}px`,
                    }}
                >
                    <select
                        className="form-select"
                        value={selectedZone}
                        onChange={handleZoneChange}
                    >
                        <option value="">Todas las zonas</option>
                        {zones.map((zone, index) => (
                            <option key={index} value={zone}>
                                {zone}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Filtro por categoría flotante */}
            {activeFilter === "category" && (
                <div
                    className="position-absolute mt-2 p-3 bg-white border rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("category").top}px`,
                        left: `${getFilterPosition("category").left}px`,
                    }}
                >
                    {categories.map((category, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value={category}
                                onChange={handleCategoryChange}
                                checked={selectedCategories.includes(category)}
                            />
                            <label className="form-check-label">{category}</label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Filters;
