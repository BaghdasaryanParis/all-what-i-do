# Use the official Python image from Docker Hub
FROM python:3.9-slim

WORKDIR /app


COPY script.py /app/

RUN pip install --no-cache-dir -r env.txt || true

CMD ["python", "script.py"]

EXPOSE 8000