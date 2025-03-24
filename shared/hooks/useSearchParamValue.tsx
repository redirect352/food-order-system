import { useSearchParams } from 'next/navigation';

export default function useSearchParamValue<T>(
  paramName: string,
  transformFunction?: (item: string) => T,
  isArrayValue: boolean | undefined = false,
) {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName);
  if (currentValue !== null) {
    if (transformFunction) return transformFunction(currentValue);
    if(isArrayValue) return currentValue.split(',') as T;
    return currentValue as T;
  }
  return currentValue;
}

export function useSearchParamValues(
  paramNames: string[],
) {
  const searchParams = useSearchParams();
  let values = paramNames.map((name) => {
    let result = searchParams.get(name) ?? undefined;
    return result;
  });
  return values;
}