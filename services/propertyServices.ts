import { Prisma, prismaClient } from "@/database";
import { AllPropertiesQuery, CreatePropertyInstance, UpdatePropertyInstance } from "@/interfaces";
import { PropertyType } from "@/interfaces/propertyInterface";

import { deleteImage, uploadImage } from "@/services";

export const newProperty = async (propertyData: CreatePropertyInstance) => {
  try {
    const images = [];
    if (propertyData.files) {
      for (const file of propertyData.files) {
        const result = await uploadImage(file, "COvest/property");
        images.push(result);
      }
    }
    delete propertyData.files;
    const propertyPayload = {
      ...propertyData,
      total_units:  Number(propertyData.total_units),
      roi: Number(propertyData.roi),
      price: parseFloat(propertyData.price),
      images: JSON.stringify(images),
      property_details:typeof propertyData.property_details === 'string' ? propertyData.property_details : JSON.stringify(propertyData.property_details)
    };

    const property = await prismaClient.property.create({
      data: propertyPayload,
    });

    return {
      status: 201,
      message: "Property created successfully",
      data: property,
    };
  } catch (error) {
    return {
      status: 500,
      message: "internal server error",
      data: error,
    };
  }
};

export const getAllProperties = async (propertyQuery: AllPropertiesQuery) => {
  try {
    const { pageNumber = 1, pageSize = 10, propertyType } = propertyQuery;

    const skip = (pageNumber - 1) * pageSize;

    const where = propertyType
      ? { property_type: propertyType as PropertyType }
      : undefined;

    const totalItems = await prismaClient.property.count({ where });
    const totalPages = Math.ceil(totalItems / pageSize);

    const properties = await prismaClient.property.findMany({
      skip,
      take: pageSize,
      where,
      include: {
        retailer: true,
      },
    });

    return {
      status: 200,
      message: "properties retrieved successfully",
      data: {
        properties,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalItems,
        },
      },
    };
  } catch (error) {
    return {
      status: 500,
      message: "Error fetching properties:",
      data: error,
    };
  }
};

export const singleProperty = async (propertyId: string) => {
  try {
    const property = await prismaClient.property.findUnique({
      where: { id: propertyId },
      include: {
        retailer: true,
      },
    });

    if (!property) {
      return { status: 404, message: 'Property not found' }
    }

    return {
      status: 200,
      message: 'Property retrieved successfully ',
      data: property
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Internal Server Error',
      data: error
    }
  }
}

export const updateRetailerProperty = async(propertyData:UpdatePropertyInstance)=>{
  try{ 
    const retailer = await prismaClient.user.findUnique({
    where:{id:propertyData.retailer_id}
  })

  const property = await prismaClient.property.findUnique({
    where:{id:propertyData.property_id}
  })

  if(!retailer){
    return {
      status:404,
      message:'The author of this property is not be found'
    }
  }

  if(retailer.id !== property?.retailer_id && retailer.role ==='retailer'){
    return {
      status:401,
      message:'You can\'t update this property'
    }
  }

  if(!property){
    return {
      status:404,
      message:'property not be found'
    }
  }

  let property_images = JSON.parse(property.images)

  let file_responses = []
  if(propertyData.images_to_delete){
    for (const file_id of propertyData.images_to_delete) {
      const delete_file = await deleteImage(file_id);
      if(delete_file.status === false){
        file_responses.push(delete_file.response_message)
      }else{
        property_images = property_images.filter((item: { fileId: string; }) => item.fileId !== file_id);
      }
    }
  }

  const images = [];
  if (propertyData.files) {
    for (const file of propertyData.files) {
      const result = await uploadImage(file, "COvest/property");
      images.push(result);
    }
    property_images.push(...images)
  }

  propertyData.images= JSON.stringify(property_images)

  const { property_id, images_to_delete, files, ...rest } = propertyData;
  const updated_property = {...property, ...rest}
  const { id, created_at, updated_at, price,property_details, ...updateData } = updated_property;

  const updatedProperty = await prismaClient.property.update({
    where: { id: property_id },
    data: {
      ...updateData,
      total_units: Number(updateData.total_units) || property.total_units,
      roi:Number(updateData.roi) || property.roi,
      price: typeof price === 'string' ? parseFloat(price) : price,
      property_details: typeof property_details === 'string' ? property_details : JSON.stringify(property_details),
    },
    
  });

  return{
    status:200,
    message:'Property updated successfully',
    data:{updatedProperty, file_responses}
  }
  }catch(error){
    return{
      status:500,
      message:"Internal Server Error",
      data:error
    }
  }
}

export const deleteSingleProperty = async (payload: Record<string, string>) => {
  try {

    const retailer = await prismaClient.user.findUnique({
      where: { id: payload.retailer_id }
    });

    const property = await prismaClient.property.findUnique({
      where: { id: payload.property_id }
    });

    if (!property) {
      return { status: 404, message: 'Property not found' }
    }

    if(retailer?.role ==='retailer' && retailer?.id !== property.retailer_id){
      return {status:401, message:'You are not authorized to delete this property, contact admin'}
    }

    const paymentsCount = await prismaClient.payment.count({
      where: {
        property_id: property.id,
      },
    });




    let property_images = JSON.parse(property.images)
    if(property_images.length>0){
      for (const image of property_images) {
         await deleteImage(image.fileId);
      }
    }

  if (paymentsCount > 0) {
    
    await prismaClient.payment.deleteMany({
      where: {
        property_id: property.id,
      },
    });
  }


    const deletedProperty = await prismaClient.property.delete({
      where:{
        id:property.id
      }
    })
    return {
      status: 200,
      message: 'Property deleted successfully ',
      data: deletedProperty
    }
  } catch (error) {
    return {
      status: 500,
      message: 'Internal Server Error',
      data: error
    }
  }
}