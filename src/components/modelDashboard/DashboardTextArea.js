export default function DashboardTextArea ({text, placeholder, value, onChange}){
    return(
        <div className="d-flex m-auto" style={{width:"70%"}}>
            <p style={{margin:"12px 10px 0px 10px"}}>{text}</p>
            <textarea className="general-input w-100" 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange}
                rows="1"
                style={{ resize: "none", overflow: "hidden" }}
                onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                maxLength={500}
            />
        </div>
    )
    
}