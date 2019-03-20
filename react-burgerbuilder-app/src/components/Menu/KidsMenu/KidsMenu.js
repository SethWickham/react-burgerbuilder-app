import React from 'react';
import classes from './KidsMenu.module.css';

const kidsMenu = props => {
  return (
    <div>
      <button className={classes.KidsMenuBtn1} onClick={props.kidPicked1}>
        Grilled Cheese
      </button>
      <button className={classes.KidsMenuBtn2} onClick={props.kidPicked2}>
        Mini Veggie
      </button>

      <button className={classes.KidsMenuBtn3} onClick={props.kidPicked3}>
        Mini Burger
      </button>
    </div>
  );
};

export default kidsMenu;
