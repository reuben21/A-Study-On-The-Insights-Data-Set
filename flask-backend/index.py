from flask import Flask, Response,redirect
import cv2
import threading

app = Flask(__name__)

import cv2 as cv
import numpy as np

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()
scaling_factor = 1

print("hello world")
@app.route('/stream', methods=['GET'])
def stream():
    return Response(generate(), mimetype="multipart/x-mixed-replace; boundary=frame")


def generate():
    # grab global references to the lock variable
    global lock
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
            if(faces!=()):
                print("idhar redirect kar")

            cv.imshow("Result", frame)
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
@app.route("/success")
def success():
    return "success"

if __name__ == '__main__':
    host = "127.0.0.1"
    port = 8000
    debug = False
    options = None
    app.run(host, port, debug, options)
