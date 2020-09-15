import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';



const ImageTensor2Canvas = ({ imageTensor, canvasName }) => {





    const [imgTensorWidth, imgTensorHieght] = imageTensor.shape


    useEffect(() => {

        const canvas = document.createElement('canvas')

        canvas.width = imgTensorWidth;
        canvas.height = imgTensorHieght;
        canvas.toDataURL("image/png")

        tf.browser.toPixels(imageTensor, canvas)

        const output = document.getElementById(canvasName)
        output.appendChild(canvas)





    }, [imageTensor]);


    return (





        <div id={canvasName}></div>





    )
}

export default ImageTensor2Canvas