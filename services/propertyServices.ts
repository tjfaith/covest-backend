import { prismaClient } from "@/database";
import { AllPropertiesQuery, CreatePropertyInstance } from "@/interfaces";
import { PropertyType } from "@/interfaces/propertyInterface";

import { uploadImage } from "@/services";

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
