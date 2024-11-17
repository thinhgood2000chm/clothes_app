import React, { useEffect, useState } from 'react';
import {useParams, useNavigate } from 'react-router-dom';
import '../../static/css/admin.css'
import { createProduct } from '../../common/api/product';
import { getListCategory } from '../../common/api/category';
import { getListColors } from '../../common/api/colors';
import {getCookieToken} from '../../common/function'
import PopupCustom from '../commentLayout/popupCustom'
import Popup from 'reactjs-popup';
function AddProductForm() {
    const [productName, setProductName] = useState('');
    const [productColor, setProductColor] = useState([]);
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [mainImageUpload, setMainImageUpload] = useState()
    const [galleryImages, setGalleryImages] = useState([]);
    const [subImageUpload, setSubImagesUpload] = useState([]);
    const [sizeInputs, setsizeInputs] = useState([""]);
    const [categories, setCategories] = useState();
    const [colorsState, setColorsState] = useState();

    const token = getCookieToken()
    const { close } = useParams()
    const [showmodelSuccess, setShowmodelSuccess] = useState()
    const [message, setMessage] = useState()


    const addNewProduct = async (productData) => {

        // {toast && <PopupCustom message={toast} onClose={() => setToast(null)} />}
        // <PopupCustom && PopupCustom showStatus={true}/>
        // <PopupCustom message={"1231232"}/>
 
        const result = await createProduct(token, productData)
        if(result){
            setShowmodelSuccess(true)
            setMessage(result?.data?.message)
        }
    }
    const getAllColors = async () => {
        var allColors = await getListColors()
        if (allColors && allColors?.data?.length > 0) {
            var listColorOption = []
            setProductType(allColors?.data[0].id)
            allColors?.data.forEach((color, index) => {
                var idColor = `c${index}`
                var colorBackground = color?.color_code
                listColorOption.push(
                    <div className="color" id={idColor} style={{ backgroundColor: colorBackground }} data-color={color.color_code} onMouseDown={setColors}></div>
                )

            })

        }
        setColorsState(listColorOption)
    }
    const getAllCategory = async () => {
        var allCategory = await getListCategory()
        if (allCategory && allCategory?.data?.length > 0) {
            var listCategoriesOption = []
            setProductType(allCategory?.data[0].id)
            allCategory?.data.forEach(category => {
                listCategoriesOption.push(
                    <option value={category.id}>{category.name}</option>
                )

            })

        }
        setCategories(listCategoriesOption)

    }
    const handleProductImageChange = (event) => {
        const file = event.target.files[0];
        setMainImageUpload(file)
        const reader = new FileReader();
        reader.onload = () => {
            setMainImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGalleryImagesChange = (event) => {
        const files = event.target.files;
        setSubImagesUpload(Array.from(files))
        const images = [];
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            reader.onload = () => {
                images.push(reader.result);
                if (images.length === files.length) {
                    setGalleryImages(images);
                }
            };
            reader.readAsDataURL(file);
        }
    };


    function setValueProductName(event) {
        var prodName = event.target.value
        setProductName(prodName)
    }
    function setValueProductDescription(event) {
        var prodDes = event.target.value
        setProductDescription(prodDes)
    }
    function setValueProductPrice(event) {
        var prodprice = event.target.value
        setProductPrice(prodprice)
    }
    function setValueProductQuantity(event) {
        var prodprice = event.target.value
        setProductQuantity(prodprice)
    }

    function setValueProductCategory(event) {
        var prodCate = event.target.value
        setProductType(prodCate)
    }


    function setColors(event) {
        var colors = productColor
        var prodColor = event.target.getAttribute('data-color')
        var colorId = event.target.getAttribute('id')
        var chosenColor = document.getElementById(colorId)
        if (chosenColor.style.border) {
            chosenColor.style.border = null
            var index = colors.indexOf(prodColor);
            colors.splice(index, 1);
        } else {
            colors.push(prodColor)
            setProductColor(colors)
            chosenColor.style.border = "2px solid black"

        }
    }
    function addNewProd() {
        var formData = new FormData();
        formData.append('product_name', productName);
        formData.append('quantity', productQuantity);
        formData.append('price', productPrice);
        formData.append('category', productType);
        formData.append('description', productDescription);
        formData.append('main_image_upload', mainImageUpload);

        if (subImageUpload?.length > 0) {
            subImageUpload.forEach((image, index) => {
                formData.append(`list_image_upload`, image);
            });
        }
        if (productColor?.length > 0) {
            productColor.forEach((color, index) => {
                formData.append(`list_color_code`, color);
            });
        }
        if (sizeInputs?.length > 0) {
            sizeInputs.forEach((size, index) => {
                formData.append(`list_size`, size);
            });
        }

        // formData.append('video_upload', postVideo);
        // setOnLoading(true)
        // callApiCreateNewPost(formData)
        addNewProduct(formData)
    }
    const addNewInputTextSize = () => {
        setsizeInputs([...sizeInputs, ""]);
    };

    useEffect(() => {
        getAllCategory()
        getAllColors()
    }, [])
    return (
        
         
    
        <div className="add-content-product-container">
               {showmodelSuccess && <PopupCustom setShowmodelSuccess={setShowmodelSuccess} showStatus={true} message={message}/>}
            <div className="container content-form-product">
                <h1>Add New Product</h1>
                <form >
                    <div className="form-group">
                        <label for="productName">Product Name:</label>
                        <input type="text" id="productName" name="productName" onChange={setValueProductName} required />
                    </div>
                    <div className="form-group">
                        <label for="productColor">Product Color:</label>
                        <div className="color-palette">
                            {colorsState}
                            {/* <div className="color" id = "c1"style={{backgroundColor: "#ff0000"}} data-color="#ff0000" onMouseDown={setColors}></div>
                    <div className="color " id = "c2" style={{backgroundColor: "#FFA500"}} data-color="#FFA500" onMouseDown={setColors}></div>
                    <div className="color " id = "c3" style={{backgroundColor: "#0000ff"}} data-color="#0000ff"  onMouseDown={setColors}></div>
                    <div className="color " id = "c4" style={{backgroundColorr: "#ffff00"}} data-color="#ffff00"  onMouseDown={setColors}></div>
                    <div className="color " id = "c5" style={{backgroundColor: "#ff00ff"}} data-color="#ff00ff"  onMouseDown={setColors}></div>
                    <div className="color " id = "c6" style={{backgroundColor: "#00ffff"}} data-color="#00ffff"  onMouseDown={setColors}></div> */}
                        </div>
                    </div>
                    <div id="inputContainer">
                        {sizeInputs.map((input, index) => (
                            <input key={index} type="text" value={input} className='inputContent'
                                onChange={(event) => {
                                    // Update the value of the corresponding input in the state array
                                    const newsizeInputs = [...sizeInputs];
                                    newsizeInputs[index] = event.target.value;
                                    setsizeInputs(newsizeInputs);
                                }}
                            />
                        ))}
                    </div>
                    <div className="btn btn-success addNewSize" onClick={addNewInputTextSize}> Thêm kích thước</div>
                    <div className="form-group">
                        <label for="productType">Product Type:</label>
                        <select id="productType" name="productType" value={productType} onChange={setValueProductCategory} required>
                            {categories}
                            {/* <option value="1">Type 1</option>
                    <option value="2">Type 2</option>
                    <option value="3">Type 3</option> */}

                        </select>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-field">
                                <label for="productPrice">Product Price:</label>
                                <input type="number" id="productPrice" name="productPrice" onChange={setValueProductPrice} required />
                            </div>
                            <div className="input-field">
                                <label for="productQuantity">Product Quantity:</label>
                                <input type="number" id="productQuantity" name="productQuantity" onChange={setValueProductQuantity} required />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="productDescription">Product Description:</label>
                        <textarea id="productDescription" name="productDescription" onChange={setValueProductDescription} rows="4" required></textarea>
                    </div>
                    {/* Add other form fields similarly */}
                    <div className="form-group">
                        <label htmlFor="productImage">Main Image:</label>
                        <input type="file" id="productImage" name="productImage" accept="image/*" onChange={handleProductImageChange} required />
                        {mainImage && <img src={mainImage} alt="Main Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />}
                    </div>
                    <div className="form-group">
                        <label htmlFor="productGallery">Gallery Images (up to 3 images):</label>
                        <input type="file" id="productGallery" name="productGallery[]" accept="image/*" multiple onChange={handleGalleryImagesChange} />
                        {galleryImages.map((image, index) => (
                            <img key={index} src={image} alt={`Gallery Preview ${index + 1}`} style={{ maxWidth: '200px', marginTop: '10px', marginRight: '10px' }} />
                        ))}
                    </div>
      
                    <button type="button" onClick={addNewProd}>Add Product</button>
                </form>
            </div>
        </div>
    );
}

export default AddProductForm;
