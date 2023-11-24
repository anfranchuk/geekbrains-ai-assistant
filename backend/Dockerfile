FROM python:3.11
RUN apt-get update -y
RUN apt-get upgrade -y

WORKDIR /backend

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt
COPY ./core ./core
CMD ["cd core && daphne", "-b", "0.0.0.0", "-p", "8777", "core.asgi:application -v2"]   