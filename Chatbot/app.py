import nltk
from nltk.stem.lancaster import LancasterStemmer

stemmer = LancasterStemmer()

import numpy
import tensorflow as tf
import tflearn
import tensorflow
import random
import json
import pickle
from flask import Flask, render_template, request

app = Flask(__name__)

with open("intents.json") as file:
    data = json.load(file)

with open("data.pickle", "rb") as f:
    words, labels, training, output = pickle.load(f)

# tensorflow.reset_default_graph()
tensorflow.compat.v1.get_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

model.load("model.tflearn")


def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1

    return numpy.array(bag)


def chat(questions):
    inp = questions
    results = model.predict([bag_of_words(inp, words)])[0]
    results_index = numpy.argmax(results)
    tag = labels[results_index]
    if results[results_index] > 0.7:
        for tg in data["intents"]:
            if tg['tag'] == tag:
                responses = tg['responses']

        return random.choice(responses)
    else:
        return "I didn't get that, try again."


list1 = ["Hey 😊", "Hi there!"]


@app.route("/", methods=['GET', 'POST'])
def index():
    questions = ""
    reply = ""

    if request.method == 'POST':
        questions = request.form['questions']

    if questions:
        list1.append(questions)
        reply = chat(questions)
        list1.append(reply)
    return render_template("index.html", list=list1, count=len(list1))


if __name__ == '__main__':
    app.debug = True
    app.run()