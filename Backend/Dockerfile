FROM python:3.10-bullseye

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN pip install --upgrade pip
COPY ./requirements.txt .
COPY ./init.sh .
RUN pip install -r requirements.txt

COPY . .
ENTRYPOINT [ "sh" , "init.sh" ]