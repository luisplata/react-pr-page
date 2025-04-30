import React, { useState } from "react";
import BaseModal from "./BaseModal";
import { setCookie } from "../utils/cookies";

export default function LoginModal({ closeModal }) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [logged, setLogged] = useState(false);

    const logIn = async () => {
        setSuccessfulMessage("");
        setErrorMessage("");
        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const statusMessage =
                    response.status === 401
                        ? "Correo o contraseña incorrectos"
                        : "Hubo un error al iniciar sesión";
                setErrorMessage(statusMessage);
                setLoading(false);
                return;
            }

            const json = await response.json();
            setSuccessfulMessage("Has iniciado sesión correctamente.");
            setCookie("token", json.token);
            setLogged(true);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            setErrorMessage("No se pudo conectar con el servidor.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <BaseModal closeModal={closeModal}>
            <h2 className="mb-4">Iniciar Sesión</h2>

            {!logged && (
                <form className="d-flex flex-column align-items-center w-75 px-4">
                    <input
                        className="form-control mb-3"
                        placeholder="Correo electrónico"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="btn btn-primary w-100"
                        type="button"
                        disabled={loading}
                        onClick={logIn}
                    >
                        {loading ? "Ingresando..." : "Entrar"}
                    </button>
                </form>
            )}

            {errorMessage && (
                <p className="text-danger mt-3 text-center">{errorMessage}</p>
            )}
            {successfulMessage && (
                <p className="text-success mt-3 text-center">{successfulMessage}</p>
            )}
        </BaseModal>
    );
}
