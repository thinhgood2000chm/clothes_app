import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../static/img/icon/heart.png"
import '../../static/css/login-register.css'
function Register() {
    return(
        <div class="content-container">
        <div class="register-container">
          <img src="logo.png" alt="Logo" class="logo"/>
          <h2>Đăng kí</h2>
          <form>
            <div class="input-group">
              <label for="fullname">Họ và tên</label>
              <input type="text" id="fullname" name="fullname" required/>
            </div>
            {/* <div class="input-group">
              <label for="email">Email</label>
              <input type="email" id="email" name="email"/>
            </div> */}
            <div class="input-group">
              <label for="phone">Số điện thoại</label>
              <input type="tel" id="phone" name="phone" required/>
            </div>
            <div class="input-group">
              <label for="password">Mật khẩu</label>
              <input type="password" id="password" name="password" required/>
            </div>
            <div class="input-group">
              <label for="password">Nhập lại mật khẩu</label>
              <input type="password" id="password" name="password" required/>
            </div>
            <button type="submit" class="register-btn">Đăng kí</button>
          </form>
          <p>Bạn đã có tài khoản? <a href="#">Login</a></p>
        </div>
      </div>
    )
}

export default Register