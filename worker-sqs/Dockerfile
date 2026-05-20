FROM python:3.12-slim

WORKDIR /worker

COPY requirements.txt .
COPY s3image.py .
RUN pip install --no-cache-dir -r requirements.txt

COPY worker.py .

CMD ["python", "worker.py"]
