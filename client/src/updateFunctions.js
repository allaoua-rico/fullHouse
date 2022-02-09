export const removeProduct=(id)=>{
    let form=document.getElementById('remove_form');
    let fd= new FormData(form);
    fd.append('id', id)
    console.log(fd.get('id'))

    fetch('/remove',{
    method:"post",
    header:{
        "x-access-token": localStorage.getItem("token"),
    },
    body: fd
}
    )

}

export const deleteImage=(index,whichArray,pageImagesArray,setPageImagesArray,inputFiles,setInputFiles)=>{
// console.log(whichArray)
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

export function handleSubmit(e,filesArray,id,navigate){
e.preventDefault();
const form = e.target;
let formData = new FormData(form);
formData.append("title", document.getElementById('title').value)
formData.append("price", document.getElementById('price').value)

for(let i =0; i < filesArray.length; i++) {
    formData.append("images", filesArray[i]);
}
fetch(`/update/${id}`,{
    method:'POST',
    header:{
        "x-access-token": localStorage.getItem("token"),
    },
    body: formData
})
.then(res=>res.json())
.then(res=>console.log(res))
navigate(`/details?id=${id}`, { replace: true });
}

export function handleInputChange(e,setInputFiles,inputFiles){
e.preventDefault();
let array=Array.from(e.target.files);
setInputFiles([...inputFiles, ...array] );        
}

