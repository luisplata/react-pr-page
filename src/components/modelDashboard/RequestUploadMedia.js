import { useEffect } from "react"

export default function RequestUploadMedia ({modelName}) {
    useEffect(()=>{

    }, [])

    return(
    <div className="d-flex flex-column align-items-center">
        <h2 className="w-75 text-center mb-3">Solicitar subida de multimedia</h2>
        <p className="w-75">Para subir tus fotos y que puedan ser visibles, debes enviar un correo al administrador de la pagina con la o las imagenes anexadas,
            luego de esto pasaran por un proceso de verificacion y recibiras una respuesta dentro de unos dias y se subiran automaticamente.</p>
        <p className="w-75">
            Puedes enviar tus fotos al correo correo@admin.ejemplo o dando <a
                className="general-link"
                href={`mailto:correo@admin.ejemplo?subject=Subida%20de%20multimedia%20para%20${modelName ? modelName : ""}
                    &body=Hola%2C%20quisiera%20que%20verificaran%20y%20subieran%20las%20fotos%20que%20estoy%20anexando%20en%20este%20correo%2C%20bonito%20dia`}
            >click aqui.</a>
        </p>
    </div>)
}