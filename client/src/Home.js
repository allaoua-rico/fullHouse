import React, { useEffect, useState } from 'react'
import './styleSheets/home.css'
import Product from './Product';
import config from './config';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Footer from './Footer';
import Products from './Products';
import { useStateValue } from './stateProvider';

export default function Home() {
    const [{ pageIndex}]= useStateValue();
    // const [productsReturned, setProductsReturned]= useState()
    const [hideHome, setHideHome]= useState(false)

    // let i=0 ;
    // let productElementsArray=[];
    // if(productsReturned){
    //     productsReturned.map(productElement=>{
    //         productElementsArray.push(
    //             <Product 
    //             id={productsReturned[i]._id}
    //             title={productsReturned[i].title} 
    //             price={productsReturned[i].price}
    //             image={productsReturned[i].imagesArray[0]}
    //             /> 
    //         )
    //         i++;
    //     })
    // }
    useEffect(() => {
        pageIndex ==1 ? setHideHome(false) : setHideHome(true)   
    }, [pageIndex])
    return (
        <div 
        className="flex flex-col "
        >
                <div className={ hideHome ? "hidden": "home_image " }  >
                    <div className="relative h-full flex flex-col justify-center items-center  ">
                        <img className="h-full w-full object-cover object-left	" src="home_cover2.webp" alt="" />
                        
                        <p className="bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 text-white font-semibold p-2	bg-zinc-700  absolute mx-4 px-2 text-center rounded-3xl">
                        <span className="text-pink-400 ">  Full House Deco : </span>
                        <br></br>
                        <p className='mt-3'>
                        Votre boutique en ligne 🛒 qui contient tout ce qui concerne la décoration intérieure 🏠, lingeries, et vaisselle ☕, selon vos goûts avec des prix abordables
                        </p>
                        </p>
                    </div>
                </div >
                <Products />


                <Footer/>
            </div>
    )
}
