import React, { useState, useRef } from "react";
import DistanceSlider from "./DistanceSlider";

const Filters = ({ setFilters, zones}) => {

    const possibleCategory = ["dama", "virtual", "trans", "caballero"];

    const [searchName, setSearchName] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [activeFilter, setActiveFilter] = useState(null);
    const [distance, setDistance] = useState(0);
    const buttonRefs = {
        name: useRef(null),
        zone: useRef(null),
        category: useRef(null),
    };



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

    const handleFilterDistance = (distance) => {
        setDistance(distance);
        setFilters((prevFilters) => ({
            ...prevFilters,
            distance: distance,
        }));
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-start mb-3 ms-3">
                <button
                    ref={buttonRefs.name}
                    className="btn me-2"
                    type="button"
                    style={{ width: "auto" ,
                        backgroundColor: "var(--special-background-color)",
                        color: "var(--special-color)"
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
                        backgroundColor: "var(--special-background-color)",
                        color: "var(--special-color)"
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
                        backgroundColor: "var(--special-background-color)",
                        color: "var(--special-color)"
                     }}
                    onClick={() => handleFilterToggle("category")}
                >
                    Categoría
                </button>

                <DistanceSlider value={distance} onChange={handleFilterDistance} />
            </div>

            {activeFilter === "name" && (
                <div
                    className="position-absolute mt-2 p-1 model-tag border-0 rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("name").top}px`,
                        left: `${getFilterPosition("name").left}px`,
                        width: "auto",
                    }}
                >
                    <input
                        type="text"
                        className="t-0 model-tag rounded-4 p-1 m-2"
                        style={{borderColor: "var(--tag-color)",
                        }}
                        value={searchName}
                        onChange={handleSearchChange}
                    />
                    <div className="m-2">Escribe por lo menos 3 letras</div>
                </div>
            )}

            {activeFilter === "zone" && (
                <div
                    className="position-absolute mt-2 p-3 model-tag rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("zone").top}px`,
                        left: `${getFilterPosition("zone").left}px`,
                    }}
                >
                    <select
                        className="form-select model-tag"
                        style={{borderColor: "var(--tag-color)"}}
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
                    className="position-absolute mt-2 p-3 model-tag rounded shadow"
                    style={{
                        zIndex: 1050,
                        top: `${getFilterPosition("category").top}px`,
                        left: `${getFilterPosition("category").left}px`,
                    }}
                >
                    {possibleCategory.map((category, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input model-tag"
                                style={{borderColor: "var(--tag-color)"}}
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
