import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegúrate de importar Bootstrap

const Services = ({ services, subServices }) => {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Servicios Ofrecidos</h2>
        {services.map((services) => (
          <div className=" d-inline-flex px-2 me-1 bg-dark rounded-3">{services}</div>
        ))}
        {subServices.map((subServices) => (
          <div>
            <h4 className="mt-3">{subServices.name}</h4>
            {subServices.list.map((list) => (
              <div className=" d-inline-flex px-2 me-1 mb-1 bg-dark rounded-3">{list}</div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default Services;
