/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * External dependencies
 */
import { useCallback, useEffect, useRef } from 'react';

export const useSafeDispatch = (dispatch: any) => {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useCallback((...args: any) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
};
