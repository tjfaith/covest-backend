
export type PropertyType = 'general' | 'land'
export interface CreatePropertyInstance {
  title:string;
  description:string;
  price:string;
  images:any;
  property_type:PropertyType;
  property_details:Record<string, Record<string, string | number | boolean>>[];
  retailer_id:string;
  files:any
}

export interface UpdatePropertyInstance{
  property_id:string;
  images_to_delete?:string[];
  title?:string;
  description?:string;
  price?:string | number | undefined;
  images?:any;
  property_type?:PropertyType;
  property_details?:Record<string, Record<string, string | number | boolean>>[];
  retailer_id?:string;
  files?:any;
  total_units?:number
}



export interface AllPropertiesQuery{
  pageNumber?:number;
  pageSize?:number;
  propertyType?:string 
}