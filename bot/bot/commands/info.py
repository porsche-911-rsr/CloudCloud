from aiogram import types
import requests


async def info_command(message: types.Message) -> None:
    telegram_id = message.from_user.id
    url = "http://158.160.156.26:5000/api/files/info"
    body = {"telegram_id": telegram_id}

    response = requests.post(url, json=body)
    print(response)

    if 200 <= response.status_code < 300:
        try:
            data = response.json()
            message_layout = (f'Количество файлов: {data["files_total"]}\n'
                              f'Занято места:{round(data["storage_used"]/1024/1024, 3)} мб / 512 мб')
            await message.answer(message_layout)
        except:
            await message.answer("ОШИБКА")
    else:
        print("Ошибка", response.status_code, response.json())
        await message.answer(f'Ошибка: {response.json()}')
