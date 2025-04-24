import DashboardSidebar from "../components/modelDashboard/DashboardSidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "../utils/cookies";
import DashboardPersonalData from "../components/modelDashboard/DashboardPersonalData";
import RequestUploadMedia from "../components/modelDashboard/RequestUploadMedia";
import Graphics from "../components/modelDashboard/Graphics";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ModelDashboard (){
    
    const [fieldSelected, setFieldSelected] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const [modelData, setModelData] = useState({});
    useEffect(() => { 
        
            const isLoggedFetch = async ()=>{
                const token = getCookie("token");
                if (token){
                    setIsLogged(true);
                    try {                        
                        const response = await fetch(`${API_BASE_URL}me?token=${token}`);

                        if (!response.ok){
                            if (response.status === 401){
                                console.log("token no valido");
                                deleteCookie("token");
                                window.location.reload();  
                            }
                            throw new Error(`Error: ${response.status}`);
                        }
                        const json = await response.json();
                        
                        setModelData(json);
                        setFieldSelected(1);

                    } catch (error) {
                        console.log(error);                        
                    }

                }
            }

            isLoggedFetch();

        }, []);

    return(<>
        <Header />
        <div className="container-fluid row">
            <DashboardSidebar data={modelData.Persona} setFieldSelected={setFieldSelected}/>
            <div className="col-md-8 mt-4">
                {!isLogged ? (<>Primero debes iniciar sesion</>)
                    : (<>
                        {(fieldSelected === 1) && (<DashboardPersonalData hasDafault={modelData.Persona === undefined} data={modelData.Persona} id={modelData.id}/>)}
                        {fieldSelected === 2 && (<RequestUploadMedia modelName={modelData.Persona.nombre}/>)}
                        {fieldSelected === 3 && (<>
                            <Graphics />                       
                        </>)}
                        {fieldSelected === 4 && (<>Soporte a cliente</>)}
                        {fieldSelected === 5 && (<>Preguntas frecuentes</>)}
                </>)}
            
            </div>
        </div>

        <Footer />
    </>);
}