import { useSearchParams } from 'next/navigation';

export function useArraySearchParamValue<T>(
  paramName: string,
  transformFunction?: (item: string) => T) :T[] | null {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName);
  if (currentValue !== null) {
    const array = currentValue.split(',');
    if (transformFunction) {
      return array.map(val => transformFunction(val));
    }
    return array as T[];
  }
  return null;
}
