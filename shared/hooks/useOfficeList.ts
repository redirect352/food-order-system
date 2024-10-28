import { useGetCanteenListQuery } from "../../lib/api/moderatorApi";
import { useGetOfficesListQuery } from "../../lib/api/registrationApi";

export function useOfficeList(isCanteen: boolean) {
  if(isCanteen){
    return useGetCanteenListQuery();    
  }else{
    return useGetOfficesListQuery();
  }

}
