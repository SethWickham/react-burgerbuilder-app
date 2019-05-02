import React from 'react';
import classes from './MainMenu.module.css';

const mainMenu = props => {
  return (
    <div className={classes.Display}>
      <button className={classes.MainMenuBtn1} onClick={props.picked1}>
        Burgerlicious
      </button>
      <button className={classes.MainMenuBtn2} onClick={props.picked2}>
        Veggie Delight
      </button>

      <button className={classes.MainMenuBtn3} onClick={props.picked3}>
        Meatopolis
      </button>
    </div>
  );
};

export default mainMenu;
