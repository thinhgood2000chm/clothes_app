import base64
import logging
import os
import uuid
from io import BytesIO

from PIL import Image
from fastapi import BackgroundTasks

from definitions import ROOT_DIR
from setting import init_project
from pathlib import Path
from fastapi_mail import MessageSchema, ConnectionConfig, FastMail, MessageType

from setting.init_project import config_system

logger = logging.getLogger("function.py")

async def convert_image_to_base64(url_image):
    with open(url_image, "rb") as f:
        encoded_image = base64.b64encode(f.read())
    return encoded_image


async def save_image(product_id, image, name):
    root_path = init_project.config_system["PATH_SAVE_IMAGE"]
    try:
        if root_path:
            folder_path = f'{root_path}/{product_id}/'
            path = Path(f'{folder_path}')
            if not path.exists():
                os.makedirs(folder_path)
            # image_in_folder = os.listdir(folder_path)
            # if image_in_folder:
            #     for index in range(len(image_in_folder)):
            #         path_file = f'{folder_path}/{image_in_folder[index]}'
            #         os.remove(path_file)
            # for img in list_image:
            data_image = await image.read()
            # print(data_image)
            print(type(data_image))
            ima = Image.open(BytesIO(data_image))
            if ima.mode != "RGB":
                ima = ima.convert("RGB")

            ima.save(f'{path}/{name}.jpg')

    except Exception as e:
        logger.error(e, exc_info=True)


def send_email_async(background_tasks, mail_data: dict, ):
    message = MessageSchema(
        subject=f"KHÁCH HÀNG {mail_data['user_send_mail']}",
        recipients=['thinhgood9@gmail.com', "nguyenxuanthinh752000@gmail.com"],
        template_body={
            "title": f"Tin nhắn từ khách hàng {mail_data['user_send_mail']}",
            "name": f"{mail_data['user_send_mail']} - {mail_data['email']}",
            "content":mail_data['mail_content']
        },
        subtype=MessageType.html,
    )
    fm = FastMail(ConnectionConfig(
            MAIL_USERNAME=config_system['EMAIL_HOST_USER'],
            MAIL_PASSWORD=config_system['EMAIL_HOST_PASSWORD'],
            MAIL_FROM=mail_data['email'],
            MAIL_PORT=config_system['EMAIL_PORT'],
            MAIL_SERVER=config_system['EMAIL_HOST'],
            # MAIL_FROM_NAME=f"avcvcv",
            USE_CREDENTIALS=True,
            MAIL_SSL_TLS=False,
            TEMPLATE_FOLDER=f'{ROOT_DIR}/templates/',
            MAIL_STARTTLS=True
        )
    )
    background_tasks.add_task(fm.send_message, message, template_name='template_email.html')
    # await fm.send_message(message, template_name = 'template_email.html')