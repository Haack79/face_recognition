import React from 'react';
// simple component with no state so pure component

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className='white f3'>
                {`${name}, your rank is...`}
            </div>
            <div className='white f1'>
                {`${entries} bomb!`}
            </div>
        </div>
    );
}

export default Rank; 