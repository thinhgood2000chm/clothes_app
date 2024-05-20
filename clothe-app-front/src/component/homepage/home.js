import React from 'react';
// import '../../assets/css/'
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
import banner4 from "../../static/img/banner/banner-4.jpg"
import banner5 from "../../static/img/banner/banner-5.jpg"
import banner6 from "../../static/img/banner/banner-6.jpg"
import hero1 from "../../static/img/hero/hero-1.jpg"
import hero2 from "../../static/img/hero/hero-2.jpg"
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getListProduct } from "../../common/api/product"
import ListProduct from "./listProduct.js"
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
									<img src={banner4} alt="" style={{width:"440px", height:"440px"}}/>
								</div>
								<div class="banner__item__text">
									<h2>Mẫu áo Phú Quốc</h2>
									<a href="#">Đặt ngay</a>
								</div>
							</div>
						</div>
						<div class="col-lg-5">
							<div class="banner__item banner__item--middle">
								<div class="banner__item__pic">
								<img src={banner5} alt="" style={{width:"440px", height:"440px"}}/>
								</div>
								<div class="banner__item__text">
									<h2>Mẫu áo Nha Trang</h2>
									<a href="#">Đặt ngay</a>
								</div>
							</div>
						</div>
						<div class="col-lg-7">
							<div class="banner__item banner__item--last">
								<div class="banner__item__pic">
									<img src={banner6} alt="" style={{width:"440px", height:"440px"}}/>
								</div>
								<div class="banner__item__text">
									<h2>Mẫu áo hot</h2>
									<a href="#">Đặt ngay</a>
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
								<li class="active" data-filter="*">Bán chạy nhất</li>
								<li data-filter=".new-arrivals">Hàng mới</li>
								<li data-filter=".hot-sales">Sản phẩm giảm giá</li>
							</ul>
						</div>
					</div>
					<div class="row product__filter">
						{<ListProduct/>}
					
					</div>
				</div>
			</section>
			

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