import React from "react";
import "./modelDashboard.css";

export default function DashboardSectionSelector({fieldId, onClick, children}){
    return(<button className="section-selector" onClick={()=>{onClick(fieldId);}}>
        {children}
    </button>);
}