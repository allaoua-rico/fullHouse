
import { Tooltip, useMediaQuery} from '@mui/material';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import { useTheme } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCartOutlined';
// import './styleSheets/product.css'
import { IconButton } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
export default function Product({id,title, image, price, rating}) {
    const [{basket}, dispatch]= useStateValue();
    const addToBasket=  () => {
        dispatch({
          type:"ADD_TO_BASKET",
          item:{
              id:id,
              title:title,
              image:image,
              price:price,
            //   rating:rating
          }
      });
  }
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    // console.log(matches)
    let styles={
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: "400px",
        height: "400px",
        backgroundImage:`url("${image}")`,
        overflow:"hidden",
    }
    useEffect(() => {  
        const storageBasket=JSON.parse(localStorage.getItem("basket"));
        if(storageBasket?.length < basket?.length){
            localStorage.setItem("basket",JSON.stringify(basket));
        }
    },[basket]);
    return (
        <div 
        
        className="rounded-2xl group overflow-hidden product flex flex-col items-center justify-between m-2   basis-1/2 "
         style={matches ? styles : {}}
        >
            <div className='hover:backdrop-blur-sm transition duration-200 w-full h-full flex flex-col p-5 items-center justify-between'>
            <img className={ matches ? `hidden` : `object-cover h-72 w-96 md:h-96 rounded-md  mb-4 `} src={image}/>
            <div className="z-10 transition  duration-300  sm:-translate-y-40	group-hover:translate-y-0
            ">
                <p className='sm:text-white text-2xl sm:text-4xl'>{title}</p>

                <p className="text-pink-400 text-center sm:my-4 my-3 sm:text-base text-2xl">
                    <strong>{price}</strong> 
                    <small> DA</small>
                </p>

                {/* <div className="product__rating">
                    {Array(rating).fill().map(()=>{
                            return <p>⭐</p>
                        })}
                </div> */}
            </div>

           <div className='flex justify-between gap-x-6 transition duration-300 sm:translate-y-20	group-hover:translate-y-0'>
           <div className='bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-pink-400 shoppingParent '>
            <Link  to={`/details?id=${id}`}>
                <IconButton disableRipple={true} aria-label="delete" size="sm" onClick={addToBasket}>
                    <Tooltip title="Description">
                        <DescriptionIcon  className='transition-all duration-[450ms]' sx={{color:'black','.shoppingParent:hover &': { color: 'white' }}}/>
                    </Tooltip>
                </IconButton>
            </Link>
            </div>
       
            <div className='bg-white w-9 h-9 rounded-full flex justify-center items-center transition duration-[450ms] hover:rotate-[360deg] hover:bg-pink-400 shoppingParent '>
                <IconButton disableRipple={true} aria-label="delete" size="sm" onClick={addToBasket}>
                    <Tooltip title="Ajouter au pannier">
                        <AddShoppingCartIcon className='transition-all duration-[450ms]' sx={{color:'black','.shoppingParent:hover &': { color: 'white' }}}/>
                     </Tooltip>
                </IconButton>
            </div>
            

           </div>

            </div>
           
        </div>
    )
}
