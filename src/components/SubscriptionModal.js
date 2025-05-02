import { useState } from "react";
import BaseModal from "./BaseModal";
import Spinner from "react-bootstrap/Spinner"; // si usas Bootstrap
import Alert from "react-bootstrap/Alert";
import {getCookie} from "../utils/cookies";

export default function SubscriptionModal({ closeModal, userId }) {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const [subscription, setSubscription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successfulMessage, setSuccessfulMessage] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit() {
        setLoading(true);
        setErrorMessage("");
        setSuccessfulMessage("");
        if (subscription === "") {
            setErrorMessage("Ingresa el tiempo de la suscripcion en meses");
            setLoading(false);
            return;
        }

        const body = {
            months: Number(subscription),
            token: getCookie("token"),
        };

        try {
            const response = await fetch(`${API_BASE_URL}subscriptions/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const json = await response.json();
            console.log(json);
            setSuccessfulMessage("Suscripción agregada correctamente");
        } catch (error) {
            setErrorMessage("Error al agregar la suscripción");
        } finally {
            setLoading(false);
        }
    }

    return (
        <BaseModal closeModal={closeModal}>
            <h2 className="text-center mb-4">Agrega una suscripción a este usuario</h2>

            {loading && (
                <div className="text-center mb-3">
                    <Spinner animation="border" />
                </div>
            )}

            {errorMessage && (
                <Alert variant="danger" className="mb-3 alert-glass-danger">
                    {errorMessage}
                </Alert>
            )}

            {successfulMessage && (
                <Alert variant="success" className="mb-3 alert-glass-success">
                    {successfulMessage}
                </Alert>
            )}

            <form className="w-50">
                <input
                    className="general-input w-100 mb-3"
                    type="number"
                    placeholder="Ingresa los meses de la suscripción"
                    value={subscription}
                    onChange={(e) => setSubscription(e.target.value)}
                />
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn general-btn" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button
                        type="button"
                        className="btn general-btn"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Agregar
                    </button>
                </div>
            </form>
        </BaseModal>
    );
}
