const cloudinary = require('cloudinary')
// Configuration 
cloudinary.config({
    cloud_name: "dewnfvlis",
    api_key: "259829616915778",
    api_secret: "dOpMr4sCLf1YcwUDCLT-DtV5GnQ"
  });

 
  const cloudinaryUploadImg = async(filToUpload)=>{
    return new Promise((resolve,reject)=>{
        cloudinary.uploader.upload(filToUpload,(result)=>{
            resolve({
                url:result.secure_url
            },
            {
                resource_type:"auto"
            }
            )
        })
    })
  }


  module.exports = cloudinaryUploadImg