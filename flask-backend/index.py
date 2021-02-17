from flask import Flask, Response, jsonify
import cv2
import threading
from flask_cors import CORS
import cv2 as cv
import section1 as Question

app = Flask(__name__)

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


@app.route("/section1/question1", methods=['GET'])
def question1():
    key, val = Question.question1()
    list_of_keys = []
    list_of_values = []
    for k in key:
        list_of_keys.append(k)
    for v in val:
        list_of_values.append(v)

    return jsonify({"key": list_of_keys, "val": list_of_values})


if __name__ == '__main__':
    host = "127.0.0.1"
    port = 8000
    debug = False
    options = None
    CORS(app)
    app.run(host, port, debug, options)
