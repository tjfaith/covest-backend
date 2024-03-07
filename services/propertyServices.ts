import { prismaClient } from "@/database";
import { AllPropertiesQuery, CreatePropertyInstance, UpdatePropertyInstance } from "@/interfaces";
import { PropertyType } from "@/interfaces/propertyInterface";

import { deleteImage, uploadImage } from "@/services";

export const newProperty = async (propertyData: CreatePropertyInstance) => {
  try {
    const images = [];
    console.log(propertyData)
    if (propertyData.files) {
      for (const file of propertyData.files) {
        const result = await uploadImage(file, "COvest/property");
        images.push(result);
      }
    }
    delete propertyData.files;
    const propertyPayload = {
      ...propertyData,
      price: parseFloat(propertyData.price),
      images: JSON.stringify(images),
      property_details: JSON.stringify(propertyData.property_details),
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

  console.log(property_images, 'PROPERTY IMAGES....')
  propertyData.images= JSON.stringify(property_images)
  const { property_id, images_to_delete, files, ...rest } = propertyData;

  const updated_property = {...property, rest}

  const updatedProperty = await prismaClient.property.update({
    where: { id: property_id },
    data: updated_property
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