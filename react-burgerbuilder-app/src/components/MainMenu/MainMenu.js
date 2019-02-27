import React from 'react';

const mainMenu = props => {
  return (
    <div>
      <button onClick={props.picked1}>Burgerlicious</button>
      <button onClick={props.picked2}>Veggie Delight</button>
      <button onClick={props.picked3}>Meatopolis</button>
    </div>
  );
};

export default mainMenu;
