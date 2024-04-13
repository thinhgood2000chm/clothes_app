import '../../static/css/elegant-icons.css'
import '../../static/css/font-awesome.min.css'
import '../../static/css/magnific-popup.css'
import '../../static/css/nice-select.css'
import '../../static/css/slicknav.min.css'
import '../../static/css/style.css'

import Accordion from 'react-bootstrap/Accordion'
import ListProduct from "./listProduct.js"
import { Link } from 'react-router-dom';
import React, { useEffect, useState, useContext } from "react";
function Product(props) {
    return (
        <div>
            <section className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__text">
                                <h4>Shop</h4>
                                <div className="breadcrumb__links">
                                    <a href="./index.html">Home</a>
                                    <span>Shop</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="shop spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="shop__sidebar">
                                <div className="shop__sidebar__search">
                                    <form action="#">
                                        <input type="text" placeholder="Search..." />
                                        <button type="submit"><span className="icon_search"></span></button>
                                    </form>
                                </div>
                                <div className="shop__sidebar__accordion">
                                    <div className="accordion" id="accordionExample">
                                        <Accordion defaultActiveKey={["0",  "1", "2","3"]} alwaysOpen>
                                            <Accordion.Item eventKey="0">

                                                <div className="card">
                                                    {/* <div className="card-heading">
              
                                         <a data-toggle="collapse" data-target="#collapseOne">Categories</a> 
                                    </div> */}
                                                    <Accordion.Header><strong>Categories</strong></Accordion.Header>
                                                    <Accordion.Body>
                                                        <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                                            <div className="card-body">
                                                                <div className="shop__sidebar__categories">
                                                                    <ul className="nice-scroll">
                                                                        <li><a href="#">Men (20)</a></li>
                                                                        <li><a href="#">Women (20)</a></li>
                                                                        <li><a href="#">Bags (20)</a></li>
                                                                        <li><a href="#">Clothing (20)</a></li>
                                                                        <li><a href="#">Shoes (20)</a></li>
                                                                        <li><a href="#">Accessories (20)</a></li>
                                                                        <li><a href="#">Kids (20)</a></li>
                                                                        <li><a href="#">Kids (20)</a></li>
                                                                        <li><a href="#">Kids (20)</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </div>

                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <div className="card">
                                                    {/* <div className="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                    </div> */}
                                                    <Accordion.Header><strong>Price</strong></Accordion.Header>
                                                    <Accordion.Body>
                                                        <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                                                            <div className="card-body">
                                                                <div className="shop__sidebar__price">
                                                                    <ul>
                                                                        <li><a href="#">$0.00 - $50.00</a></li>
                                                                        <li><a href="#">$50.00 - $100.00</a></li>
                                                                        <li><a href="#">$100.00 - $150.00</a></li>
                                                                        <li><a href="#">$150.00 - $200.00</a></li>
                                                                        <li><a href="#">$200.00 - $250.00</a></li>
                                                                        <li><a href="#">250.00+</a></li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </div>

                                            </Accordion.Item>

                                            <Accordion.Item eventKey="2">
                                                <div className="card">
                                                    <Accordion.Header><strong>Size</strong></Accordion.Header>
                                                    {/* <div className="card-heading">
                                                <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                                            </div> */}
                                                    <Accordion.Body>
                                                    <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                                        <div className="card-body">
                                                            <div className="shop__sidebar__size">
                                                                <label for="xs">xs
                                                                    <input type="radio" id="xs" />
                                                                </label>
                                                                <label for="sm">s
                                                                    <input type="radio" id="sm" />
                                                                </label>
                                                                <label for="md">m
                                                                    <input type="radio" id="md" />
                                                                </label>
                                                                <label for="xl">xl
                                                                    <input type="radio" id="xl" />
                                                                </label>
                                                                <label for="2xl">2xl
                                                                    <input type="radio" id="2xl" />
                                                                </label>
                                                                <label for="xxl">xxl
                                                                    <input type="radio" id="xxl" />
                                                                </label>
                                                                <label for="3xl">3xl
                                                                    <input type="radio" id="3xl" />
                                                                </label>
                                                                <label for="4xl">4xl
                                                                    <input type="radio" id="4xl" />
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Accordion.Body>
                                            </div>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                        <div className="card">
                                        {/* <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                                        </div> */}
                                        <Accordion.Header><strong>Colors</strong></Accordion.Header>
                                        <Accordion.Body>
                                        <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shop__sidebar__color">
                                                    <label className="c-1" for="sp-1">
                                                        <input type="radio" id="sp-1" />
                                                    </label>
                                                    <label className="c-2" for="sp-2">
                                                        <input type="radio" id="sp-2" />
                                                    </label>
                                                    <label className="c-3" for="sp-3">
                                                        <input type="radio" id="sp-3" />
                                                    </label>
                                                    <label className="c-4" for="sp-4">
                                                        <input type="radio" id="sp-4" />
                                                    </label>
                                                    <label className="c-5" for="sp-5">
                                                        <input type="radio" id="sp-5" />
                                                    </label>
                                                    <label className="c-6" for="sp-6">
                                                        <input type="radio" id="sp-6" />
                                                    </label>
                                                    <label className="c-7" for="sp-7">
                                                        <input type="radio" id="sp-7" />
                                                    </label>
                                                    <label className="c-8" for="sp-8">
                                                        <input type="radio" id="sp-8" />
                                                    </label>
                                                    <label className="c-9" for="sp-9">
                                                        <input type="radio" id="sp-9" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        </Accordion.Body>
                                    </div>
                                        </Accordion.Item>
                                       
                                    </Accordion>
                                    {/* <div className="card">
                                    <div className="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                                    </div>
                                    <div id="collapseOne" className="collapse show" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="shop__sidebar__categories">
                                                <ul className="nice-scroll">
                                                    <li><a href="#">Men (20)</a></li>
                                                    <li><a href="#">Women (20)</a></li>
                                                    <li><a href="#">Bags (20)</a></li>
                                                    <li><a href="#">Clothing (20)</a></li>
                                                    <li><a href="#">Shoes (20)</a></li>
                                                    <li><a href="#">Accessories (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    {/* <div className="card">
                                    <div className="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
                                    </div>
                                    <div id="collapseTwo" className="collapse show" data-parent="#accordionExample">
                                        <div className="card-body">
                                            <div className="shop__sidebar__brand">
                                                <ul>
                                                    <li><a href="#">Louis Vuitton</a></li>
                                                    <li><a href="#">Chanel</a></li>
                                                    <li><a href="#">Hermes</a></li>
                                                    <li><a href="#">Gucci</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                    {/* <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                        </div>
                                        <div id="collapseThree" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shop__sidebar__price">
                                                    <ul>
                                                        <li><a href="#">$0.00 - $50.00</a></li>
                                                        <li><a href="#">$50.00 - $100.00</a></li>
                                                        <li><a href="#">$100.00 - $150.00</a></li>
                                                        <li><a href="#">$150.00 - $200.00</a></li>
                                                        <li><a href="#">$200.00 - $250.00</a></li>
                                                        <li><a href="#">250.00+</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                                        </div>
                                        <div id="collapseFour" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shop__sidebar__size">
                                                    <label for="xs">xs
                                                        <input type="radio" id="xs" />
                                                    </label>
                                                    <label for="sm">s
                                                        <input type="radio" id="sm" />
                                                    </label>
                                                    <label for="md">m
                                                        <input type="radio" id="md" />
                                                    </label>
                                                    <label for="xl">xl
                                                        <input type="radio" id="xl" />
                                                    </label>
                                                    <label for="2xl">2xl
                                                        <input type="radio" id="2xl" />
                                                    </label>
                                                    <label for="xxl">xxl
                                                        <input type="radio" id="xxl" />
                                                    </label>
                                                    <label for="3xl">3xl
                                                        <input type="radio" id="3xl" />
                                                    </label>
                                                    <label for="4xl">4xl
                                                        <input type="radio" id="4xl" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                                        </div>
                                        <div id="collapseFive" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shop__sidebar__color">
                                                    <label className="c-1" for="sp-1">
                                                        <input type="radio" id="sp-1" />
                                                    </label>
                                                    <label className="c-2" for="sp-2">
                                                        <input type="radio" id="sp-2" />
                                                    </label>
                                                    <label className="c-3" for="sp-3">
                                                        <input type="radio" id="sp-3" />
                                                    </label>
                                                    <label className="c-4" for="sp-4">
                                                        <input type="radio" id="sp-4" />
                                                    </label>
                                                    <label className="c-5" for="sp-5">
                                                        <input type="radio" id="sp-5" />
                                                    </label>
                                                    <label className="c-6" for="sp-6">
                                                        <input type="radio" id="sp-6" />
                                                    </label>
                                                    <label className="c-7" for="sp-7">
                                                        <input type="radio" id="sp-7" />
                                                    </label>
                                                    <label className="c-8" for="sp-8">
                                                        <input type="radio" id="sp-8" />
                                                    </label>
                                                    <label className="c-9" for="sp-9">
                                                        <input type="radio" id="sp-9" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <div className="card">
                                        <div className="card-heading">
                                            <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
                                        </div>
                                        <div id="collapseSix" className="collapse show" data-parent="#accordionExample">
                                            <div className="card-body">
                                                <div className="shop__sidebar__tags">
                                                    <a href="#">Product</a>
                                                    <a href="#">Bags</a>
                                                    <a href="#">Shoes</a>
                                                    <a href="#">Fashio</a>
                                                    <a href="#">Clothing</a>
                                                    <a href="#">Hats</a>
                                                    <a href="#">Accessories</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="shop__product__option">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__product__option__left">
                                        <p>Showing 1–12 of 126 results</p>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <div className="shop__product__option__right">
                                        <p>Sort by Price:</p>
                                        <select>
                                            <option value="">Low To High</option>
                                            <option value="">$0 - $55</option>
                                            <option value="">$55 - $100</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {<ListProduct />}
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="product__pagination">
                                    <a className="active" href="#">1</a>
                                    <a href="#">2</a>
                                    <a href="#">3</a>
                                    <span>...</span>
                                    <a href="#">21</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
            </section >

            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="footer__about">
                                <div className="footer__logo">
                                    <a href="#"><img src="img/footer-logo.png" alt="" /></a>
                                </div>
                                <p>The customer is at the heart of our unique business model, which includes design.</p>
                                <a href="#"><img src="img/payment.png" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><a href="#">Clothing Store</a></li>
                                    <li><a href="#">Trending Shoes</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">Sale</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-6">
                            <div className="footer__widget">
                                <h6>Shopping</h6>
                                <ul>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Payment Methods</a></li>
                                    <li><a href="#">Delivary</a></li>
                                    <li><a href="#">Return & Exchanges</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                <h6>NewLetter</h6>
                                <div className="footer__newslatter">
                                    <p>Be the first to know about new arrivals, look books, sales & promos!</p>
                                    <form action="#">
                                        <input type="text" placeholder="Your email" />
                                        <button type="submit"><span className="icon_mail_alt"></span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="footer__copyright__text">

                                <p>Copyright ©
                                    <script>
                                        document.write(new Date().getFullYear());
                                    </script>2020
                                    All rights reserved | This template is made with <i className="fa fa-heart-o"
                                        aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            <div className="search-model">
                <div className="h-100 d-flex align-items-center justify-content-center">
                    <div className="search-close-switch">+</div>
                    <form className="search-model-form">
                        <input type="text" id="search-input" placeholder="Search here....." />
                    </form>
                </div>
            </div>

        </div >
    )
}
export default Product