FROM alpine:3.21

RUN apk add --no-cache python3 py3-pip

RUN pip install --break-system-packages aiohttp

COPY . /app

WORKDIR /app

CMD [ "python3","script.py" ]

