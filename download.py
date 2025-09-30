import pyrebase
import os
from dotenv import load_dotenv


def download_files():
    load_dotenv()

    config = {
        "apiKey": os.getenv("API_KEY"),
        "authDomain": os.getenv("AUTH_DOMAIN"),
        "projectId": os.getenv("PROJECT_ID"),
        "storageBucket": os.getenv("STORAGE_BUCKET"),
        "messagingSenderId": os.getenv("MESSAGING_SENDER_ID"),
        "appId": os.getenv("APP_ID"),
        "measurementId": os.getenv("MEASUREMENT_ID"),
        "databaseURL": os.getenv("DATABASE_URL"),
        "serviceAccount": os.getenv("SERVICE_ACCOUNT")
    }

    for key, value in config.items():
        print(f"{key}: {value}")

    firebase_storage = pyrebase.initialize_app(config)
    storage = firebase_storage.storage()

    allfiles = storage.list_files()
    directory = "C:/Users/user/Desktop/IDP final/notices"

    if not os.path.exists(directory):
        os.makedirs(directory)

    for file in allfiles:
        print(file.name)
        path = os.path.join(directory, os.path.basename(file.name))
        file.download_to_filename(path)


download_files()
