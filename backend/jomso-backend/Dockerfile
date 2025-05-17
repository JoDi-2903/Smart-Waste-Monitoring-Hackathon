# backend/Dockerfile

# Use a slim Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install build tools
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency list and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code and data folder
COPY . .

# Expose Flask default port
EXPOSE 5000

# Run the Flask app
CMD ["python", "app.py"]
