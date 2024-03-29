from aiogram import Bot, Dispatcher
import os

bot_ins = Bot(token=os.getenv('TOKEN'))
dp = Dispatcher()
