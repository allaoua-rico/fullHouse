import Button from '@mui/material/Button';
import React, { useEffect } from 'react'
import { useStateValue } from './stateProvider';

export default function BasketItem({item,index}) {
    const [{basket}, dispatch]= useStateValue();

    const addToBasket=  () => {
        dispatch({
          type:"ADD_TO_BASKET",
          item:item
      });
  }
  const removeFromBasket=  () => {
    dispatch({
      type:"REMOVE_FROM_BASKET",
      id:item.id
  });
}
useEffect(() => {  
    const storageBasket=JSON.parse(localStorage.getItem("basket"));
    if(storageBasket?.length !== basket?.length){
        localStorage.setItem("basket",JSON.stringify(basket));
    }
},[basket]);
  return (
    <>
    
          <li className="py-6 flex" key={index}>
             <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-center object-cover"
                />
              </div>

              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a >{item.title}</a>
                    </h3>
                    <p className="ml-4 text-pink-400">{item.price} DA</p>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                </div>
                <div className="flex-1 flex items-end justify-between ">
                    
                    <div className='flex justify-center items-center gap-x-4 '>
                        <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} variant="outlined"  onClick={removeFromBasket}>-</Button>
                        <p >{item.counter}</p>
                        <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} variant="outlined" onClick={addToBasket}>+</Button>
                    </div>


                  <div className="flex">
                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                      {item.price*item.counter }DA
                    </button>
                  </div>
                </div>
              </div>
          
          </li >
        
    </>
  )
}
