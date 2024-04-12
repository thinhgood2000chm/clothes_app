import { React, useState, useEffect } from 'react';
import image1 from "../../static/img/icon/heart.png"
// import image1 from "D:/seatech/ekyc_ui/folder_image_save/48bcfb4d-1ca4-412a-b313-28841e379c27.png"
import compareIcom from "../../static/img/icon/compare.png"
import searchIcon from "../../static/img/icon/search.png"
import { getListProduct } from "../../common/api/product"

function ListProduct() {
    const [productInfo, setProductInfo] = useState()
	const [lastProductId, setLastProductId] = useState()
	const products = async () => {
		try {
			const productsResponse = await getListProduct();
			var listProduct = []
			if (productsResponse && productsResponse?.data?.list_product.length > 0) {
				productsResponse?.data?.list_product.forEach(product => {
					listProduct.push(
					<div class="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
						<div class="product__item">
							<div class="product__item__pic set-bg" data-setbg="" ><img src={product.image[0]} alt="" />
								{/* <span class="label">Sale</span> */}
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

                    <div class="row">
                 
                 {productInfo}
                    </div>
    )}


export default ListProduct