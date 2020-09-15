## React and TensorFlow.js : Image Processing

TensorFlow.js makes linear algebra and deep learning methods available in the browser, React is a fantastic framework to structure javascript projects and they make a great combination together. 

I’ve made a quick start for a basic TensorFlow-React setup [here](https://nmcg.blog/blog/react-tensorflow-quickstart) but for the rest of this post I’ll focus on processing an image in the browser.

All the code for this project can be foiund [here](https://github.com/NiallMcGinness/image-slicer-react-tf)

First we load the image as a three dimensional tensor object with shape ( 3,335,335 ), 335 is the width and height in pixels of the image. The browser will give us an array of pixels and  TensorFlow will convert this to a tensor object.

```js

const img_tensor = tf.browser.fromPixels(img)

```


Once we have this we can start thinking in terms the TensorFlow library and leave the messy world of the browser behind. 

We’ll split up the original image tensor into three slices, one for each RGB colour channel, each slice will have a shape ( 335,335 )

```js

const [rSlice, gSlice, bSlice] = tf.split(imgTensor, number_of_splits_to_make, axis_of_tensor_along_which_to_split)

```

For each of these image-slices we will create two zero-slices, the zero-slices will have the same dimensions as the image-slice but their values are all set to zero. 

```js

const zeros = tf.zeros([imgTensorWidth, imgTensorHieght], 'int32')
   
```

By stacking one image-slice with two zero-slices we can create a three dimensional tensor with the same shape as the original image tensor.

```js
const axis_of_tensor_along_which_to_stack = 2 
const redImageTensor = tf.stack([rSlice, zeros, zeros], axis_of_tensor_along_which_to_stack)

```

Each image-slice will be indexed to one of three RGB colour channels, for the red channel three dimensional tensor we place the image-slice in the first index and stack the two zero-channels after it :

Tensor : ( image-slice, zero-slice, zero-slice ) 

Shape : ( 3, 335, 335 )

For the green image the tensor will consist of (  zero-slice, image-slice, zero-slice ) and the  blue image channel will be (  zero-slice,  zero-slice , image-slice ) 

Once we have the three dimensional tensors all we have to do is convert them back into a format that the browser can understand, an array of pixels.

```js

const canvas = document.createElement('canvas')

canvas.width = imgTensorWidth;
canvas.height = imgTensorHieght;


tf.browser.toPixels(imageTensor, canvas)

```

With the array of pixels in hand we can create a canvas object for the browser to draw on and view the results 


