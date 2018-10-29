import React from 'react';

export default function Box(props) {
    return (
        <div className= "box"//{props.box.value === -1 ? "box mine" :"box"} 
             onClick={props.handleClick}
        >
            {props.box.value}
        </div>
    )
}