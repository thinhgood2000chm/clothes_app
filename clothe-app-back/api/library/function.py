import base64
import logging
import os
import uuid
from io import BytesIO

from PIL import Image
from setting import init_project
from pathlib import Path
logger = logging.getLogger("function.py")

async def convert_image_to_base64(url_image):
    with open(url_image, "rb") as f:
        encoded_image = base64.b64encode(f.read())
    return encoded_image


async def save_image(product_id, list_image):
    root_path = init_project.config_system["PATH_SAVE_IMAGE"]
    try:
        if root_path:
            folder_path = f'{root_path}/{product_id}/'
            path = Path(f'{folder_path}')
            if not path.exists():
                os.makedirs(folder_path)
            image_in_folder = os.listdir(folder_path)
            if image_in_folder:
                for index in range(len(image_in_folder)):
                    path_file = f'{folder_path}/{image_in_folder[index]}'
                    os.remove(path_file)
            for img in list_image:
                data_image = await img.read()
                # print(data_image)
                print(type(data_image))
                image = Image.open(BytesIO(data_image))
                image.save(f'{path}/{uuid.uuid4()}.jpg')

    except Exception as e:
        logger.error(e, exc_info=True)