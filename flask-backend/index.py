import pickle
import pandas as pd
from flask import *
import cv2
import threading
from flask_cors import CORS
import cv2 as cv
import section1 as Question
import randomcolor
import io
import os
from base64 import encodebytes
from PIL import Image
import time

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
rand_color = randomcolor.RandomColor()

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()
scaling_factor = 1
verified_status = False

print("hello world")


@app.route('/stream', methods=['GET'])
def stream():
    return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")


def get_response_image(image_path):
    pil_img = Image.open(image_path, mode='r')  # reads the PIL image
    byte_arr = io.BytesIO()
    pil_img.save(byte_arr, format='PNG')  # convert the PIL image to byte array
    encoded_img = encodebytes(byte_arr.getvalue()).decode('ascii')  # encode as base64
    return encoded_img


def generate():
    # grab global references to the lock variable
    global lock, verified_status
    # initialize the video stream
    vc = cv2.VideoCapture(0)
    face_cascade = cv.CascadeClassifier('haarcascade_frontalface_alt.xml')
    # check camera is open
    if vc.isOpened():
        rval, frame = vc.read()

    else:
        rval = False

    # while streaming
    while rval:
        # wait until the lock is acquired
        with lock:
            # read next frame
            rval, frame = vc.read()
            # if blank frame
            imgGray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

            faces = face_cascade.detectMultiScale(imgGray, 1.1, 4)

            for (x, y, w, h) in faces:
                cv.rectangle(frame, (x, y), (x + w, y + h), (255, 0, 0), 2)
            if (faces != ()):
                verified_status = True
                vc.release()

            # cv.imshow("Result", frame)
            c = cv.waitKey(1)
            if frame is None:
                continue

            # encode the frame in JPEG format
            (flag, encodedImage) = cv2.imencode(".jpg", frame)

            # ensure the frame was successfully encoded
            if not flag:
                continue

        # yield the output frame in the byte format
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + bytearray(encodedImage) + b'\r\n')
    # release the camera
    vc.release()


@app.route("/success", methods=['GET'])
def success():
    if verified_status == False:
        return jsonify({"Veracity": False})
    else:
        return jsonify({"Veracity": True})


@app.route("/verified", methods=['POST'])
def verifying():
    if request.method == 'POST':
        session['isHuman'] = True
        print(session)
        return True


@app.route("/section1/question1", methods=['GET'])
def question1():
    key, val = Question.question1()
    list_of_keys = []
    list_of_values = []
    for k in key:
        list_of_keys.append(k)
    for v in val:
        list_of_values.append(v)
    # server side code
    time.sleep(2)
    image_path = 'question1.png'  # point to your image location
    encoded_img = get_response_image(image_path)
    response = {'Status': 'Success', 'ImageBytes': encoded_img}
    return jsonify(response)

    #     {
    #     "labels": list_of_keys,
    #     "values": list_of_values,
    #     "colors": rand_color.generate(hue="blue", count=10)
    # }

    # )


@app.route("/section1/question2", methods=['POST'])
def question2():
    product = request.json['Product']
    value_usd = request.json['Value(USD)']
    std_unit_price = request.json['Std Unit Price(USD)']
    value_in_fc = request.json['Value In FC']
    unit_rate_in_fc = request.json['Unit Rate In FC']
    unit_rate_currency = request.json['Unit Rate Currency']
    value_inr = request.json['Value(INR)']
    shipment_mode = request.json['Shipment Mode']
    qty = request.json['Qty']
    print(product,
          value_usd,
          std_unit_price,
          value_in_fc,
          unit_rate_in_fc,
          unit_rate_currency,
          value_inr,
          shipment_mode,
          qty)
    # test_data = {
    #     "Product": [0],
    #     "Value(USD)": [1400],
    #     "Std Unit Price(USD)": [25],
    #     "Value In FC": [1200],
    #     "Unit Rate In FC": [25],
    #     "Unit Rate Currency": [1],
    #     "Value(INR)": [95000],
    #     "Shipment Mode": [0],
    #     "Qty": [10]
    #
    # }

    test_data = {
        "Product": product,
        "Value(USD)": value_usd,
        "Std Unit Price(USD)": std_unit_price,
        "Value In FC": value_in_fc,
        "Unit Rate In FC": unit_rate_in_fc,
        "Unit Rate Currency": unit_rate_currency,
        "Value(INR)": value_inr,
        "Shipment Mode": shipment_mode,
        "Qty": qty

    }
    test_dataset = pd.DataFrame(test_data)
    loaded_model = pickle.load(open("logisticregression.sav", 'rb'))
    result = loaded_model.predict(test_dataset)
    return jsonify({"result": int(result[0])})


@app.route("/section1/question3a", methods=['GET'])
def question3a():
    Question.question3a()
    image_path = 'question3a.png'  # point to your image location
    encoded_img = get_response_image(image_path)
    response = {'Status': 'Success', 'ImageBytes': encoded_img}
    return jsonify(response)


if __name__ == '__main__':
    host = "127.0.0.1"
    port = 8000
    debug = True
    options = None
    CORS(app)
    app.run(host, port, debug, options)
