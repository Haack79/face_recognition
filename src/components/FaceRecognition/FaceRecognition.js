import React from 'react';
import './FaceRecognition.css';
// simple component with no state so pure component

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id="inputimage" alt='faces' width='500px' height='auto' src={imageUrl} />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition; 