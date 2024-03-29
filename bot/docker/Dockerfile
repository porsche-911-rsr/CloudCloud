FROM python:3.10

RUN mkdir -p /home
ENV HOME=/home
WORKDIR $HOME

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONBUFFERED=1

COPY /bot/requirements.txt .
RUN pip install -r requirements.txt

COPY ../bot $HOME

CMD ["python", "bot/__main__.py"]