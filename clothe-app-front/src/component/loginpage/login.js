import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../static/img/icon/heart.png"
import '../../static/css/login-register.css'
function Login() {
    return(
        <div class="content-container">
        <div class="login-container">
        <img src="logo.png" alt="Logo" class="logo"/>
        <h2>Login</h2>
        <form>
          <div class="input-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required/>
          </div>
          <div class="input-group">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required/>
          </div>
          <button type="submit" class="login-btn">Login</button>
        </form>
        <p>Don't have an account? <a href="#">Register</a></p>
      </div>
      </div>
    )
}

export default Login