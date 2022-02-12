import React, { useEffect, useState } from 'react'
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import { Button } from '@mui/material';
import config from './config';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from 'swr'
import { Link, useSearchParams } from "react-router-dom";
import { useStateValue } from './stateProvider';


export default function Details() {
    const [{basket, user}, dispatch]= useStateValue();

    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    // const [productReturned, setProductReturned]= useState()
    let [searchParams, setSearchParams] = useSearchParams();
    const id=searchParams.get('id')


    const fetcher = (url) => fetch(url)
      .then(res => res.json())

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleStepChange = (step) => {
        setActiveStep(step);
      };
        const { product, isLoading, isError } = useProduct(id)

    
    function useProduct (id) {
        // const { data, error } = useSWR(`${config.API_URI}/details/${id}`, fetcher)
        const { data, error } = useSWR(`/api/details/${id}`, fetcher)

        return {
          product: data,
          isLoading: !error && !data,
          isError: error
        }
      }
      
    //   console.log(product)
      
    return (
        <div className="flex flex-col md:flex-row  md:items-start items-center w-full px-4 ">
        <div className="w-11/12 py-8 relative flex flex-col items-center justify-center basis-3/4">
            <div className="flex w-full justify-between absolute">
                <Button  
                    sx={{zIndex:10}}
                    onClick={handleBack}
                    disabled={activeStep === 0}>
                    {theme.direction === 'rtl' ? (
                    <ArrowForwardIosIcon/>
                    ) : (
                    <ArrowBackIosIcon  />
                    )}
                    
                </Button>
                <Button
                    sx={{zIndex:10}}
                    onClick={handleNext}
                    disabled={activeStep === product?.imagesArray?.length - 1}
                >
                    {theme.direction === 'rtl' ? (
                    <ArrowBackIosIcon />
                    ) : (
                    <ArrowForwardIosIcon />
                    )}
                </Button>
            </div>
            <div className="w-full">
                <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents 
                resistance
                slideStyle={
                    {
                        width:"100%",
                    display:"flex",
                    justifyContent: 'center'
                    }}
                >
                    {product?.imagesArray?.map(image=>{
                        return <img key={image} className="rounded-3xl  object-contain" style={{maxHeight:700}} src={image} alt={product?.title} />
                    })}
                    
                </SwipeableViews>
                <div className="w-full flex justify-center">
                    <MobileStepper
                    sx={{  background:  'transparent'}}
                    steps={product?.imagesArray?.length}
                    position="static"
                    activeStep={activeStep} />
                </div>
             
            </div>
         </div>
    
            <div className="w-full p-8 flex flex-col gap-y-4  md:mt-12 basis-1/4">
                <h1 className="text-left text-4xl font-bold	font-sans">{product?.title}</h1>
                {user?.token && (<Link to={`/update?id=${id}`}> <Button color='warning' variant="contained" className='w-40'>Update</Button></Link>)}
                

                {/* remove this line when finished */}
                {/* <Link to={`/update?id=${id}`}> <Button color='warning' variant="contained" className='w-40'>Update</Button></Link> */}
                <hr className="border border-black border-solid w-16" ></hr>
                <h2 className="text-pink-400 text-xl font-semibold italic">{product?.price} DA</h2>
            </div>
        
        </div>
    )
}
