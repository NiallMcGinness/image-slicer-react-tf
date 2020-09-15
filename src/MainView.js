import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

import ProcessImageTensorView from "./components/ProcessImageTensorView"


const MainView = () => {

    const imgPath = '/test.png'

    const [imageTensor, setImageTensor] = useState(null)

    const loadImage = imgPath => {

        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.src = imgPath
        img.onload = () => {

            const img_tensor = tf.browser.fromPixels(img)

            setImageTensor(img_tensor)



        }



    }

    useEffect(() => {

        loadImage(imgPath)

    }, [imgPath]);







    return (


        <div className="max-w-3xl mx-auto">

            <h1 className="my-4 text-bold">Image split by color channel</h1>



            {
                (!imageTensor ? "" : <ProcessImageTensorView imageTensor={imageTensor} />)
            }

        </div>

    )
}

export default MainView


