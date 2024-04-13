import {React, useState } from 'react';
import { Link } from 'react-router-dom';
import image1 from "../../static/img/icon/heart.png"

function Header() {
    const [activeclassName, setActivateclassName] = useState("offcanvas-menu-wrapper")
    function clickOpenCanvasHeader(){
        if(activeclassName === "offcanvas-menu-wrapper"){
            setActivateclassName("offcanvas-menu-wrapper active")
        }
        else{
            setActivateclassName("offcanvas-menu-wrapper")
        }

    }
    return (
        <>
            {/* <div className="offcanvas-menu-overlay active"></div> */}
            <div className={activeclassName}>
                <div className="offcanvas__option">
                    <div className="offcanvas__links">
                        <a href="#">Sign in</a>
                        <a href="#">FAQs</a>
                    </div>
                    <div className="offcanvas__top__hover">
                        <span>Usd <i className="arrow_carrot-down"></i></span>
                        <ul>
                            <li>USD</li>
                            <li>EUR</li>
                            <li>USD</li>
                        </ul>
                    </div>
                </div>
                <div className="offcanvas__nav__option">
                    {/* <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a> */}
                    {/* <a href="#"><img src="img/icon/heart.png" alt="" /></a> */}
                    {/* <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a> */}
                    {/* <div className="price">$0.00</div> */}
                </div>
                {/* <div id="mobile-menu-wrap"> */}
                <div>
                    <nav className="header__menu mobile-menu">
                        <ul>
                            <li><Link to='/' >Home</Link></li>
                            <li><Link to='/product' >Shop</Link></li>
                            <li><a href="#">Pages</a>
                                <ul className="dropdown">
                                    <li><a href="./about.html">About Us</a></li>
                                    <li><a href="./shop-details.html">Shop Details</a></li>
                                    <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                    <li><a href="./checkout.html">Check Out</a></li>
                                    <li><a href="./blog-details.html">Blog Details</a></li>
                                </ul>
                            </li>
                            <li><Link to='/blog'>Blog</Link></li>
                            <li><Link to='/contacts'>Contacts</Link></li>
                        </ul>
                    </nav>
                </div>
                <div className="offcanvas__text">
                    <p>Free shipping, 30-day return or refund guarantee.</p>
                </div>
            </div>

            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-7">
                                <div className="header__top__left">
                                    <p>Free shipping, 30-day return or refund guarantee.</p>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-5">
                                <div className="header__top__right">
                                    <div className="header__top__links">
                                        <a href="#">Sign in</a>
                                        <a href="#">FAQs</a>
                                    </div>
                                    <div className="header__top__hover">
                                        <span>Usd <i className="arrow_carrot-down"></i></span>
                                        <ul>
                                            <li>USD</li>
                                            <li>EUR</li>
                                            <li>USD</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-3">
                            <div className="header__logo">
                                <a href="./index.html"><img src="img/logo.png" alt="" /></a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <nav className="header__menu">
                                <ul>
                                    <li><Link to='/' >Home</Link></li>
                                    <li><Link to='/product' >Shop</Link></li>
                                    <li><a href="#">Pages</a>
                                        <ul className="dropdown">
                                            <li><a href="./about.html">About Us</a></li>
                                            <li><a href="./shop-details.html">Shop Details</a></li>
                                            <li><a href="./shopping-cart.html">Shopping Cart</a></li>
                                            <li><a href="./checkout.html">Check Out</a></li>
                                            <li><a href="./blog-details.html">Blog Details</a></li>
                                        </ul>
                                    </li>
                                    <li><Link to='/blog' >Blog</Link></li>
                                    <li><Link to='/contacts' >Contacts</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="header__nav__option">
                                {/* <a href="#" className="search-switch"><img src="img/icon/search.png" alt="" /></a> */}
                                {/* <a href="#"><img src={image1} alt="" /></a> */}
                                {/* <a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
                                <div className="price">$0.00</div> */}
                            </div>
                        </div>
                    </div>
                    <div className="canvas__open" onClick={clickOpenCanvasHeader}><i className="fa fa-bars"></i></div>
                </div>
            </header>
        </>
    )
}
export default Header
