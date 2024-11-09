import { React, useState, useEffect } from 'react';
import { getListColors } from '../../common/api/colors';
function ListColors() {
    const [colors, setColors] = useState();
    const callApiGetColor= async () => {
        const result = await getListColors();
        var listColor =[]
        if(result && result?.data?.length >= 1){
            result?.data.forEach(color => {
                var backgroundColor = color?.color_code
                listColor.push(      
                <label style={{ backgroundColor: backgroundColor }} data-color={color.color_code}>
                    <input type="radio"/>
                </label>
                )
            });
            
            
        }
        setColors(listColor)
    }
    useEffect(()=>{
        callApiGetColor()
    }, [])
    // <div class="color" id={idColor} style={{ backgroundColor: colorBackground }} data-color={color.color_code} onMouseDown={setColors}></div>
    return(
        <div className="card-body">
        <div className="shop__sidebar__color">
          {colors}
        </div>
    </div>
    )

}
export default ListColors