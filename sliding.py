import glob
from PIL import Image, ImageTk
from tkinter import Tk, Label, PhotoImage


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

            # Check if the window is closed to exit the loop
            if not root.winfo_exists():
                root.destroy()
                return


image_files = glob.glob(
    'C:/Users/user/Desktop/IDP final/notices/**/*.png', recursive=True)
image_files += glob.glob(
    'C:/Users/user/Desktop/IDP final/notices/**/*.jpg', recursive=True)
