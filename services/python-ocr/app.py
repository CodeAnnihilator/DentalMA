import cv2
import numpy as np
import os
import pytesseract
from werkzeug.utils import secure_filename
from io import BytesIO
from flask import Flask, request
from flask_cors import CORS
from PIL import Image
import base64
import re

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = './static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# img = cv2.imread('2.png', cv2.IMREAD_UNCHANGED)
# img_contours = np.zeros(img.shape)
#
# blurred_img = cv2.GaussianBlur(img, (5, 5), 0)
#
# img_grey = cv2.cvtColor(blurred_img, cv2.COLOR_BGR2GRAY)
#
# thresh = cv2.threshold(img_grey, 200, 255, cv2.THRESH_BINARY)[1]
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
# opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)
#
# contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
# # cv2.drawContours(img, contours, -1, (255, 255, 0), 1)
#
# # print(contours[0])
#
# if len(contours) != 0:
#     c = max(contours, key = cv2.contourArea)
#     x,y,w,h = cv2.boundingRect(c)
#     print(w - x)
#     cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)
#
# cv2.imshow('Frame', img)
# cv2.waitKey(0)


# img = cv2.imread('4.png')

# img_grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# thresh = cv2.threshold(img_grey, 200, 255, cv2.THRESH_BINARY_INV)[1]
# kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
# opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

# boxes = pytesseract.image_to_data(thresh, config='digits')


# r = None

# for x, b in enumerate(boxes.splitlines()):
#     b = b.split('	')
#     if x != 0 and b[10] != '-1':
#         r = b[11]

# print(r)

# cv2.imshow('Frame', opening)
# cv2.waitKey(0)

# @app.route('/api/v1/live-check', methods=['GET'])
# def test():

#   img = cv2.imread('4.png')

#   img_grey = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

#   thresh = cv2.threshold(img_grey, 200, 255, cv2.THRESH_BINARY_INV)[1]
#   kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
#   opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

#   boxes = pytesseract.image_to_data(thresh, config='digits')

#   r = None

#   for x, b in enumerate(boxes.splitlines()):
#       b = b.split('	')
#       if x != 0 and b[10] != '-1':
#           r = b[11]

#   return str(r)

# def replace_chars(text):
#   list_of_numbers = re.findall(r'\d+', text)
#   result_number = ''.join(list_of_numbers)
#   return result_number

@app.route('/api/v1/detect-magnification', methods=['POST'])
def detect_magnification():
  if request.method == 'POST':

    f = request.form['file']

    file = Image.open(BytesIO(base64.b64decode(f.split(',')[1])))

    filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'test.png')
    
    file.save(filepath)

    img = cv2.imread(filepath)
    img_contours = np.zeros(img.shape)

    blurred_img = cv2.GaussianBlur(img, (5, 5), 0)

    img_grey = cv2.cvtColor(blurred_img, cv2.COLOR_BGR2GRAY)

    thresh = cv2.threshold(img_grey, 200, 255, cv2.THRESH_BINARY)[1]
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)

    r = None

    if len(contours) != 0:
        c = max(contours, key = cv2.contourArea)
        x,y,w,h = cv2.boundingRect(c)
        r = w
        cv2.rectangle(img,(x,y),(x+w,y+h),(0,255,0),2)

    return 0 if r == None else str(r)

# @app.route('/api/v1/detect-magnification', methods=['POST'])
# def detect_magnification():
#   if request.method == 'POST':

#     f = request.form['file']

#     file = Image.open(BytesIO(base64.b64decode(f.split(',')[1])))

#     filepath = os.path.join(app.config['UPLOAD_FOLDER'], 'test.png')
    
#     file.save(filepath)

#     img = cv2.imread(filepath)

#     thresh = cv2.threshold(img, 150, 255, cv2.THRESH_BINARY_INV)[1]
#     kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 1))
#     opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

#     text = pytesseract.image_to_string(thresh)

#     return replace_chars(text)

#     # boxes = pytesseract.image_to_data(opening, config='digits')

#     # r = None

#     # for x, b in enumerate(boxes.splitlines()):
#     #   b = b.split('	')
#     #   if x != 0 and b[10] != '-1':
#     #     r = b[11]

#     # return 'no match' if r == None else r

if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5000)
