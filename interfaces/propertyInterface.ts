
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

export interface AllPropertiesQuery{
  pageNumber?:number;
  pageSize?:number;
  propertyType?:string 
}