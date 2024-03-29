from aiogram import types
import requests


async def start_command(message: types.Message) -> None:
    telegram_id = message.from_user.id
    url = "http://158.160.156.26:5000/api/user/register"
    body = {"telegram_id": telegram_id}

    response = requests.post(url, json=body)

    if 200 <= response.status_code < 300:
        print("Регистрация успешна", response.json())
        await message.answer("Вы успешно зарегестрированы")
    else:
        print("Ошибка", response.status_code, response.json())
        await message.answer(f'Ошибка: {response.json()}')
