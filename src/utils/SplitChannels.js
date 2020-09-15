
import * as tf from '@tensorflow/tfjs';


const getRGBSlices = imgTensor => {

    const number_of_splits_to_make = 3
    const axis_of_tensor_along_which_to_split = 2
    const [rSlice, gSlice, bSlice] = tf.split(imgTensor, number_of_splits_to_make, axis_of_tensor_along_which_to_split)

    //  need to squeeze out the extra dim to make stacking easier later on 
    const squeezedArray = [rSlice, gSlice, bSlice].map(a => tf.squeeze(a))

    return squeezedArray
}


export { getRGBSlices }