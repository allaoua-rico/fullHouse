import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import ShoppingCartButton from './ShoppingCartButton'
import { useStateValue } from './stateProvider';
import basketSorter from './basketSorter'
import BasketItem from './BasketItem';

export default function CartDrawer() {
  const [{basket, user }, dispatch]= useStateValue();
  let slicedArray=basketSorter(basket)

  const [state, setState] = React.useState({right: false});
   const anchor='right'
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const list = (anchor) => (
    <Box
      sx={{   
        width: 'auto' ,
        padding:'1rem' 
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 className="text-lg font-medium text-gray-900">Votre pannier</h2>
      <ul role="list" className="my-6 divide-y divide-gray-200">
      {slicedArray.map((item, index) => (
        <BasketItem item={item} index={index} />
      ))}
      </ul>
      <Divider />
      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total:</p>
            <p>{basket?.reduce((acc,{price})=>{
                return acc+price
            },0)} DA</p>
          </div>
        </div>
    </Box>
  );

  return (
    <div>
      
        <React.Fragment key={anchor}>
            <ShoppingCartButton onClick={toggleDrawer(anchor, true)}/>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
     
    </div>
  );
}
