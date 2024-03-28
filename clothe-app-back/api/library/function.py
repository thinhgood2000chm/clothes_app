import base64

async def convert_image_to_base64(url_image):
    with open(url_image, "rb") as f:
        encoded_image = base64.b64encode(f.read())
    return encoded_image