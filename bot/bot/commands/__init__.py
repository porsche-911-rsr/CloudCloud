__all__ = ['register_user_commands']

from aiogram import Router, F
from aiogram.filters import CommandStart, Command

from commands.start import start_command
from commands.upload import upload_command
from commands.info import info_command
from commands.download import download_command


def register_user_commands(router: Router) -> None:
    router.message.register(start_command, CommandStart())
    router.message.register(upload_command, Command(commands=['upload']))
    router.message.register(info_command, Command(commands=['info']))
    router.message.register(download_command, Command(commands=['download']))