import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useUpdatePageURL() {
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();
  const pathname = usePathname();
  function updateURL(paramName:string[], paramValue: string[]): void;
  function updateURL(paramName:string, paramValue: string): void;
  function updateURL(paramName: unknown, paramValue: unknown): void {
    const params = new URLSearchParams(searchParams);
    console.log([...params.entries()], paramName)
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
    console.log([...params.entries()])
    replace(`${pathname}?${params.toString()}`);
    // window.history.pushState(null,'',params.toString())
  }
  return {
    updateURL,
  };
}
