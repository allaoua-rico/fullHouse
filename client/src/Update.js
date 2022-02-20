import config from './config';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
// import DialogTitle from '@material-ui/core/DialogTitle';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useStateValue } from './stateProvider';
import { removeProduct,deleteImage, handleSubmit, handleInputChange } from './updateFunctions.js';
import Description from '@mui/icons-material/Description';
import MuiSelect from './components/MuiSelect'

// import { Dialog } from '@mui/material';
export default function Update() {
    const [{ user}, dispatch]= useStateValue();

    let [searchParams, setSearchParams] = useSearchParams();
    const id=searchParams.get('id')
    const [pageImagesArray, setPageImagesArray]= useState([]);
    const [fetchArray, setFetchArray]= useState([]);
    const [inputFiles, setInputFiles]= useState([]);
    const [inputImages, setInputImages]= useState([]);
    const [filesArray, setFilesArray]= useState([]);
    const [title, setTitle]= useState();
    const [price, setPrice]= useState();
    const [open, setOpen]= useState(false);
    const [product, setProduct]= useState();
    const [description, setDescription]= useState();
    const [disabled, setDisabled]= useState(false);
    const [categories, setCategories]= useState();
    const [selectedCat, setSelectedCat]= useState('');

    let navigate = useNavigate();

    const Input = styled('input')({
        display: 'none',
      });
    const removeProduct=()=>{
        setDisabled(true)
            let form=document.getElementById('remove_form');
            let fd= new FormData(form);
            fd.append('id', id)
            // console.log(fd.get('id'))
            fetch('/api/remove',{
            method:"post",
            header:{
                "x-access-token": user.token,
            },
            body: fd
        }
            ).then(res=>res.json())
            .then(res=> res==='deleted' && navigate('/'))

    }
    const deleteImage=(index,whichArray)=>{
        console.log(whichArray)
        if(whichArray==='server'){
            let temp=[...pageImagesArray]
            temp.splice(index,1);
            setPageImagesArray([...temp])
        }else if(whichArray==='input'){
            let temp=[...inputFiles]
            temp.splice(index,1);
            setInputFiles([...temp])
        }
    } 

    function handleSubmit(e){
        setDisabled(true)
        e.preventDefault();
        const form = e.target;
        let formData = new FormData(form);
        formData.append("title", document.getElementById('title').value)
        formData.append("price", document.getElementById('price').value)
        formData.append("desc", document.getElementById('desc').value)
        formData.append("cat", selectedCat)

        for(let i =0; i < filesArray.length; i++) {
            formData.append("images", filesArray[i]);
        }

        if ( filesArray.length >0  ){ 
        fetch(`/api/update/${id}`,{
            method:'POST',
            headers:{
                "x-access-token": user.token,
            },
            body: formData
        })
        .then(res=>res.json())
        .then(data=>{
            
            // console.log(data)
            if(data._id ) {navigate(`/details?id=${data._id}`)}

        })
    }
        // navigate(`/details?id=${id}`, { replace: true });}
    }
    function handleInputChange(e){
        e.preventDefault();
        let array=Array.from(e.target.files);
        setInputFiles([...inputFiles, ...array] );        
      }
      let i=0

    useEffect(async () => {
        //the function that convert the images to files
        const fetchImgs = async(imgUrl)=>{    
            let temp=await fetch('/api/cors/',{
                        method:'post',
                        body: JSON.stringify({"url": imgUrl}),
                        headers: {"Content-Type": "application/json"}})
            .then(res => res.blob())
            .then((blob) => {
                i++
                const file2 = new File([blob], "capture"+i+".png", {type: 'image/png'});
                return file2
            });
            return temp;
        }
        let temp= await Promise.all(pageImagesArray.map(async (imgUrl)=>{
            let temp2=await fetchImgs(imgUrl);
            return temp2
        })
        )
        setFetchArray([...temp])
    }, [pageImagesArray])

    useEffect(() => {
        if(typeof product !== 'undefined'){
            setPageImagesArray(product.imagesArray)
            setTitle(product.title)
            setPrice(product.price)
            setDescription(product.desc)
        }
    }, [product])
   
    useEffect(() => {
        const fetchData = async (id) => {
            // const data =  await fetch(`${config.API_URI}/details/${id}`).then(res=>res.json());
            const data =  await fetch(`/api/details/${id}?update=true`).then(res=>res.json());
            // console.log(data.product.category_id.name)
            setProduct(data.product);
            setCategories(data.cat)
        };
        fetchData(id);

    }, []);
    useEffect(() => {
       //function to display the images added
        let imagesArray=inputFiles.map(file=>{
            let src =URL.createObjectURL(file)
             return src
        })
        // console.log(imagesArray)

        setInputImages([...imagesArray]);
           /**
        added the line below to clean the input after getting the files, because if we delete an image ...
        and we try to get it again directly, the state of the input don't change
        and the function handleinputChange won't run
         */
        document.getElementById('images').value = "";
    }, [ inputFiles])

    useEffect(() => {
        setFilesArray([...fetchArray,...inputFiles])
  }, [fetchArray, inputFiles])
    useEffect(() => {
        // (user?.username===null || user?.username===undefined) && navigate('/');
    }, [user]);
    return (
        <div>
            <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title:</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" id="title" required value={title}
                            onChange={e=>setTitle(e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:w-1/2 px-3 mb-6 md:mb-0 ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Price:</label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" type="text" id="price" required value={price}
                            onChange={e=>setPrice(e.target.value)}/>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 mb-6  ">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description:</label>
                            <textarea  className="min-h-[200px] ppearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" value={description} id="desc" name="desc"
                            onChange={e=>setDescription(e.target.value)}
                            />
                        </div>
                        <div>
                            <MuiSelect 
                            selected={product?.category_id?.name}
                            id="category" 
                            returnValue={cat=>setSelectedCat(cat)} 
                            list={categories}/>
                        </div>
                    </div>
                    <div>
                        <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">Add An Image:</label>
                        <label htmlFor="images">
                            <Input multiple accept="image/*" id="images" name="images" type="file" name="images" onChange={handleInputChange}/>
                            <IconButton color="primary" aria-label="upload picture" component="span">
                                <PhotoCamera />
                            </IconButton>
                        </label>
                    </div>
                    <div >
                        <h2 className='text-4xl block uppercase tracking-wide text-gray-700 mt-4 font-bold mb-2'>Product Actual Images:</h2>
                        <div className="flex flex-row justify-center flex-wrap">
                            {typeof pageImagesArray !== 'undefined' && pageImagesArray?.map((image,index)=>{
                                let whichArray='server'
                                return (
                                <div className='flex flex-col items-center basis-1/2 sm:basis-1/3 lg:basis-1/4 px-4 mb-8 md:mb-0 my-4 '  key={index}>
                                    <img className="rounded shadow-md mb-4"  src={image}/>
                                    <Button key={index} color='error' variant="contained" onClick={(e)=> deleteImage(index,whichArray)}>Delete </Button>
                                </div>)
                            })}
                        </div>
                    </div>
                    <div >
                        <h2 className='text-4xl block uppercase tracking-wide text-gray-700 mt-4 font-bold mb-2'>Images Added:</h2>
                        <div className="flex flex-row justify-center flex-wrap">
                            {inputImages?.map((image,index)=>{
                                let whichArray='input'
                                return (
                                <div className='flex flex-col items-center basis-1/2 px-4 mb-8 md:mb-0 my-4 '  key={index}>
                                    <img className="rounded shadow-md mb-4"  src={image}/>
                                    <Button key={index} color='error' variant="contained" onClick={(e)=> deleteImage(index,whichArray)}>Delete </Button>
                                </div>)
                            })}
                        </div>
                    </div>
                <div>
                    <br />
                <h2 className='text-4xl block uppercase tracking-wide text-gray-700 mt-4 font-bold mb-2'>Confirm Changes Or <span className='text-red-600'>Delete The Product:</span></h2>
                <br />
                    <div className="flex flex-col items-center ">
                        <form  onSubmit={e=>handleSubmit(e)}>
                            <Button disabled={disabled} color='success' variant="contained" className='w-64' type='submit'>
                                Update changes
                            </Button>
                        </form>
                            <br />
                        <Button disabled={disabled} color='error' variant="contained" className='w-64' onClick={e=>{setOpen(true)}}>
                            Delete The Product
                        </Button>

                    </div>
                    <form id='remove_form' action="">
                        </form>
                        <Dialog open={open}>
                                <DialogTitle>Are you sure you want to remove this product</DialogTitle>
                                <button onClick={e=>removeProduct(id)}>Yes</button>
                                <button onClick={e=>setOpen(false)}>Cancel</button>
                        </Dialog>
                </div>
            </div>
            {/* <div>
                {
                    testArray?.map(img=>{
                    return <img className="rounded shadow-md mb-4"  src={img}/>
                    })
                }
            </div> */}
        </div>
    )
}
