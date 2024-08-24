import { React, useState, useEffect } from 'react';
import { getListCategory } from '../../common/api/category';
function ListCategory() {
    const [categories, setCategories] = useState();
    const callApiGetCategory= async () => {
        const result = await getListCategory();
        var listCategory =[]
        if(result && result?.data?.length >= 1){
            result?.data.forEach(category => {
                console.log(category['name'])
                listCategory.push(<li><a href="#">{category['name']}</a></li>)
            });
            
            
        }
        setCategories(listCategory)
    }
    useEffect(()=>{
        callApiGetCategory()
    }, [])

    return(
        <div className="card-body">
            <div className="shop__sidebar__categories">
                <ul className="nice-scroll">
                {categories}
                </ul>
            </div>
        </div>
    )

}
export default ListCategory