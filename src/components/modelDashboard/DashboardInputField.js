export default function DashboardInputField ({text, placeholder, type, value, onChange, maxLength = 0}) {
    return(
        <div className="d-flex m-auto" style={{width:"70%"}}>
            <p style={{margin:"12px 10px 0px 10px"}}>{text}</p>
            <input 
                className="general-input w-100" 
                placeholder={placeholder} 
                type={type} 
                value={value} 
                onChange={onChange}
                {...(maxLength > 0 ? { maxLength } : {})}
            />
        </div>
    );
}