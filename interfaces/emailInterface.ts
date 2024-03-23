export interface EmailRequirement{
    from?: string ;
    to:string[];
    subject:string;
    text:string;
    template?:string;
}