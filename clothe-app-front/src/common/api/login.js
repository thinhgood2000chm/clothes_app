import {BASE_URL} from "../constant"
async function loginPage(authenBody){
    try {
    
        var url = `${BASE_URL}get-token`
        const response = await fetch(url, 
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body:  JSON.stringify(authenBody)
            }
        )
        const data = await response.json();
        return data;
        } catch (error) {
        console.error('Error fetching data:', error.message);
        throw error;
        }
    }

    export {loginPage}
