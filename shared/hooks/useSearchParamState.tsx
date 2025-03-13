import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import {useSearchParamValue, useUpdatePageURL} from '@/shared/hooks';

export function useDebouncedSearchParamState(
  key: string,
  debounceTime: number,
  resetParams?: [string,string][]
) : [string, Dispatch<SetStateAction<string>>, string] {
  const searchQueryParam = useSearchParamValue<string>(key);
  const [searchString, setSearchString] = useState(searchQueryParam ?? '');
  const [debouncedValue] = useDebouncedValue(searchString, debounceTime);
  const {updateURL} = useUpdatePageURL();
  useEffect(()=>{
    if(searchQueryParam!==debouncedValue){
      if(!resetParams || resetParams.length===0)
        updateURL(key,debouncedValue);
      else
        updateURL(
          [key, ...resetParams.map((item) => item[0])], 
          [debouncedValue, ...resetParams.map((item) => item[1])]
        );
    }
  },[debouncedValue])
  return [searchString, setSearchString, debouncedValue];
}

export function useSearchParamState(key: string, resetParams?: [string,string][]):
[string, Dispatch<SetStateAction<string>>] {
  const searchQueryParam = useSearchParamValue<string>(key);
  const [searchString, setSearchString] = useState(searchQueryParam ?? '');
  const { updateURL } = useUpdatePageURL();
  useEffect(()=>{
    if(searchQueryParam !== searchString){
      if(!resetParams || resetParams.length===0)
        updateURL(key,searchString);
      else
        updateURL(
          [key, ...resetParams.map((item) => item[0])], 
          [searchString, ...resetParams.map((item) => item[1])]
        );
    }
  },[searchString])
  return [searchString, setSearchString];
}