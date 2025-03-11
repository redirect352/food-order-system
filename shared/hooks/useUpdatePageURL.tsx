import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useUpdatePageURL() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  function updateURL(paramName:string[], paramValue: string[]): void;
  function updateURL(paramName:string, paramValue: string): void;
  function updateURL(paramName: unknown, paramValue: unknown): void {
    const params = new URLSearchParams(searchParams);
    if (typeof paramName === 'string' && typeof paramValue === 'string') {
      if (paramValue !== '') {
          params.set(paramName, paramValue);
      } else params.delete(paramName);
    } else if (Array.isArray(paramName) && Array.isArray(paramValue)) {
      paramName.forEach((name, index) => {
        const value = paramValue[index];
        params.delete(name);
        if (value!== '') {
          params.set(name, paramValue[index].toString());
        }
      });
    }
    replace(`${pathname}?${params.toString()}`);
  }
  return {
    updateURL,
  };
}
