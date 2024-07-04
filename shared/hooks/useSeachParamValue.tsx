import { useSearchParams } from 'next/navigation';

export default function useSearchParamValue<T>(paramName: string) {
  const searchParams = useSearchParams();
  const currentValue = searchParams.get(paramName);
  if (currentValue !== null) {
    return currentValue as T;
  }
  return currentValue;
}
