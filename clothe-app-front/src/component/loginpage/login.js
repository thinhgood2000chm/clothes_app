import {React, useState } from 'react';
import image1 from "../../static/img/icon/heart.png"
import '../../static/css/login-register.css'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {setCookieToken} from "../../common/function"
import { loginPage } from "../../common/api/login"

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
      setValue(e.target.value);
  }
  return {
      value,
      onChange: handleChange
  }
}



function Login() {
  const [username, setUsername]= useState('');
  const password = useFormInput('');
  const [errMessage, setErrMsg] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';


  const callApiGetToken = async (e) => {
    e.preventDefault();
    var requestBody = {
      "username": username,
      "password": password.value
    }
    console.log(requestBody)

    try{
      const result = await loginPage(requestBody)
      console.log(result)
      if(result?.data?.access_token){
        let expires = new Date()
        expires.setTime(expires.getTime() + (60 * 60 * 4 * 1000))

        setCookieToken(result.data.access_token, expires);
        navigate(redirectPath, { replace: true });
      }
      else{
        if (result.detail.code)
          console.log(result.detail.message)
          setErrMsg(result.detail.message);
      }
  
    }catch(err){
          setErrMsg('Đã xảy ra lỗi. Thử lại sau!');
    }
  
  }
    return(
        <div class="content-container">
        <div class="login-container">
        <img src="logo.png" alt="Logo" class="logo"/>
        <h2>Login</h2>
        <form onSubmit={callApiGetToken}>
          <div class="input-group">
            <label for="username">Username</label>
            <input type='text'
                  name='username'
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete='off'
                  placeholder='Tài khoản'
                  required
              />
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type='password'
                    name='password' {...password}
                    placeholder='Mật khẩu'
                    id="password" 
                    required
                />
          </div>
          <button type="submit" class="login-btn">Login</button>
        </form>
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
      </div>
    )
}

export default Login