import DashboardSidebar from "../components/modelDashboard/DashboardSidebar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "../utils/cookies";
import DashboardPersonalData from "../components/modelDashboard/DashboardPersonalData";
import RequestUploadMedia from "../components/modelDashboard/RequestUploadMedia";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ModelDashboard (){
    
    const [fieldSelected, setFieldSelected] = useState(0);
    const [isLogged, setIsLogged] = useState(false);
    const [modelData, setModelData] = useState({});
    const [modelId, setModelId] = useState(-1)
    useEffect(() => { 
        
            const isLoggedFetch = async ()=>{
                const token = getCookie("token");
                if (token){
                    setIsLogged(true);
                    try {
                        console.log(`${API_BASE_URL}me?${token}`);
                        
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
                        setModelId(json.id)
                        getUserData(json.id);
                        

                    } catch (error) {
                        console.log(error);                        
                    }

                }
            }
            const getUserData = async (modelIdParam)=>{
                try {
                    const response = await fetch(`${API_BASE_URL}people/${modelIdParam}`);

                    if (!response.ok){
                        throw new Error(`Error: ${response.status}`);
                    }

                    const json = await response.json();
                    console.log(json);                    
                    setModelData(json);
                    setFieldSelected(1);
                } catch (error) {
                    console.log(error);  
                }
            }

            isLoggedFetch();

        }, []);

    return(<>
        <Header />
        <div className="container-fluid row">
            <DashboardSidebar setFieldSelected={setFieldSelected}/>
            <div className="col-md-8 mt-4">
                {!isLogged ? (<>Primero debes iniciar sesion</>)
                    : (<>
                        {console.log(modelData)}
                        {(fieldSelected === 1 && modelData.nombre === "John Doe") && (<DashboardPersonalData hasDafault={true} data={modelData}/>)}
                        {(fieldSelected === 1 && modelData.nombre !== "John Doe") && (<DashboardPersonalData hasDafault={false} data={modelData}/>)}
                        {fieldSelected === 2 && (<RequestUploadMedia modelName={modelData.nombre}/>)}
                        {fieldSelected === 3 && (<>Graficas</>)}
                        {fieldSelected === 4 && (<>Soporte a cliente</>)}
                        {fieldSelected === 5 && (<>Preguntas frecuentes</>)}
                </>)}
            
            </div>
        </div>

        <Footer />
    </>);
}