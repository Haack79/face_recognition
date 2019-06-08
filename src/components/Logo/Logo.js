import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import icons_brain from './icons_brain.png';
// simple component with no state so pure component

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 250, width: 250 }} >
                <div className="Tilt-inner pa3">
                     <img style={{paddingTop: '5px'}} alt="brain logo" src={icons_brain}></img> 
                </div>
            </Tilt>
        </div>
    );
}

export default Logo; 