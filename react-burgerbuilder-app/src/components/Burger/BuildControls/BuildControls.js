import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
import MenuTitle from '../../MenuTitle/MenuTitle';

const controls = [
  { label: 'Lettuce', type: 'lettuce' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const buildControls = props => (
  <div className={classes.BuildControls}>
    <MenuTitle
      title="Single Ingredients"
      instructions="add or subtract ingredients into your burger"
    />
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseEnabled}
      onClick={props.check}
    >
      ORDER NOW
    </button>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
  </div>
);

export default buildControls;
