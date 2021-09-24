import argparse
import cv2
import itertools
import os

def convert_image(image_path, parameter):
    image = cv2.imread(image_path)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    gray = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
    return cv2.adaptiveThreshold(gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C,\
                cv2.THRESH_BINARY, 11, parameter)

def save_image(image, image_path, parameter):
    (input_dir, input_file_name) = os.path.split(image_path)
    (input_file_name_without_extension, input_file_extension) = os.path.splitext(input_file_name)
    
    try:
        os.mkdir(os.path.join(input_dir, "out"))
    except:
        pass
    cv2.imwrite(
        os.path.join(
            input_dir, "out", f"{input_file_name_without_extension}_{parameter}{input_file_extension}"
        ),
        image
    ) 

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Count number of words of the input')
    parser.add_argument("--input_files", help="Specify an input picture.", nargs='+', default=["thumbs_up_down.jpg"])
    parser.add_argument("--parameters", help="Threshold for contour detection", nargs='+', default=[20], type=int)

    arguments = parser.parse_args()

    for file, parameter in itertools.product(arguments.input_files, arguments.parameters):
        image = convert_image(file, parameter)
        save_image(image, file, parameter)
    
    