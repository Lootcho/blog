const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
    cloud_name: 'dlylwey8j', 
    api_key: '277688424128538', 
    api_secret: 'rRbjIz_K1VnxhIRfcjurwcTNglg' 
  });

  const uploadImage = async (filePath, file) => {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: file,
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  
  module.exports = { uploadImage };