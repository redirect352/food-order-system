import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
  const [user] = useState<any | null>(null);

  useEffect(() => {
    //not-realized
  }, []);
  return { user };
};
