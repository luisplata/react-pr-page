export default function DashboardDropDown({onClick, value, onChange, placeHolder, itemsToMap}){
    return(
        <select
            className="form-select model-tag m-auto mt-2"
            style={{borderColor: "var(--tag-color)", width:"70%"}}
            onClick={onClick}
            value={value}
            onChange={onChange}
        >
            <option value="">{placeHolder}</option>
            {itemsToMap.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}