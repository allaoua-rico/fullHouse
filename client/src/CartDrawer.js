import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';

import Divider from '@mui/material/Divider';

import ShoppingCartButton from './ShoppingCartButton'
import { Link } from 'react-router-dom';
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
console.log(process.env.REACT_APP_ADDED_FEATURES)
  const list = (anchor) => (
    <Box
      sx={{   
        width: 'auto' ,
        padding:'1rem' 
      }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h2 className="text-lg font-medium text-gray-900">Votre pannier</h2>
      <ul role="list" className="my-6 divide-y divide-gray-200">
      {slicedArray.map((item, index) => (
        <BasketItem item={item} index={index} />
      ))}
      </ul>
      <Divider />
     { process.env.REACT_APP_ADDED_FEATURES && (
        < Link to={'/checkout'} className='flex justify-center mt-4'>
          <Button variant="contained" href="#contained-buttons" color={'warning'}>
                  Aller au paiement
          </Button>
        </Link>
          )
}
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      
        <React.Fragment key={anchor}>
            <ShoppingCartButton onClick={toggleDrawer(anchor, true)}/>
          {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
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
