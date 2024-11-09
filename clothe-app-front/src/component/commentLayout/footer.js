import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../static/img/icon/heart.png"
import logo from '../../static/img/logo/logo-color.jpg'

function Footer() {
    return (
        <footer class="footer">
				<div class="container">
					<div class="row">
						<div class="col-lg-4">
							<div class="footer__about">
								<div class="footer__logo">
									<img src={logo} style={{width:"196px", height:"196px"}} alt="" />
								</div>
								<h3 style={{textAlign:"center", color: "white" }} >Xưởng may Thịnh Khoa.</h3>
								<a href="#"><img src="img/payment.png" alt="" /></a>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="footer__widget">
								<h6>Cung cấp sỉ lẻ các loại quần áo</h6>
								<ul style={{display:"inline-block"}}> 
									<li style={{ color: "white" }}>Áo trơn</li>
									<li style={{ color: "white" }}>Áo in sẵn </li>
									<li style={{ color: "white" }}> Đồng phục học sinh, sinh viên</li>
									<li style={{ color: "white" }}>Đồ du lịch</li>
								</ul>
							</div>
						</div>
						<div class="col-lg-4">
							<div class="footer__widget">
								<h6>Liên hệ</h6>
								<ul>
									<li><a href="#">Facebook</a></li>
									<li><a href="#">Zalo</a></li>
								</ul>
							</div>
						</div>
						{/* <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
							<div class="footer__widget">
								<h6>NewLetter</h6>
								<div class="footer__newslatter">
									<p>Be the first to know about new arrivals, look books, sales & promos!</p>
									<form action="#">
										<input type="text" placeholder="Your email" />
										<button type="submit"><span class="icon_mail_alt"></span></button>
									</form>
								</div>
							</div>
						</div> */}
					</div>
					<div class="row">
						<div class="col-lg-12 text-center">
							<div class="footer__copyright__text">
								<p>Copyright ©
									<script>
										document.write(new Date().getFullYear());
									</script>2020
									All rights reserved | This template is made with <i class="fa fa-heart-o"
										aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</footer>
    )
}

export default Footer