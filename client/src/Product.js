
import { useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { useStateValue } from './stateProvider';
import { useTheme } from '@mui/material/styles';

// import './styleSheets/product.css'

export default function Product({id,title, image, price, rating}) {
    // const [{basket}, dispatch]= useStateValue();
    // console.log(id)
    // useEffect(() => {
    //    fetch()
    // }, []);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    console.log(matches)
    let styles={
        // color: 'white',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: "400px",
        height: "400px",
        backgroundImage:`url("${image}")`,
        overflow:"hidden",
        // filter: "blur(2px)"

    }
   
    // console.log(image)
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

                <p className="text-pink-400 text-center sm:my-4 my-3 sm:text-base text-xl">
                    <strong>{price}</strong> 
                    <small> DA</small>
                </p>

                {/* <div className="product__rating">
                    {Array(rating).fill().map(()=>{
                            return <p>⭐</p>
                        })}
                </div> */}
            </div>

           
            <Link className='transition duration-300 sm:translate-y-20	group-hover:translate-y-0'  to={`/details?id=${id}`}>
                <button className="bg-orange-100 border border-solid border-orange-200  h-10 px-2">Détails</button>
            </Link>
            </div>
           
        </div>
    )
}
