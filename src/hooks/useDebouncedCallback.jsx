import { useMemo, useEffect } from 'react';
import { debounce } from 'lodash';

const useDebouncedCallback = (callback, delay = 500) => {
  const debouncedFn = useMemo(() => debounce(callback, delay), [callback, delay]);

  useEffect(() => {
    return () => {
      debouncedFn.cancel(); 
    };
  }, [debouncedFn]);

  return debouncedFn;
};

export default useDebouncedCallback;
