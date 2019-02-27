import React from 'react';

import classes from './MenuTitle.module.css';

const menuTitle = props => (
  <div className={classes.MenuBox}>
    <div className={classes.MenuTitle}>{props.title}</div>
    <div className={classes.MenuInstructions}>{props.instructions}</div>
  </div>
);

export default menuTitle;
