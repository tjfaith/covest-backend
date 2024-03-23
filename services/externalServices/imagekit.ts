import ImageKit from "imagekit";
import fs from "fs";
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
});

export const uploadImage = async (file: any, folder: string) => {
  return await imagekit.upload({
    file: fs.createReadStream(file.path),
    fileName: file.filename,
    folder,
  });
};

export const updateImage = async (file: any, folder: string) => {
  try{
  if (file.id) {
    await imagekit.deleteFile(file.id);
    return await imagekit.upload({
      file: fs.createReadStream(file.path),
      fileName: file.filename,
      folder,
    });
  } else {
    return await imagekit.upload({
      file: fs.createReadStream(file.path),
      fileName: file.filename,
      folder,
    });
  }
}catch(error){
  throw new Error(`Error while uploading image: ${error}`);
}
};

export const deleteImage = async (file_id: string) => {

  try {
    const deleted_data = await imagekit.deleteFile(file_id);
    return {
      status:true,
      response_message:'File deleted successfully',
      data:deleted_data
    };
  } catch (error:any) {
    return {status:false, response_message:{file_id, message: error.message}};
  }
    
};