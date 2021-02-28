#!/usr/bin/env python
# coding: utf-8

# In[8]:


import tensorflow as tf
import tflearn
from tflearn.layers.conv import conv_2d,max_pool_2d
from tflearn.layers.core import input_data,dropout,fully_connected
from tflearn.layers.estimator import regression
import numpy as np
import cv2
from sklearn.utils import shuffle


# In[ ]:


#Load Images from Swing
loadedImages = []
for i in range(0, 1000):
    image = cv2.imread('Dataset/SwingImages/swing_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))


#Load Images From Fist
for i in range(0, 1000):
    image = cv2.imread('Dataset/FistImages/fist_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))

# one
for i in range(0, 1000):
    image = cv2.imread('Dataset/Letter_D/Letter_D_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))

# two
for i in range(0, 1000):
    image = cv2.imread('Dataset/two/two_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))

# three
for i in range(0, 1000):
    image = cv2.imread('Dataset/Letter_F/Letter_F_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))

# four
for i in range(0, 1000):
    image = cv2.imread('Dataset/four/four_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))


# five
#Load Images From Palm
for i in range(0, 1000):
    image = cv2.imread('Dataset/PalmImages/palm_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))

# six

for i in range(0, 1000):
    image = cv2.imread('Dataset/thumbs_up/thumbs_up_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))


# letter L
for i in range(0, 1000):
    image = cv2.imread('Dataset/Letter_L/Letter_L_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    loadedImages.append(gray_image.reshape(89, 100, 1))




# In[ ]:
# print(len(loadedImages))

# Create OutputVector

outputVectors = []
for i in range(0, 1000):
    outputVectors.append([1, 0, 0, 0, 0, 0, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 1, 0, 0, 0, 0, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 1, 0, 0, 0, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 1, 0, 0, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 0, 1, 0, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 0, 0, 1, 0, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 0, 0, 0, 1, 0, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 0, 0, 0, 0, 1, 0])

for i in range(0, 1000):
    outputVectors.append([0, 0, 0, 0, 0, 0, 0, 0, 1])

# In[ ]:

# print(len(outputVectors))

testImages = []

#Load Images for swing
for i in range(0, 100):
    image = cv2.imread('Dataset/SwingTest/swing_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

# #Load Images for Fist
for i in range(0, 100):
    image = cv2.imread('Dataset/FistTest/fist_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

for i in range(0, 100):
    image = cv2.imread('Dataset/one_test/one_test_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

for i in range(0, 100):
    image = cv2.imread('Dataset/two_Test/two_Test' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

for i in range(0, 100):
    image = cv2.imread('Dataset/three_Test/three_Test_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

for i in range(0, 100):
    image = cv2.imread('Dataset/four_Test/four_Test_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

# #Load Images for Palm
for i in range(0, 100):
    image = cv2.imread('Dataset/PalmTest/palm_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))
    
for i in range(0, 100):
    image = cv2.imread('Dataset/six_test/six_test_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

# # Load images for L letter
for i in range(0, 100):
    image = cv2.imread('Dataset/Letter_L_Test/Letter_L_' + str(i) + '.png')
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    testImages.append(gray_image.reshape(89, 100, 1))

testLabels = []

for i in range(0, 100):
    testLabels.append([1, 0, 0, 0, 0, 0, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 1, 0, 0, 0, 0, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 1, 0, 0, 0, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 1, 0, 0, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 0, 1, 0, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 0, 0, 1, 0, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 0, 0, 0, 1, 0, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 0, 0, 0, 0, 1, 0])

for i in range(0, 100):
    testLabels.append([0, 0, 0, 0, 0, 0, 0, 0, 1])


# In[ ]:


# Define the CNN Model
tf.compat.v1.get_default_graph()
convnet=input_data(shape=[None,89,100,1],name='input')
convnet=conv_2d(convnet,32,2,activation='relu')
convnet=max_pool_2d(convnet,2)
convnet=conv_2d(convnet,64,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=conv_2d(convnet,128,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=conv_2d(convnet,256,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=conv_2d(convnet,256,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=conv_2d(convnet,128,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=conv_2d(convnet,64,2,activation='relu')
convnet=max_pool_2d(convnet,2)

convnet=fully_connected(convnet,1000,activation='relu')
convnet=dropout(convnet,0.75)

convnet=fully_connected(convnet,9,activation='softmax')

convnet=regression(convnet,optimizer='adam',learning_rate=0.001,loss='categorical_crossentropy',name='regression')

model=tflearn.DNN(convnet,tensorboard_verbose=0)


# In[ ]:


# Shuffle Training Data
loadedImages, outputVectors = shuffle(loadedImages, outputVectors, random_state=42)

# Train model
model.fit(loadedImages, outputVectors, n_epoch=50,
           validation_set = (testImages, testLabels),
           snapshot_step=100, show_metric=True, run_id='convnet_coursera')

model.save("TrainedLettersModel/LetterLModel.tfl")


# In[ ]:




