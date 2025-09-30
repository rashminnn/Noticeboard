from tkinter import Tk, Label, PhotoImage
from PIL import Image, ImageTk
import glob
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

    firebase_storage = pyrebase.initialize_app(config)
    storage = firebase_storage.storage()

    allfiles = storage.list_files()
    firebase_names = [blob.name for blob in allfiles]
    print(firebase_names)

    directory = "C:/Users/user/Desktop/IDP final/notices"

    if not os.path.exists(directory):
        os.makedirs(directory)

    local_files = os.listdir(directory)

    for file in allfiles:
        print(file.name)

        file_name = os.path.basename(file.name)
        path = os.path.join(directory, file_name)

        if file_name not in local_files:
            file.download_to_filename(path)
            print(f"Downloaded {file_name}")

        for file_name in local_files:
            if file_name not in firebase_names:
                file_path = os.path.join(directory, file_name)
                if os.path.isfile(file_path):
                    os.remove(file_path)
                    print(f"Deleted {file_name}")
                    break


def display_images(image_paths):
    root = Tk()
    label = Label(root)
    label.pack()

    img_num = len(image_paths)

    while True:
        for i in range(img_num):
            root.attributes('-fullscreen', True)
            image_path = image_paths[i]
            image = Image.open(image_path)
            resizeimg = image.resize((1920, 1080), Image.Resampling.LANCZOS)
            photo = ImageTk.PhotoImage(resizeimg)

            label.config(image=photo)
            root.update()
            root.after(2000)

            if not root.winfo_exists():
                root.destroy()


image_files = glob.glob(
    'C:/Users/user/Desktop/IDP final/notices/**/*.png', recursive=True)
image_files += glob.glob(
    'C:/Users/user/Desktop/IDP final/notices/**/*.jpg', recursive=True)

if __name__ == "__main__":
    download_files()
    # display_images(image_files)
