import React from 'react';

import classes from './Order.css';

const order = ( props ) => {

    return (
        <div className={classes.Order}>
            <span style={{
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
            }}>
            <p>Ingredients: {props.ingredients}</p>
            <p>Price: <strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</strong></p>
            </span>
        </div>
    );
};

export default order;