import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import Product from './Product';
import { useStateValue } from './stateProvider';

function Page ({ index }) {
  const [{length}, dispatch]= useStateValue();
    const fetcher = url => fetch(url).then(r => r.json())
    const { data } = useSWR(`/api/products?page=${index}`, fetcher);
    let i=0 ;
    let productElementsArray=[];
    if(data){
        data.map(productElement=>{
            productElementsArray.push(
                <Product 
                id={data[i]._id}
                title={data[i].title} 
                price={data[i].price}
                image={data[i].imagesArray[0]}
                /> 
            )
            i++;
        })
    }
 useEffect(() => {
     productElementsArray.length > 1 && dispatch({
        type:'SET_LENGTH',
        length: productElementsArray.length
      })
 }, [productElementsArray.length]);
    return (
        <>
        {!data ? <div>Loading</div> :
            <div className='w-screen flex flex-col items-center'>
                <div className='text-3xl m-2 w-full text-center'>Produits</div>
                <div 
                className=" flex items-center flex-col md:flex-row flex-wrap mb-8 md:justify-center"
                >
                    {productElementsArray?.map(product=>{
                        return (
                            
                        <div className="md:basis-1/2 max-w-md">
                            {product}

                        </div>
                        )
                    })}
                </div>
            </div>
            }
            </>
    )
  }

export default function Products() {
    const [pageIndex, setPageIndex] = useState(parseInt(2));
    const [{length}, dispatch]= useStateValue();
    useEffect(() => {
        console.log('pageIndex',pageIndex)
      }, [pageIndex]);
    return (
        <div >
            <Page index={pageIndex}/>
            <div className='w-full flex justify-center gap-x-3'>
                <Button color='warning'
                disabled = {pageIndex==1 ? true : false}
                variant="outlined" id="previous" onClick={() => setPageIndex(pageIndex - 1)}>Previous</Button>
                <Button color='warning'
                disabled = {length<12 ? true : false}
                variant="outlined" id='next' onClick={() => setPageIndex(pageIndex + 1)}>Next</Button>
            </div>

        </div>
    )
}
