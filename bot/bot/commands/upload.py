from aiogram import types
import requests
from bot_instance import bot_ins, dp
from aiogram import F
from aiogram.types import ContentType


async def upload_command(message: types.Message):
    await message.reply("Пожалуйста, загрузите файл (именно как файл, без сжатия)")


@dp.message(F.content_type == ContentType.DOCUMENT)
async def file_command(message: types.Message):
    file_id = message.document.file_id
    file_name = message.document.file_name
    mime_type = message.document.mime_type

    file = await bot_ins.get_file(file_id)
    file_path = file.file_path
    downloaded_file = await bot_ins.download_file(file_path)

    url = "http://158.160.156.26:5000/api/files/upload"
    telegram_id = message.from_user.id
    files = {'file': (file_name, downloaded_file, mime_type)}
    body = {"telegram_id": telegram_id}

    response = requests.post(url, files=files, data=body)

    if response.status_code == 200:
        print("Файл успешно отправлен на бекенд")
    else:
        print("Произошла ошибка при отправке файла на бекенд")

    downloaded_file.close()

    await message.reply('Загружено')