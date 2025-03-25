import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function DashboardLogin (){
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const navigate = useNavigate();  
    
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });    
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const fetchData = async ()=>{
            try {
                const response = await fetch(`${API_BASE_URL}me?token=${token}`, {
                    method: "GET",
                });

                if(!response.ok){
                    if (response.status === 401){
                        localStorage.removeItem("token");
                        return;
                    }
                }
                navigate("/dashboard/main");

            } catch (error) {
                console.log(error);
                setError(error.message)
            }
        }
        fetchData();
    }, []);
    const handleChangeLogin = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmitLogin = async (e) => {
        e.preventDefault();
        setError(null);
          
        try {
            const response = await fetch(`${API_BASE_URL}login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(loginData),
            });
    
        if (!response.ok){
            throw new Error("Error al autenticar");
        }
    
        const result = await response.json();
        setError(null);
        localStorage.setItem("token", token);
        setToken(result.token);
        } catch (error) {
            setError(error.message);
        }
    };
    return (<>
    <Header />
        <form className="d-flex justify-content-center my-5" onSubmit={handleSubmitLogin}>
            <div className="d-inline-flex justify-content-center flex-column mb-3" >
                <input
                    type="text"
                    name="email"
                    className="t-0 model-tag rounded-4 p-1 text-center"
                    style={{borderColor: "var(--tag-color)"}} 
                    placeholder="Usuario"
                    value={loginData.email}
                    onChange={handleChangeLogin}
                    required
                /> 
                <br/>
                <input
                    type="password"
                    name="password"
                    className="t-0 model-tag rounded-4 p-1 text-center"
                    style={{borderColor: "var(--tag-color)"}} 
                    placeholder="Contraseña"
                    value={loginData.password}
                    onChange={handleChangeLogin}
                    required
                />
                <br></br>
                <button className="btn general-btn mt-2" type="submit">Ingresar</button>
            </div>
        </form>
    <Footer />
    </>)
}