import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function useUpdatePageURL() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const updateURL = (paramName:string, paramValue: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(paramName, paramValue);
      replace(`${pathname}?${params.toString()}`);
  };
  return {
    updateURL,
  };
}
