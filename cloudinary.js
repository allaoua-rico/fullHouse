const cloudinary = require('cloudinary');
const dotenv=require('dotenv');
dotenv.config();

cloudinary.config({ 
    cloud_name: 'dwxiuhqh4', 
    api_key: '934751755851399', 
    api_secret: 'aOJRLhYwYdEIdouJTP59SqlaSTU' 
  });
  
exports.uploads = (file, folder) => {
  return new Promise(resolve => {
    cloudinary.uploader.upload(file, (result) => {
      resolve({
        url: result.url,
        id: result.public_id
      })
    }, {
      resource_type: "auto",
      folder: folder
    })
  })
}
