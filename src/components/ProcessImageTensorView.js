import React from 'react';
import * as tf from '@tensorflow/tfjs';

import ImageTensor2Canvas from "./ImageTensor2Canvas"
import { getRGBSlices } from "../utils/SplitChannels"


const ProcessImageTensorView = ({ imageTensor }) => {



    const [rSlice, gSlice, bSlice] = getRGBSlices(imageTensor)

    const [imgTensorWidth, imgTensorHieght] = imageTensor.shape

    const zeros = tf.zeros([imgTensorWidth, imgTensorHieght], 'int32')

    const redImageTensor = tf.stack([rSlice, zeros, zeros], 2)
    const greenImageTensor = tf.stack([zeros, gSlice, zeros], 2)
    const blueImageTensor = tf.stack([zeros, zeros, bSlice], 2)

    const containerCSS = "flex  flex-wrap p-3 m-10"
    const cardCSS = "w-1/2 bg-gray-400"
    const spanCSS = ""

    return (

        <>

            <div className={containerCSS}>

                <div className={cardCSS}>
                    <ImageTensor2Canvas imageTensor={imageTensor} canvasName={"baseImage"} />
                    <span className={spanCSS}>Base Image</span>
                </div>

                <div className={cardCSS}>
                    <ImageTensor2Canvas imageTensor={redImageTensor} canvasName={"redImage"} />
                    <span className={spanCSS}>Red  Channel  Image</span>
                </div>

                <div className={cardCSS}>
                    <ImageTensor2Canvas imageTensor={greenImageTensor} canvasName={"greenImage"} />
                    <span className={spanCSS}>Green Channel  Image</span>
                </div>

                <div className={cardCSS}>
                    <ImageTensor2Canvas imageTensor={blueImageTensor} canvasName={"blueImage"} />
                    <span className={spanCSS}>Blue Channel Image</span>
                </div>

            </div>


        </>
    )
}

export default ProcessImageTensorView

