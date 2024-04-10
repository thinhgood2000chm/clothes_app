import React from 'react';
// import '../../assets/css/'
import { CCarousel, CImage, CCarouselItem } from '@coreui/react';

import Carousel from 'react-bootstrap/Carousel';
import '../../static/css/elegant-icons.css'
import '../../static/css/font-awesome.min.css'
import '../../static/css/magnific-popup.css'
import '../../static/css/nice-select.css'
import '../../static/css/slicknav.min.css'
import '../../static/css/style.css'
import image1 from "../../static/img/icon/heart.png"
// import image1 from "D:/seatech/ekyc_ui/folder_image_save/48bcfb4d-1ca4-412a-b313-28841e379c27.png"
import compareIcom from "../../static/img/icon/compare.png"
import searchIcon from "../../static/img/icon/search.png"
import product from "../../static/img/product/product-3.jpg"
import banner1 from "../../static/img/banner/banner-1.jpg"
import banner2 from "../../static/img/banner/banner-2.jpg"
import banner3 from "../../static/img/banner/banner-3.jpg"
import hero1 from "../../static/img/hero/hero-1.jpg"
import hero2 from "../../static/img/hero/hero-2.jpg"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getListProduct } from "../../common/api/product"
import { useEffect } from 'react';
function Home() {

	const [productInfo, setProductInfo] = useState()
	const [lastProductId, setLastProductId] = useState()
	const products = async () => {
		try {
			const productsResponse = await getListProduct();
			console.log("123123", productsResponse)
			var listProduct = []
			if (productsResponse && productsResponse?.data?.list_product.length > 0) {
				productsResponse?.data?.list_product.forEach(product => {
					listProduct.push(
					<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
						<div class="product__item">
							<div class="product__item__pic set-bg" data-setbg="" ><img src={product.image[0]} alt="" />
								<span class="label">Sale</span>
								<ul class="product__hover">
									<li><a href="#"><img src={image1} alt="" /></a></li>
									<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
									<li><a href="#"><img src={searchIcon} alt="" /></a></li>
								</ul>
							</div>
							<div class="product__item__text">
								<h6>{product.product_name}</h6>
								<a href="#" class="add-cart">+ Add To Cart</a>
								<div class="rating">
									<i class="fa fa-star-o"></i>
									<i class="fa fa-star-o"></i>
									<i class="fa fa-star-o"></i>
									<i class="fa fa-star-o"></i>
									<i class="fa fa-star-o"></i>
								</div>
								<h5>{product.price}</h5>
								<div class="product__color__select">
								{product?.color.forEach(color=> {
								<label  style={{ "backgroundColor": {color} }} for="">
									<input type="radio"/>
								</label>
								})}
						
								
									{/* <label class="active black" for="pc-20">
										<input type="radio" id="pc-20" />
									</label>
									<label style={{ "backgroundColor": "#C0392B" }} for="pc-21">
										<input type="radio" id="pc-21" />
									</label> */}
								</div>
							</div>
						</div>
					</div>
					)
				})
			}
			console.log("sadfdf")
			setProductInfo(listProduct)


		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		products()
	}, [])
	return (
		<div>

			{/* <div id="preloder">
        <div class="loader"></div>
    </div> */}

			{/* <div class="offcanvas-menu-overlay"></div>
			<div class="offcanvas-menu-wrapper">
				<div class="offcanvas__option">
					<div class="offcanvas__links">
						<a href="#">Sign in</a>
						<a href="#">FAQs</a>
					</div>
					<div class="offcanvas__top__hover">
						<span>Usd <i class="arrow_carrot-down"></i></span>
						<ul>
							<li>USD</li>
							<li>EUR</li>
							<li>USD</li>
						</ul>
					</div>
				</div>
				<div class="offcanvas__nav__option">
					<a href="#" class="search-switch"><img src="img/icon/search.png" alt="" /></a>
					<a href="#"><img src="img/icon/heart.png" alt="" /></a>
					<a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
					<div class="price">$0.00</div>
				</div>
				<div id="mobile-menu-wrap"></div>
				<div class="offcanvas__text">
					<p>Free shipping, 30-day return or refund guarantee.</p>
				</div>
			</div>

			<header class="header">
				<div class="header__top">
					<div class="container">
						<div class="row">
							<div class="col-lg-6 col-md-7">
								<div class="header__top__left">
									<p>Free shipping, 30-day return or refund guarantee.</p>
								</div>
							</div>
							<div class="col-lg-6 col-md-5">
								<div class="header__top__right">
									<div class="header__top__links">
										<a href="#">Sign in</a>
										<a href="#">FAQs</a>
									</div>
									<div class="header__top__hover">
										<span>Usd <i class="arrow_carrot-down"></i></span>
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
				<div class="container">
					<div class="row">
						<div class="col-lg-3 col-md-3">
							<div class="header__logo">
								<a href="./index.html"><img src="img/logo.png" alt="" /></a>
							</div>
						</div>
						<div class="col-lg-6 col-md-6">
							<nav class="header__menu mobile-menu">
								<ul>
									<li class="active"><a href="./index.html">Home</a></li>
									<li class="active"><Link to='/product' >Shop</Link></li>
									<li><a href="#">Pages</a>
										<ul class="dropdown">
											<li><a href="./about.html">About Us</a></li>
											<li><a href="./shop-details.html">Shop Details</a></li>
											<li><a href="./shopping-cart.html">Shopping Cart</a></li>
											<li><a href="./checkout.html">Check Out</a></li>
											<li><a href="./blog-details.html">Blog Details</a></li>
										</ul>
									</li>
									<li><a href="./blog.html">Blog</a></li>
									<li><a href="./contact.html">Contacts</a></li>
								</ul>
							</nav>
						</div>
						<div class="col-lg-3 col-md-3">
							<div class="header__nav__option">
								<a href="#" class="search-switch"><img src="img/icon/search.png" alt="" /></a>
								<a href="#"><img src={image1} alt="" /></a>
								<a href="#"><img src="img/icon/cart.png" alt="" /> <span>0</span></a>
								<div class="price">$0.00</div>
							</div>
						</div>
					</div>
					<div class="canvas__open"><i class="fa fa-bars"></i></div>
				</div>
			</header> */}
			<div className='container'>


				<Carousel>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={hero1}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h5>First slide label</h5>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={hero2}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h5>First slide label</h5>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>

				</Carousel>

			</div>


			{/* <div className="hero__social">
                                    <a href="#"><i className="fa fa-facebook"></i></a>
                                    <a href="#"><i className="fa fa-twitter"></i></a>
                                    <a href="#"><i className="fa fa-pinterest"></i></a>
                                    <a href="#"><i className="fa fa-instagram"></i></a>
                                </div> */}

			<div class="banner spad">
				<div class="container">
					<div class="row">
						<div class="col-lg-7 offset-lg-4">
							<div class="banner__item">
								<div class="banner__item__pic">
									<img src={banner1} alt="" />
								</div>
								<div class="banner__item__text">
									<h2>Clothing Collections 2030</h2>
									<a href="#">Shop now</a>
								</div>
							</div>
						</div>
						<div class="col-lg-5">
							<div class="banner__item banner__item--middle">
								<div class="banner__item__pic">
									<img src={banner2} alt="" />
								</div>
								<div class="banner__item__text">
									<h2>Accessories</h2>
									<a href="#">Shop now</a>
								</div>
							</div>
						</div>
						<div class="col-lg-7">
							<div class="banner__item banner__item--last">
								<div class="banner__item__pic">
									<img src={banner3} walt="" />
								</div>
								<div class="banner__item__text">
									<h2>Shoes Spring 2030</h2>
									<a href="#">Shop now</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<section class="product spad">
				<div class="container">
					<div class="row">
						<div class="col-lg-12">
							<ul class="filter__controls">
								<li class="active" data-filter="*">Best Sellers</li>
								<li data-filter=".new-arrivals">New Arrivals</li>
								<li data-filter=".hot-sales">Hot Sales</li>
							</ul>
						</div>
					</div>
					<div class="row product__filter">
						{productInfo}
						///////////////////////////
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div class="product__item sale">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>Multi-pocket Chest Bag</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$43.48</h5>
									<div class="product__color__select">
										<label for="pc-7">
											<input type="radio" id="pc-7" />
										</label>
										<label class="active black" for="pc-8">
											<input type="radio" id="pc-8" />
										</label>
										<label class="grey" for="pc-9">
											<input type="radio" id="pc-9" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div class="product__item">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>Diagonal Textured Cap</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$60.9</h5>
									<div class="product__color__select">
										<label for="pc-10">
											<input type="radio" id="pc-10" />
										</label>
										<label class="active black" for="pc-11">
											<input type="radio" id="pc-11" />
										</label>
										<label class="grey" for="pc-12">
											<input type="radio" id="pc-12" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div class="product__item">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>Lether Backpack</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$31.37</h5>
									<div class="product__color__select">
										<label for="pc-13">
											<input type="radio" id="pc-13" />
										</label>
										<label class="active black" for="pc-14">
											<input type="radio" id="pc-14" />
										</label>
										<label class="grey" for="pc-15">
											<input type="radio" id="pc-15" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div class="product__item sale">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>Ankle Boots</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$98.49</h5>
									<div class="product__color__select">
										<label for="pc-16">
											<input type="radio" id="pc-16" />
										</label>
										<label class="active black" for="pc-17">
											<input type="radio" id="pc-17" />
										</label>
										<label class="grey" for="pc-18">
											<input type="radio" id="pc-18" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
							<div class="product__item">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>T-shirt Contrast Pocket</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$49.66fffff</h5>
									<div class="product__color__select">
										<label for="">
											<input type="radio"/>
										</label>
										<label class="active black" for="">
											<input type="radio" />
										</label>
										{/* sẽ sử dụng cách này để hiênt thị màu */}
										<label style={{ "backgroundColor": "#C0392B" }} for="">
											<input type="radio" />
										</label>
									</div>
								</div>
							</div>
						</div>
						<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix hot-sales">
							<div class="product__item">
								<div class="product__item__pic set-bg" data-setbg={product} ><img src={product} alt="" />
									<span class="label">Sale</span>
									<ul class="product__hover">
										<li><a href="#"><img src={image1} alt="" /></a></li>
										<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
										<li><a href="#"><img src={searchIcon} alt="" /></a></li>
									</ul>
								</div>
								<div class="product__item__text">
									<h6>Basic Flowing Scarf</h6>
									<a href="#" class="add-cart">+ Add To Cart</a>
									<div class="rating">
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
										<i class="fa fa-star-o"></i>
									</div>
									<h5>$26.28</h5>
									<div class="product__color__select">
										<label for="pc-22">
											<input type="radio" id="pc-22" />
										</label>
										<label class="active black" for="pc-23">
											<input type="radio" id="pc-23" />
										</label>
										<label class="grey" for="pc-24">
											<input type="radio" id="pc-24" />
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<footer class="footer">
				<div class="container">
					<div class="row">
						<div class="col-lg-3 col-md-6 col-sm-6">
							<div class="footer__about">
								<div class="footer__logo">
									<a href="#"><img src="img/footer-logo.png" alt="" /></a>
								</div>
								<p>The customer is at the heart of our unique business model, which includes design.</p>
								<a href="#"><img src="img/payment.png" alt="" /></a>
							</div>
						</div>
						<div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
							<div class="footer__widget">
								<h6>Shopping</h6>
								<ul>
									<li><a href="#">Clothing Store</a></li>
									<li><a href="#">Trending Shoes</a></li>
									<li><a href="#">Accessories</a></li>
									<li><a href="#">Sale</a></li>
								</ul>
							</div>
						</div>
						<div class="col-lg-2 col-md-3 col-sm-6">
							<div class="footer__widget">
								<h6>Shopping</h6>
								<ul>
									<li><a href="#">Contact Us</a></li>
									<li><a href="#">Payment Methods</a></li>
									<li><a href="#">Delivary</a></li>
									<li><a href="#">Return & Exchanges</a></li>
								</ul>
							</div>
						</div>
						<div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
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
						</div>
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

			<div class="search-model">
				<div class="h-100 d-flex align-items-center justify-content-center">
					<div class="search-close-switch">+</div>
					<form class="search-model-form">
						<input type="text" id="search-input" placeholder="Search here....." />
					</form>
				</div>
			</div>
		</div>
	)
}

export default Home