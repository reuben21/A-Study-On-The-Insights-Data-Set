from flask import Flask, Response
import cv2
import threading

app = Flask(__name__)
import sys
import cv2 as cv
import numpy as np

# initialize a lock used to ensure thread-safe
# exchanges of the frames (useful for multiple browsers/tabs
# are viewing tthe stream)
lock = threading.Lock()
scaling_factor = 1


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
            frame = cv.resize(frame, None, fx=scaling_factor, fy=scaling_factor, interpolation=cv.INTER_CUBIC)
            rows, cols = frame.shape[:2]
            src_points = np.float32([[0, 0], [cols - 1, 0], [0, rows - 1]])
            dst_points = np.float32([[cols - 1, 0], [0, 0], [cols - 1, rows - 1]])

            AffineMatrix = cv.getAffineTransform(src_points, dst_points)
            frame = cv.warpAffine(frame, AffineMatrix, (cols, rows))
            gray = cv.cvtColor(frame, cv.COLOR_BGR2GRAY)
            face_rects = face_cascade.detectMultiScale(frame, scaleFactor=1.2, minNeighbors=1)
            for (x, y, w, h) in face_rects:
                roi_gray = gray[y:y + h, x:x + w]
                roi_color = frame[y:y + h, x:x + w]
                cv.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 3)
                cv.putText(frame, "X", (x, 0), cv.FONT_HERSHEY_SIMPLEX, 0.35, (0, 255, 0), 1)
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


if __name__ == '__main__':
    host = "127.0.0.1"
    port = 8000
    debug = False
    options = None
    app.run(host, port, debug, options)
