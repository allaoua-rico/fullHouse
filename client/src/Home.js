import React, { useEffect, useState } from 'react'
import './styleSheets/home.css'
import Product from './Product';
import config from './config';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {
    const [productsReturned, setProductsReturned]= useState()

    useEffect(() => {
        // fetch(`${config.API_URI}/api`)
        fetch(`/api`)
        .then(res => res.json())
        .then( (data) =>{ 
            // console.log(data)
            setProductsReturned(data)
        })
    }, []);
    let i=0 ;
    let productElementsArray=[];
    if(productsReturned){
        productsReturned.map(productElement=>{
            productElementsArray.push(
                <Product 
                id={productsReturned[i]._id}
                title={productsReturned[i].title} 
                price={productsReturned[i].price}
                image={productsReturned[i].imagesArray[0]}
                /> 
            )
            // console.log(productsReturned[i].imagePath)
            i++;
        })
        // console.log(productElementsArray)
    }
    useEffect(() => {
    //  console.log(productsReturned)
    }, [productsReturned])
    return (
        <div 
        className="flex flex-col "
        >
                <div className="home_image "  >
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
                {!productsReturned ? 
                <div className='w-full text-center text-3xl mt-6'>
                    
                    <h2 className='mb-3'> Chargement des produits </h2>
                    <CircularProgress sx={{color:'#f472b6'}}/>
                </div> :

                <div className=' flex flex-col items-center'>
                    <div className='text-5xl text-pink-400 m-2 w-full text-center my-10'>Produits</div>
                    <div className=" flex items-center flex-col md:flex-row flex-wrap mb-8 md:justify-center ">
                        {productElementsArray?.map(product=>{
                            return (
                            <> 
                            <div className="md:basis-1/2 w-screen max-w-md ">
                                {product}
                            </div>
                            <hr className='sm:hidden h-3 bg-pink-200 w-32 rounded-lg mb-8 mt-8 mx-auto'/>

                            </>
                           
                                )
                        })}
                    </div>
                    <Link className='mb-8' to={'/products'}>
                        <Button style={{backgroundColor:'#ffe0b2', color:'black'}}  variant="contained" > Voir plus de Produits</Button>
                    </Link>
                </div>
                
                }
            </div>
    )
}
