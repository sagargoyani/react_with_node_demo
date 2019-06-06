import React from 'react';

export const Formbtn = props => (
    <div className="form-group">
        <button className="btn btn-md btn-success" {...props}>{props.children}</button>
    </div>
);

