import { test } from "node:test";
import assert from "node:assert/strict";
import { propertySchema } from "../src/lib/properties/schema";
const draft = {
 reference:"QA-VALIDATION",title:"Validation fixture",listing_type:"rent",category:"Residential",property_type:"House",status:"Draft",
 address_line1:"Test address",address_line2:"",area:"",town:"Oldham",postcode:"OL1 1AA",latitude:"",longitude:"",price:1000,price_unit:"pcm",price_qualifier:"",
 deposit:"",holding_deposit:"",bedrooms:2,bathrooms:1,reception_rooms:1,furnishing:"",available_date:"",minimum_tenancy:"",council_tax:"",epc:"",summary:"",description:"",features:[],images:[],floorplan:"",brochure:"",featured:false,
};
test("drafts permit missing marketing content and preserve unknown optional information",()=>{
 const result=propertySchema.parse(draft); assert.equal(result.deposit,null); assert.equal(result.furnishing,"");
});
test("publishing requires actual description and image",()=>{
 assert.equal(propertySchema.safeParse({...draft,status:"Available"}).success,false);
 assert.equal(propertySchema.safeParse({...draft,status:"Available",description:"A sufficiently detailed property description for validation.",images:["11111111-1111-4111-8111-111111111111/22222222-2222-4222-8222-222222222222.webp"]}).success,true);
});
test("reject invalid prices, dates, counts, postcodes and unsafe links",()=>{
 for(const invalid of [{price:-1},{bedrooms:1.5},{available_date:"2026-02-31"},{postcode:"invalid"},{floorplan:"javascript:alert(1)"},{images:["../../secret"]},{status:"Hidden"}]) assert.equal(propertySchema.safeParse({...draft,...invalid}).success,false);
});
test("sale and rental statuses and price units cannot be mixed",()=>{
 assert.equal(propertySchema.safeParse({...draft,listing_type:"sale"}).success,false);
 assert.equal(propertySchema.safeParse({...draft,listing_type:"sale",price_unit:"sale"}).success,true);
 assert.equal(propertySchema.safeParse({...draft,status:"Sold"}).success,false);
});
