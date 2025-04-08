import React, {useState} from "react";
import BaseModal from "./BaseModal";
import { deleteCookie, getCookie, setCookie } from "../utils/cookies";

export default function LogOutModal ({ closeModal }) {

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const logOut = async ()=>{
        const requestBody = {
            token: getCookie("token"),
        }
        try {
            const response = await fetch(`${API_BASE_URL}logout`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(requestBody),
            });

            if (!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const json = await response.json();
            console.log(json);
            deleteCookie("token");
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return(<>
    <BaseModal closeModal={closeModal}>
        <h2 className="bg-base mb-5">Cessar Sesión</h2>
        <p className="">¿Estas seguro de que quieres cerrar sesión?</p>
        <button className="btn general-btn my-2" onClick={logOut}>Cerrar Sesión</button>
    </BaseModal>
    </>);
}