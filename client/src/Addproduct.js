import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import { useStateValue } from './stateProvider';
import { useNavigate } from 'react-router-dom';
export default function Addproduct() {
    const [{ user}, dispatch]= useStateValue();

    const [productReturned, setProductReturned]= useState();
    const [imagesArray, setImagesArray]= useState([]);
    const [filesArray, setFilesArray]= useState([]);
    const [disabled, setDisabled]= useState(false);

    const navigate = useNavigate();

    const Input = styled('input')({
        display: 'none',
      });

    function handleInputChange(e) {
        e.preventDefault();
        let tempArray=Array.from(e.target.files);
        setFilesArray([...tempArray,...filesArray])
        document.getElementById('images').value = "";
    }
    function deleteImage(index){
        let tempArray=[...filesArray];
        filesArray.splice(index,1);
        setFilesArray([...filesArray]);
    }
    useEffect(() => {
        let images=filesArray.map(file=>{
        // create images from files
        let src =URL.createObjectURL(file)
        return src
        });
        setImagesArray(  [...images] );
    }, [filesArray])
    function handleSubmit(e){
        setDisabled(true);
        e.preventDefault();
        const form = e.target;
        let product= new FormData(form);
        for(let i =0; i < filesArray.length; i++) {
            product.append('images', filesArray[i]);
        }
        // filesArray.map(file=>{
        //     product.append('images[]', file);

        // })
        // for(var i of product.entries()){
        //     console.log(i)
        // }
       if ( filesArray.length >0  )
       { fetch("/api/addProduct",{
                method:"POST",
                headers:{
                    "x-access-token": user.token,
                    
                },
                body:product
        })
            .then(res => res.json())
            .then( (data) =>{ 
                console.log(data)
                setProductReturned(data)
                if(data._id ) {navigate(`/details?id=${data._id}`)}
            })}
            else{
                alert('Please add at least a picture')
            }

    }
    useEffect(() => {
        (user?.username===null || user?.username===undefined) && navigate('/');
    }, [user]);
    
    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
           <h1 className="text-5xl"> Add a product </h1>
           <br />
           <form className='sm:flex sm:flex-wrap' method="post" onSubmit={e=>handleSubmit(e)}>
               <div className="w-full sm:w-1/2 px-3 mb-6  ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Title</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="title" required/>
                </div>
                <div className="w-full sm:w-1/2 px-3 mb-6  ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Price</label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="number" name="price" required/>
                </div>
                <div className="w-full sm:w-1/2 px-3 mb-6  ">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Description</label>
                    <textarea  className="min-h-[200px] ppearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"  name="desc"/>
                </div>
                <div className="w-full sm:w-1/2 px-3 mb-6  ">
                    <label className=" uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-4">Image:</label>
                    <label htmlFor="images">
                        <Input multiple  accept="image/*" id="images" name="images" type="file" name="images" onChange={e=>handleInputChange(e)}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </div>
                <Button disabled={disabled} className='w-full sm:w-1/2 px-3 mb-6 ' variant="contained" type="submit" endIcon={<AddIcon />}>
                    Add The Product
                </Button>
           </form>
           <br />
            {imagesArray?.length>0 && <h1 className='text-3xl'>Images :</h1>}
            <br />
            <div className=' md:flex md:flex-row  md:flex-wrap'>
            {typeof imagesArray !== 'undefined' && imagesArray?.map((image,index)=>{
                return (
                    <div className='flex flex-col md:px-5 my-16 md:basis-1/2 lg:basis-1/3 xl:basis-1/4' >
<                       img src={image}></img>
                        <Button key={index} color='error' variant="contained"  onClick={(e)=> deleteImage(index)}>Delete </Button>
                    </div>
                )
            })}
            </div>
        </div>
    )
}
