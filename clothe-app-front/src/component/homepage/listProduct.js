import { React, useState, useEffect } from 'react';
import image1 from "../../static/img/icon/heart.png"
// import image1 from "D:/seatech/ekyc_ui/folder_image_save/48bcfb4d-1ca4-412a-b313-28841e379c27.png"
import compareIcom from "../../static/img/icon/compare.png"
import searchIcon from "../../static/img/icon/search.png"
import { getListProduct } from "../../common/api/product"
import { useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
function ListProduct(props) {
	const {category_id, currentProductDetailId} = props
	console.log(category_id)
    const [productInfo, setProductInfo] = useState()
	const [lastProductId, setLastProductId] = useState("")
	const [isStillHaveProductForLoad, SetIsStillHaveProductForLoad] = useState(true)
	const navigate = useNavigate()

	function getDetail(e){
		// truyền atribute bằng cách dùng data-* của HTML
		//
		var productId = e.target.getAttribute('data-productid')
		navigate(`/product-detail/${productId}`, { replace: true}); {/* :usercode chinhs là param để khi sử dụng useParam có thể lấy ra được(phải đúng tên) trong navigate hoặc Link, ko cần truyền state*/}
	}

	const products = async () => {
		try {
			const productsResponse = await getListProduct(category_id, lastProductId);
			var listProduct = []
			setLastProductId(productsResponse?.data?.last_id)
			if (productsResponse && productsResponse?.data?.list_product.length > 0) {
				productsResponse?.data?.list_product.forEach(product => {
					if (currentProductDetailId && product.id === currentProductDetailId){
						return;
					}
					if (product?.color?.length > 0){
						var list_product_color = []
						product?.color.forEach(color=> {
							list_product_color.push(
							<label  style={{ backgroundColor: color }}>
								<input type="radio"/>
							</label>
							)
							})
					}
					listProduct.push(
					<div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
						<div className="product__item" >
					<div className="product__item__pic set-bg" data-setbg="" ><img className="img_product" data-productid = {product.id} onClick={getDetail} style={{width:"260px", height:"260px"}}  src={product.image[0]} alt="" />
							{/* <div className="product__item__pic set-bg" data-setbg="" ><Link to={`/product-detail/${product.id}`} state={{ "productId": product.id }}><img    src={product.image[0]} alt="" /></Link> */}
								{/* <span className="label">Sale</span> */}
								{/* <ul className="product__hover">
									<li><a href="#"><img src={image1} alt="" /></a></li>
									<li><a href="#"><img src={compareIcom} alt="" /> <span>Compare</span></a></li>
									<li><img src={searchIcon} alt="" /></li>
								</ul> */}
							</div>
							<div className="product__item__text">
								<h6>{product.product_name}</h6>
								<a href="#" className="add-cart">+ Add To Cart</a>
								<div className="rating">
									<i className="fa fa-star-o"></i>
									<i className="fa fa-star-o"></i>
									<i className="fa fa-star-o"></i>
									<i className="fa fa-star-o"></i>
									<i className="fa fa-star-o"></i>
								</div>
								<h5>{product.price}</h5>
								<div className="product__color__select">
								{list_product_color}
								{/* {product?.color.forEach(color=> {
								<label  style={{ backgroundColor: color }} for="">
									<input type="radio"/>
								</label>
								})} */}
						
			
								</div>
							</div>
						</div>
					</div>
					)
				})
				if (lastProductId)
					setProductInfo([...productInfo, ...listProduct])
				else{
					setProductInfo(listProduct)
				}
			}
			else{
				if (productInfo){
					SetIsStillHaveProductForLoad(false)
				}

			}
	

		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		products()
	}, [])
	return (<>
                    <div className="row">            
                 {productInfo}
                    </div>
					{ window.location.href.includes('/product') && isStillHaveProductForLoad === true &&		
					    <div className="row">
						  <div className="col-lg-12">
						  <center><button type="button" className="btn btn-outline-info" onClick={products}><b>Xem thêm sản phẩm</b></button></center>
						  </div>
					  </div>
					}
					  </>
    )}


export default ListProduct