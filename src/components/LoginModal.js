import React, {useState} from "react";
import BaseModal from "./BaseModal";
import { setCookie } from "../utils/cookies";

export default function LoginModal ({ closeModal }) {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMesage] = useState("");
    const [logged, setLogged] = useState(false);

    const logIn = async ()=>{
        setSuccessfulMesage("");   
        setErrorMessage("");
        const requestBody = {
            email: email,
            password: password,
        }
        try {
            const response = await fetch(`${API_BASE_URL}login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestBody),
            });

            if (!response.ok){
                setErrorMessage(response.status);
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            setSuccessfulMesage("Has iniciado sesion correctamente");
            setLogged(true);
            setCookie("token", json.token);
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(<>
    <BaseModal closeModal={closeModal}>
        <h2 className="bg-base">Iniciar Sesión</h2>
        {!logged && (
            <form className="d-flex flex-column align-items-center">
                <input className="general-input" placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className="general-input" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className="btn general-btn my-2" type="button" onClick={logIn}>Entrar</button>
            </form>
        )}
        
        {errorMessage && (
            <p style={{ whiteSpace: "pre-line", textAlign:"center"}} className="text-danger">{errorMessage}</p>
        )}
        {successfulMessage && (
            <p style={{ whiteSpace: "pre-line", textAlign:"center"}} className="text-success mt-3">{successfulMessage}</p>
        )}
    </BaseModal>
    </>);
}