import React from 'react';
import styles from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const  controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

const buildControls = (props) => (
    // we are maping our controls const to draw that many BuildControl components
    <div className={styles.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( crtl => (
            <BuildControl 
            key={crtl.label} 
            label={crtl.label}
            added={ () => props.ingredientAdded(crtl.type) }
            removed={ () => props.ingredientRemoved(crtl.type) }
            disabled={props.disabled[crtl.type]} />
        ))}
        <button 
        className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>
        ORDER NOW </button>
    </div>
);

export default buildControls;