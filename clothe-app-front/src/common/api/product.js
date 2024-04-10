import {BASE_URL} from "../constant"

async function getListProduct(last_product_id=""){

    try {
      var url = `${BASE_URL}products`
      console.log(url)
    //   if(last_product_id){
    //     url = `${BASE_URL}products?last_id=${last_product_id}`
    //   }
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
      }
    }


async function getDetailProduct(productId){
    try {

        var url = `${BASE_URL}product/${productId}`
        
        const response = await fetch(url, 
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                }
            }
        )
    
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
        }
    }
    export {getListProduct, getDetailProduct}