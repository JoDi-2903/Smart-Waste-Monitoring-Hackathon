import os


class Config:
    # Path to the CSV file
    # Note: Can be overridden via the CSV_PATH environment variable
    CSV_PATH = os.getenv("CSV_PATH", "/app/data/dataset.csv")
