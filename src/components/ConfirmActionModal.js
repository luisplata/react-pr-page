const ConfirmActionModal = ({modal, toggleModal, actionText, handleAction}) => {
    return(
        <>
            {modal && (
                <div className="modal2">
                    <div className="overlay"
                    onClick= {toggleModal}
                    ></div>
                    <div className="modal-content model-tag p-4">
                        <p className="text-center mb-5">Estas seguro de que quieres {actionText? actionText : "realizar la accion"}</p>
                        <div className="d-flex justify-content-around">
                            <button type="button" className="btn general-btn" onClick={toggleModal}>Cancelar</button>
                            <button type="button" className="btn general-btn" onClick={handleAction}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
};

export default ConfirmActionModal;