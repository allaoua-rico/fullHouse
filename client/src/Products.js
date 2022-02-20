import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import Product from './Product';
import { useStateValue } from './stateProvider';
import CircularProgress from '@mui/material/CircularProgress';

function Page ({ index }) {
    const [{}, dispatch]= useStateValue();
    const [categories, setCategories]=useState();
    const baseUrl=`/api/products?page=`;

    const [url, setUrl]= useState(baseUrl+1)
    const fetcher = url => fetch(url).then(r => r.json())
    const { data } = useSWR(url, fetcher);

    let i=0 ;
    let productElementsArray=[];

    function setUrlIndexAndCat(index,cat){
        //fct that take params: index and cat and change only one of them or both

        // const currentIndex= url.split('?page=')[1];
        const currentCat= url.split('&cat=')[1] || " "
        if(currentCat!==cat && cat!=="") { 
            dispatch({
                type:'SET_PAGE_INDEX',
                pageIndex: 1
              })
            setUrl(baseUrl+index+'&cat='+cat)
        }else{
            setUrl(baseUrl+index+'&cat='+currentCat)
        }
    }
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

    useEffect(() => {  setUrlIndexAndCat(index,'')}, [index]);

    useEffect(() => {
        productElementsArray?.length && dispatch({
            type:'SET_LENGTH',
            length: productElementsArray.length
        })
    }, [productElementsArray.length]);

    useEffect(() => { 
        fetch('/api/getCategories')
        .then(res=>res.json())
        .then(data=>setCategories(data))
    }, []);

    return (
        <>
        {!data ?
            <div className='w-full text-center text-3xl mt-6'>
                <h2 className='mb-3'> Chargement des produits </h2>
                <CircularProgress sx={{color:'#f472b6'}}/>
            </div> :
            <div className='w-screen flex flex-col items-center p-3'>
                <div className='text-5xl text-pink-400 m-2 w-full text-center mb-4'>Produits</div>
                <div
                className='font-semibold text-lg mb-4'
                >Filtrer selon la catégorie:</div>
                <div className='flex gap-x-3 mb-4' >
                    <button
                    className='hover:text-pink-400'
                    onClick={()=>{
                        setUrlIndexAndCat(1,' ')
                        }}>
                        Tout
                    </button>
                    {categories?.map(cat=>
                    <button 
                        className='hover:text-pink-400'
                        onClick={()=>{
                            setUrlIndexAndCat(1,cat.name)
                        }}
                    >
                        {cat.name}
                    </button>)}
                </div>
                <div className=" flex items-center gap-y-10 gap-x-1 flex-col md:flex-row flex-wrap mb-8 md:justify-center">
                    {productElementsArray?.map(product=>{
                        return (
                        <div className="md:basis-1/2 max-w-md">
                            {product}
                            <hr className='md:hidden h-3 bg-pink-200 w-32 rounded-lg mb-8 mt-8 mx-auto'/>
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
    const [{length, pageIndex}, dispatch]= useStateValue();

    function setPageIndex(index){
        dispatch({
            type:'SET_PAGE_INDEX',
            pageIndex: index
          })
    }
    return (
        <div  >
            <Page index={pageIndex}/>
            <div className='w-full flex justify-center gap-x-3 mb-10'>
                <Button color='warning'
                disabled = {pageIndex==1 ? true : false}
                variant="outlined" id="previous" 
                onClick={() => {setPageIndex(pageIndex - 1); window.scrollTo({top: 0, left: 0,behavior: "smooth"}) }}>
                    Previous</Button>
                <Button color='warning'
                disabled = {length<12 ? true : false}
                variant="outlined" id='next' 
                onClick={() => {setPageIndex(pageIndex + 1); window.scrollTo({top: 0, left: 0,behavior: "smooth"})}}>
                    Next</Button>
            </div>
        </div>
    )
}
