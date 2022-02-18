import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
// import { Navigate } from 'react-router-dom';
import useSWR from 'swr';
import Product from './Product';
import { useStateValue } from './stateProvider';
import CircularProgress from '@mui/material/CircularProgress';

function Page ({ index }) {
    const [{}, dispatch]= useStateValue();
    // const [data, setData]=useState([]);
    const indexUrl=`/api/products?page=`;

    const [url, setUrl]= useState(indexUrl+1)
    const fetcher = url => fetch(url).then(r => r.json())
    const { data } = useSWR(url, fetcher);
    const categories=[
        {name:'tout',url:""},{name:'Literie',url:"literie"},
    ]
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
    useEffect(() => { setUrl(indexUrl+index)}, [index]);
    useEffect(() => {
        productElementsArray.length > 1 && dispatch({
            type:'SET_LENGTH',
            length: productElementsArray.length
        })
    }, [productElementsArray.length]);

    return (
        <>
        {!data ?
            <div className='w-full text-center text-3xl mt-6'>
                <h2 className='mb-3'> Chargement des produits </h2>
                <CircularProgress sx={{color:'#f472b6'}}/>
            </div> :
            <div className='w-screen flex flex-col items-center p-3'>
                <div className='text-5xl text-pink-400 m-2 w-full text-center mb-4'>Produits</div>
                <div>
                    {categories.map(cat=>
                    <button 
                        onClick={()=>{console.log(indexUrl+1+'?cat='+cat.url);setUrl(indexUrl+1+'&cat='+cat.url)}}
                    >
                        {cat.name}
                    </button>)}
                </div>
                <div 
                className=" flex items-center gap-y-10 gap-x-1 flex-col md:flex-row flex-wrap mb-8 md:justify-center"
                >
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
    // const [pageIndex, setPageIndex] = useState(parseInt(1));
    const [{length, pageIndex}, dispatch]= useStateValue();

    function setPageIndex(index){
        dispatch({
            type:'SET_PAGE_INDEX',
            pageIndex: index
          })
    }
    useEffect(() => {
        // dispatch({
        //     type:'SET_PAGE_INDEX',
        //     index: pageIndex
        //   })
        // indexProvider(pageIndex);
        // console.log(pageIndex)
      }, [pageIndex]);
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
