const AddTag = ({handleChangeTag, newTag, handleCreateTag, tagTipo}) => {
    return (
        <div  className="model-tag d-inline-flex px-1 me-1 rounded-3 py-1" style={{marginBottom: "2px"}}> 
            {!tagTipo && (<>
                <input name="tipo" className="input-tag me-1" onChange={handleChangeTag} value={newTag.tipo}/>:            
            </>)}
            <input name="valor" className="input-tag ms-1" onChange={handleChangeTag} value={newTag.valor}/>
            {((newTag.tipo || tagTipo) && newTag.valor) && (
            <button type="button" className="create-tag ms-1" onClick={()=> {handleCreateTag(null, tagTipo)}}><i className="bi bi-plus"></i></button>
            )}
        </div>
    )
}

export default AddTag;