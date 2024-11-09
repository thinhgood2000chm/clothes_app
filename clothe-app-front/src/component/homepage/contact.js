import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../static/img/icon/heart.png"

function Contact() {
    return (<section class="contact spad">
    <div class="container">
        <div class="row">
        <div class="map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d643.3355603272457!2d106.60961754966023!3d10.792162709536207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDQ3JzMyLjIiTiAxMDbCsDM2JzM1LjUiRQ!5e1!3m2!1svi!2s!4v1716044369566!5m2!1svi!2s" width="600" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>        </div>
            <div class="col-lg-6 col-md-6">
                <div class="contact__text">
                    <div class="section-title">
                        <span>Thông tin</span>
                        <h2>Liên hệ</h2>
                        {/* <p>As you might expect of a company that began as a high-end interiors contractor, we pay
                            strict attention.</p> */}
                    </div>
                    <ul>
                        <li>
                            <h4>Xưởng may Thịnh Khoa</h4>
                            <p>Địa chỉ: 17/6q, đường Ấp Chiến Lược, Bình Hưng Hoà A, Bình Tân, Thành phố Hồ Chí Minh, Việt Nam</p>
                            <p>Số điện thoại: 0936526145</p>
                        </li>
                        {/* <li>
                            <h4>France</h4>
                            <p>109 Avenue Léon, 63 Clermont-Ferrand <br />+12 345-423-9893</p>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
            <span>Thông tin</span>
                <div class="contact__form">   
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-6">
                                <input type="text" placeholder="Name"/>
                            </div>
                            <div class="col-lg-6">
                                <input type="text" placeholder="Email"/>
                            </div>
                            <div class="col-lg-12">
                                <textarea placeholder="Message"></textarea>
                                <button type="submit" class="site-btn">Send Message</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </section>
    )
}

export default Contact