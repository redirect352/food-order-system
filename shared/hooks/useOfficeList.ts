import { useGetFullOfficeListQuery } from "@/lib/api/adminApi";
import { useGetCanteenListQuery } from "@/lib/api/moderatorApi";
import { useGetOfficesListQuery } from "@/lib/api/registrationApi";

export function useOfficeList(officeType: 'canteen' | 'office' | 'all') {
  switch(officeType){
    case 'canteen' : return useGetCanteenListQuery();
    case 'office' : return useGetOfficesListQuery();
    case 'all': return useGetFullOfficeListQuery();
    default: return useGetOfficesListQuery();
  }
}
