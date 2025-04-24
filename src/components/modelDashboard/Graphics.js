import { useEffect, useState } from "react";
import VisitsBarChart from "./VisitsBarChart";
import { getCookie } from "../../utils/cookies";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function Graphics () {

    useEffect(()=>{
        const token = getCookie("token");
        const graphicErrText = "Debes tener una cuenta activa para que los usuarios puedan ver tu perfil y asi acceder a las graficas"
        fetch(`${API_BASE_URL}profile/visits/last-7-days?token=${token}`)
        .then((response) => {
            if (!response.ok) {
              if (response.status === 403) {
                setGraphicErr(graphicErrText);
                throw new Error("Acceso denegado (403). Token inválido o expirado.");
              }
              throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            setViewsLast7Days(data);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));

        fetch(`${API_BASE_URL}profile/visits/last-month?token=${token}`)
        .then((response) => {
            if (!response.ok) {
              if (response.status === 403) {
                setGraphicErr(graphicErrText);
                throw new Error("Acceso denegado (403). Token inválido o expirado.");
              }
              throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            setViewsLastMonth(data);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));

        fetch(`${API_BASE_URL}profile/visits/last-3-months?token=${token}`)
        .then((response) => {
            if (!response.ok) {
              if (response.status === 403) {
                setGraphicErr(graphicErrText);
                throw new Error("Acceso denegado (403). Token inválido o expirado.");
              }
              throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
          })
        .then((data) => {
            setViewsLast3Months(data);
        })
        .catch((error) => console.error("Error al obtener los datos:", error));
    }, []);

    const [viewsLast7Days, setViewsLast7Days] = useState();
    const [viewsLastMonth, setViewsLastMonth] = useState();
    const [viewsLast3Months, setViewsLast3Months] = useState();
    const [graphicErr, setGraphicErr] = useState();
    const [selectedGraphic, setSelectedGraphic] = useState(0);

    return(<>
        {
            graphicErr ? (<>
                {graphicErr}
            </>) : (<>

                <div className="container mb-4">
                    <button className="btn general-btn m-2" onClick={()=>setSelectedGraphic(0)}>Ultimos 7 Días</button>
                    <button className="btn general-btn m-2" onClick={()=>setSelectedGraphic(1)}>Ultimos 30 Días</button>
                    <button className="btn general-btn m-2" onClick={()=>setSelectedGraphic(2)}>Ultimos 3 Meses</button>
                </div>
                
                {selectedGraphic === 0 && (<>{
                    viewsLast7Days ? (<>
                        <VisitsBarChart data={viewsLast7Days} label="Últimos 7 Días" />
                    </>) : (<p>
                        Cargando grafica...
                    </p>)
                }</>)}
                {selectedGraphic === 1 && (<>{
                    viewsLastMonth ? (<>
                        <VisitsBarChart data={viewsLastMonth} label="Últimos 30 Días" />
                    </>) : (<p>
                        Cargando grafica...
                    </p>)
                }</>)}
                {selectedGraphic === 2 && (<>{
                    viewsLast3Months ? (<>
                        <VisitsBarChart data={viewsLast3Months} label="Últimos 3 Meses" />
                    </>) : (<p>
                        Cargando grafica...
                    </p>)
                }</>)}
            </>)
        }
    </>)
}