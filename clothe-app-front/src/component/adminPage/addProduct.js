import React, { useState } from 'react';
import '../../static/css/admin.css'
function AddProductForm() {
    const [productName, setProductName] = useState('');
    const [productColor, setProductColor] = useState('');
    const [productType, setProductType] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [mainImage, setMainImage] = useState('');
    const [galleryImages, setGalleryImages] = useState([]);

    const handleProductImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMainImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleGalleryImagesChange = (event) => {
        const files = event.target.files;
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

    return (
        <div class="add-content-product-container">
        <div className="container content-form-product">
            <h1>Add New Product</h1>
            <form >
            <div class="form-group">
                <label for="productName">Product Name:</label>
                <input type="text" id="productName" name="productName" required/>
            </div>
            <div class="form-group">
                <label for="productColor">Product Color:</label>
                <div class="color-palette">
                    <div class="color" style={{backgroundColor: "#ff0000"}}></div>
                    <div class="color" style={{backgroundColor: "#00ff00"}}></div>
                    <div class="color" style={{backgroundColor: "#0000ff"}}></div>
                    <div class="color" style={{backgroundColorr: "#ffff00"}}></div>
                    <div class="color" style={{backgroundColor: "#ff00ff"}}></div>
                    <div class="color" style={{backgroundColor: "#00ffff"}}></div>
                </div>
            </div>
            <div class="form-group">
                <label for="productType">Product Type:</label>
                <select id="productType" name="productType" required>
                    <option value="type1">Type 1</option>
                    <option value="type2">Type 2</option>
                    <option value="type3">Type 3</option>

                </select>
            </div>
            <div class="form-group">
                <div class="input-group">
                    <div class="input-field">
                        <label for="productPrice">Product Price:</label>
                        <input type="number" id="productPrice" name="productPrice" required/>
                    </div>
                    <div class="input-field">
                        <label for="productQuantity">Product Quantity:</label>
                        <input type="number" id="productQuantity" name="productQuantity" required/>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="productDescription">Product Description:</label>
                <textarea id="productDescription" name="productDescription" rows="4" required></textarea>
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
                <button type="button">Add Product</button>
            </form>
        </div>
        </div>
    );
}

export default AddProductForm;
