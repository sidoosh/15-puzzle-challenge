
import React from 'react';

function Square(props) {
    return (
        <button
            className={props.className}
            key={props.value} value={props.value}
            onClick={(e) => props.handleClick(e)}
            style={props.style}
        >
            {props.buttonText}
        </button>
    );
}

export default Square;