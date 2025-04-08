export default function DashboardMapCheckBoxes({onClick, showItems, onItemChanged, placeHolder, itemsToMap, selectedItems}){
    return(
        <div className="m-auto mt-2" style={{width:"70%"}}>
            <button className="form-select model-tag w-100 text-start" style={{borderColor: "var(--tag-color)", margin:"auto"}} onClick={onClick}>{placeHolder}</button>
            
            {showItems && (<>
                <div
                    className="position-absolute mt-2 p-3 model-tag rounded shadow"
                >
                    {itemsToMap.map((item, index) => (
                        <div key={index} className="form-check">
                            <input
                                className="form-check-input model-tag"
                                style={{borderColor: "var(--tag-color)"}}
                                type="checkbox"
                                value={item}
                                onChange={
                                    ()=>{onItemChanged((prevSelected) =>
                                        prevSelected.includes(item)
                                            ? prevSelected.filter((s) => s !== item)
                                            : [...prevSelected, item]
                                    );}
                                }
                                checked={selectedItems.includes(item)}
                            />
                            <label className="form-check-label">{item}</label>
                        </div>
                    ))}
                </div>
            </>)}
        </div>
    );
}