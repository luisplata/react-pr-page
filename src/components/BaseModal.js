import React from "react";
import "./Modal.css"

export default function BaseModal ({ closeModal, children }) {
    return (
        <div className="base-modal">
          <div className="base-overlay" onClick={closeModal}></div>
          <div className="base-modal-content d-flex flex-column align-items-center">{children}</div>
        </div>
    );
}

