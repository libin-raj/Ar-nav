# Use lightweight Python image
FROM python:3.11-slim

WORKDIR /app

# Copy and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Expose Flask port
EXPOSE 5000

# Enable live-reload
CMD ["flask", "run", "--host=0.0.0.0", "--port=5000", "--reload"]
