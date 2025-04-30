export default function ClientSupport (){
    const ClientSupportNumber = "523333333333"
    const ClientSupportMessage = "Hola%2C%20necesito%20ayuda%20referente%20a%20la%20pagina%20de%20Lobas%20Vip"
    return(
    <div className="d-flex flex-column align-items-center">
        <h2 className="w-75 text-center mb-3">Soporte a cliente</h2>
        <p className="w-75">Si necesitas ayuda para completar algun paso o tienes alguna duda acerca del servicio, no dudes en enviar mensaje al numero
             +52 33 33 33 33 33 o dando <a
                className="general-link"
                href={`https://wa.me/${ClientSupportNumber}?text=${ClientSupportMessage}`}
                target="_blank"
                rel="noopener noreferrer"
            >click aqui.</a></p>
    </div>);
}