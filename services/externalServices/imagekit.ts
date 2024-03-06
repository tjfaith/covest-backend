import ImageKit from 'imagekit'
import fs from 'fs'
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
  });

  export const uploadImage =async(file:any, folder:string)=>{
    return await imagekit.upload({
      file: fs.createReadStream(file.path), // Provide the file path or a readable stream
      fileName: file.filename,
      folder,
    });
  }