import React from 'react'
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {IconButton, Tooltip } from '@mui/material';
import { useStateValue } from './stateProvider';

export default function ShoppingCartButton({onClick}) {
    const [{basket, user }, dispatch]= useStateValue();

  return (
    // <div>      
    <Tooltip title="Pannier">     
        {user===null && (
        <IconButton sx={{marginRight:'1rem'}} aria-label="delete" size="large" onClick={onClick}>
            <Badge 
            badgeContent={basket?.length}
            color="error">
                <ShoppingCartIcon />
            </Badge>
        </IconButton>
    )}
    </Tooltip>  
    // </div>
  )
}
