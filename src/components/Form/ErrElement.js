import React from 'react';

export const ErrElement = props => (
    <p {...props} style={{color:"red"}}>
        {props.children}
    </p>
)