import PropertiesPage from "../page";
import type { SearchParams } from "@/lib/properties/query";
export const metadata = {title:"Properties to rent in Oldham",alternates:{canonical:"/properties/to-rent"}};
export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {return <PropertiesPage searchParams={Promise.resolve({...await searchParams,mode:"rent"})}/>;}
