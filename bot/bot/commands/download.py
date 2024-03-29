from aiogram import types, F
import requests
from bot_instance import dp
from aiogram.types import CallbackQuery
from aiogram.utils.keyboard import InlineKeyboardBuilder

async def download_command(message: types.Message) -> None:
    telegram_id = message.from_user.id
    url = "http://158.160.156.26:5000/api/files/all"
    body = {"telegram_id": telegram_id}

    response = requests.post(url, json=body)

    if 200 <= response.status_code < 300:
        data = response.json()
        builder = InlineKeyboardBuilder()
        for item in data['items']:
            builder.add(types.InlineKeyboardButton(text=item['name'], callback_data=f'file_{item["name"]}'))

        await message.answer(text="Выберите файл для скачивания", reply_markup=builder.as_markup())
    else:
        print("Ошибка", response.status_code, response.json())
        await message.answer(f'Ошибка: {response.json()}')


@dp.callback_query(F.data.startswith("file_"))
async def button_click_handler(callback_query: CallbackQuery):
    file_name = callback_query.data[5:]

    url = "http://158.160.156.26:5000/api/files/get_download_link"
    body = {
        "telegram_id": callback_query.from_user.id,
        "filename": file_name
    }
    response = requests.post(url, json=body)

    if 200 <= response.status_code < 300:
        data = response.json()
        print(data)
        builder = InlineKeyboardBuilder()
        builder.add(types.InlineKeyboardButton(text='СКАЧАТЬ', url=data['href']))

        await callback_query.message.answer(f'Файл {file_name} готов для скачивания!', reply_markup=builder.as_markup())
        await callback_query.answer()

    else:
        print("Ошибка", response.status_code, response.json())
        await callback_query.message.answer(f'Ошибка: {response.json()}')
        await callback_query.answer()


