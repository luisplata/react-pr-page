import React, { useState } from "react";
import BaseModal from "./BaseModal";

export default function SignUpModal ({ closeModal }) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMesage] = useState("");
    const [registered, setRegistered] = useState(false);

    const trySingUp = ()=>{  
        setSuccessfulMesage("");      
        if(name.length < 3){
            setErrorMessage("El nombre debe ser mayor a 3 caracteres");
            return;
        }
        if(!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)){
            setErrorMessage("Ingresa un correo valido");
            return;
        }
        if(password.length < 6){
            setErrorMessage("La contraseña debe contener al menos 6 caracteres");
            return;
        }
        if(password !== confirmPassword){
            setErrorMessage("Las contraseñas no coinciden");
            return;
        }
        setErrorMessage("");
        signUp();
    }

    const signUp = async ()=>{
        const requestBody = {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        }
        try {
            const response = await fetch(`${API_BASE_URL}register`, {
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
            setSuccessfulMesage("Te has registrado correctamente \nAhora puedes ingresar con tus credenciales");
            setRegistered(true);

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(<>
    <BaseModal closeModal={closeModal}>
        <h2 className="bg-base">Registrarse</h2>
        {!registered && (
            <form className="d-flex flex-column align-items-center">
                <input className="general-input" placeholder="Name" type="text" value={name} onChange={(e)=>{setName(e.target.value);}}/>
                <input className="general-input" placeholder="Email" type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <input className="general-input" placeholder="Password" type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                <input className="general-input" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
                <button className="btn general-btn my-2" type="button" onClick={trySingUp}>Registrarse</button>
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