import React, { useState } from "react";

const Galeria = ({ items }) => {
  const [filter, setFilter] = useState("all"); // Estado para manejar el filtro

  // Filtrar los elementos según el tipo
  const filteredItems = items.filter((item) =>
    filter === "all" ? true : item.type === filter
  );

  return (
    <div id="galeria" style={{ padding: "20px", backgroundColor: "#f9f9f9" }}>
      <h2 className="mb-3">Galería</h2>

      {/* Botones de filtro */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <button
            type="button" class="btn btn-outline-secondary"
            onClick={() => setFilter("all")}
        >
            Todos
        </button>
        <button
            type="button" class="btn btn-outline-secondary"
            onClick={() => setFilter("photo")}
        >
            Fotos
        </button>
        <button
            type="button" class="btn btn-outline-secondary"
            onClick={() => setFilter("video")}
        >
            Videos
        </button>
        </div>

      {/* Grilla de elementos */}
      <div
        style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 200px)", // Ancho fijo de cada columna
            gap: "20px",
            justifyContent: "start", // Centra la grilla si hay pocas columnas
        }}
        >
        {filteredItems.map((item, index) => (
            <div
            key={index}
            style={{
                width: "200px", // Ancho fijo
                height: "200px", // Alto fijo
                overflow: "hidden", // Asegura que los elementos no se desborden
                borderRadius: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f0f0f0", // Fondo de los contenedores
            }}
            >
            {item.type === "photo" ? (
                <img
                src={item.src}
                alt={item.alt || "Foto"}
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover", // Asegura que la imagen se ajuste al contenedor
                }}
                />
            ) : (
                <video
                controls
                style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "cover", // Asegura que el video se ajuste al contenedor
                }}
                >
                <source src={item.src} type="video/mp4" />
                Tu navegador no soporta videos.
                </video>
            )}
            </div>
        ))}
        </div>
    </div>
  );
};

export default Galeria;
