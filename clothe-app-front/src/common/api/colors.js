import {BASE_URL} from "../constant"

async function getListColors(){

    try {
      var url = `${BASE_URL}colors`
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


export {getListColors}