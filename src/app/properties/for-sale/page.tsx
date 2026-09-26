import PropertiesPage from "../page";
import type { SearchParams } from "@/lib/properties/query";
export const metadata = {title:"Properties for sale in Oldham",alternates:{canonical:"/properties/for-sale"}};
export default async function Page({searchParams}:{searchParams:Promise<SearchParams>}) {return <PropertiesPage searchParams={Promise.resolve({...await searchParams,mode:"buy"})}/>;}
