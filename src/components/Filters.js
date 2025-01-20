import React, { useState, useRef } from "react";

const Filters = ({ setFilters }) => {
    const [searchName, setSearchName] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const buttonRefs = {
        name: useRef(null),
        zone: useRef(null),
        category: useRef(null),
    };

 
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

    const handleFilterToggle = (filterName) => {
        if (activeFilter === filterName) {
            setActiveFilter(null); 
        } else {
            setActiveFilter(filterName); 
        }
    };

    const getFilterPosition = (filterName) => {
        const button = buttonRefs[filterName].current;
        if (button) {
            const rect = button.getBoundingClientRect();
            return {
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX, 
            };
        }
        return { top: 0, left: 0 };
    };

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-start mb-3 ms-3">
                <button
                    ref={buttonRefs.name}
                    className="btn me-2"
                    type="button"
                    style={{ width: "auto" ,
                        backgroundColor: "rgba(3, 128, 147, 0.4)",
                        color: "rgb(3, 128, 147)"
                    }}
                    onClick={() => handleFilterToggle("name")}
                >
                    Nombre
                </button>

                <button
                    ref={buttonRefs.zone}
                    className="btn me-2"
                    type="button"
                    style={{ width: "auto" ,
                        backgroundColor: "rgba(3, 128, 147, 0.4)",
                        color: "rgb(3, 128, 147)"
                     }}
                    onClick={() => handleFilterToggle("zone")}
                >
                    Zona
                </button>

                <button
                    ref={buttonRefs.category}
                    className="btn me-2"
                    type="button"
                    style={{ width: "auto" ,
                        backgroundColor: "rgba(3, 128, 147, 0.4)",
                        color: "rgb(3, 128, 147)"
                     }}
                    onClick={() => handleFilterToggle("category")}
                >
                    Categoría
                </button>
            </div>

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
