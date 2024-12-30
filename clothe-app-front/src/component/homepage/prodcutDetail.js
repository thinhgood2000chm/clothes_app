import '../../static/css/elegant-icons.css'
import '../../static/css/font-awesome.min.css'
import '../../static/css/magnific-popup.css'
import '../../static/css/nice-select.css'
import '../../static/css/slicknav.min.css'
import '../../static/css/style.css'
import { Link, useParams } from 'react-router-dom';
import { getDetailProduct } from '../../common/api/product'
import { useEffect, useState } from 'react'
import ListProduct from './listProduct.js'
function ProductDetail() {

    const [images, setImages] = useState()
    const [mainImg, setMainImage] = useState()
    const { productId } = useParams()/* :usercode chinhs là param để khi sử dụng useParam có thể lấy ra được(phải đúng tên) trong navigate hoặc Link, ko cần truyền state*/
    const [productInfo, setProductInfo] = useState()
    const [description, setDescription] = useState()
    const [material, setMaterial] = useState()
    const [category_id, setCategory] = useState()
    const [currentProductDetailId, setCurrentProductDetailId] = useState() // này dùng để truyền qua bên listproduct để xóa đi product hiện tại đang hiển thị, ko hiển thị lên sản phẩm liên quan
    const changeImage = (e) => {
        var source = e.target.getAttribute("src")
        setMainImage(source)
    }

    const callApiGetDetailPoduct = async () => {
        const result = await getDetailProduct(productId);
        if (result && result?.data) {
            setDescription(result?.data?.description)
            setMaterial(result?.data?.material)
            setCategory(result?.data.category)
            setCurrentProductDetailId(result?.data.id)
            var list_image = []
            if (result?.data?.image.length > 0) {
                setMainImage(result?.data?.image[0])
                result?.data?.image.forEach(img => {
                    list_image.push(
                        <li class="nav-item">
                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                                <div class="product__thumb__pic set-bg" data-setbg={img}>
                                    <img onClick={changeImage} style={{ width: "80px", height: "110px", backgroundColor: '#ffffff' }} src={img} alt="" />
                                </div>
                            </a>
                        </li>
                    )
                });

            }
            setImages(list_image)

             // gắn kính thước
            if (result?.data?.size?.length > 0){
                var list_size = []
                {result?.data?.size.forEach((size) => {
                    list_size.push(
                    <label for={size}>{size}
                        <input type="radio" id={size} />
                    </label>
                    )
                })}
                
            }

            // gắn màu sắc
            if (result?.data?.color?.length > 0){
                var list_colors = []
                result?.data?.color.forEach((color, index) => {
                    var name_sp = `sp-${index}`
                    list_colors.push(
                    // <label class="c-1" for="sp-1"> {/* class này dùng để hiển thị màu bằng css nên ko cần dùng */}
                      <label style={{ background: color }} for={name_sp}>
                        <input type="radio" id="sp-1"/>
                    </label>
                    )
                })
                
            }

            if (result?.data) {
                console.table(result.data.size)
                setProductInfo(<div class="product__details__text">
                    <h4>{result.data.product_name}</h4>
                    {/* <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                        <span> - 5 Reviews</span>
                    </div> */}
                     {/* <h3>{result.data.price} VND<span>70.00</span></h3>  70.00 la code giam gia*/} 
                    <h3>{result.data.price} VND<span>70.00</span></h3>
                    {/* <p>Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable
                        cuff tabs, adjustable asymmetric hem with elastic side tabs and a front zip fastening
                        with placket.</p> */}
                    <div class="product__details__option">
                        <div class="product__details__option__size">
                            <span>Size:</span>
                            {list_size}
                        </div>
                        <div class="product__details__option__color">
                            <span>Color:</span>
                            {list_colors}
                        </div>
                    </div>
                    {/*phần số lượng và kích nút thêm vào giỏ hg*/}
                    {/* <div class="product__details__cart__option">
                        <div class="quantity">
                            <div class="pro-qty">
                                <input type="text" value="1" />
                            </div>
                        </div>
                        <a href="#" class="primary-btn">add to cart</a>
                    </div> */}

                    {/* <div class="product__details__btns__option">
            <a href="#"><i class="fa fa-heart"></i> add to wishlist</a>
            <a href="#"><i class="fa fa-exchange"></i> Add To Compare</a>
        </div> */}
                    {/* <div class="product__details__last__option">
            <h5><span>Guaranteed Safe Checkout</span></h5>
            <img src="img/shop-details/details-payment.png" alt=""/>
            <ul>
                <li><span>SKU:</span> 3812912</li>
                <li><span>Categories:</span> Clothes</li>
                <li><span>Tag:</span> Clothes, Skin, Body</li>
            </ul>
        </div> */}
                </div>
                )


            }
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        callApiGetDetailPoduct()
    }, [])
    return (
        <div>
            <section class="shop-details">
                <div class="product__details__pic">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__breadcrumb">
                                    <Link to='/'>Trang chủ</Link>
                                    <Link to="/product">sản phâmr</Link>
                                    <span>Product Details</span>
                                </div>
                            </div>
                        </div>
                        <div class="row row_detail_product">
                            <div class="col-lg-3 col-md-3">
                                <ul class="nav nav-tabs" role="tablist">
                                    {images}
                                    {/* <li class="nav-item">
                                <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                                    <div class="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-4.png">
                                        <i class="fa fa-play"></i>
                                    </div>
                                </a>
                            </li> */}
                                </ul>
                            </div>
                            <div class="col-lg-6 col-md-9">
                                <div class="tab-content">
                                    <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                        <div class="product__details__pic__item">
                                            <img class='product__details__pic__item' src={mainImg} alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product__details__content">
                    <div class="container">
                        <div class="row d-flex justify-content-center">
                            <div class="col-lg-8">
                                {productInfo}
                                
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="product__details__tab">
                                    <ul class="nav nav-tabs" role="tablist">
                                        <li class="nav-item">
                                            <a class="nav-link active" data-toggle="tab" href="#tabs-5"
                                                role="tab">Description</a>
                                        </li>
                                        {/* <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-6" role="tab">Customer
                                    Previews(5)</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" data-toggle="tab" href="#tabs-7" role="tab">Additional
                                    information</a>
                                </li> */}
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane active" id="tabs-5" role="tabpanel">
                                            <div class="product__details__tab__content">
                                                {/* <p class="note">Nam tempus turpis at metus scelerisque placerat nulla deumantos
                                            solicitud felis. Pellentesque diam dolor, elementum etos lobortis des mollis
                                            ut risus. Sedcus faucibus an sullamcorper mattis drostique des commodo
                                        pharetras loremos.</p> */}
                                                <div class="product__details__tab__content__item">
                                                    <h5>Products Infomation</h5>
                                                    {description}
                                                    {/* <p>A Pocket PC is a handheld computer, which features many of the same
                                                        capabilities as a modern PC. These handy little devices allow
                                                        individuals to retrieve and store e-mail messages, create a contact
                                                        file, coordinate appointments, surf the internet, exchange text messages
                                                        and more. Every product that is labeled as a Pocket PC must be
                                                        accompanied with specific software to operate the unit and must feature
                                                        a touchscreen and touchpad.</p>
                                                    <p>As is the case with any new technology product, the cost of a Pocket PC
                                                        was substantial during it’s early release. For approximately $700.00,
                                                        consumers could purchase one of top-of-the-line Pocket PCs in 2003.
                                                        These days, customers are finding that prices have become much more
                                                        reasonable now that the newness is wearing off. For approximately
                                                        $350.00, a new Pocket PC can now be purchased.</p> */}
                                                </div>
                                                <div class="product__details__tab__content__item">
                                                    <h5>Material used</h5>
                                                    <p>{material}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="related spad">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3 class="related-title">Related Product</h3>
                        </div>
                    </div>
                    { category_id && currentProductDetailId && 
                        <ListProduct category_id = {category_id} currentProductDetailId = {currentProductDetailId}/>
                    }
                </div>
            </section>
        </div>
    )
}
export default ProductDetail