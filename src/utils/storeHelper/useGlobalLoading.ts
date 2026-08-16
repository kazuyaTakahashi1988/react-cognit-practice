import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { loadingFlagDown, loadingFlagUp } from "./slices/loadingSlice";

import type { AppDispatch } from ".";

export const useGlobalLoading = () => {
  const dispatch = useDispatch<AppDispatch>();

  const runWithGlobalLoading = useCallback(
    async <T>(callback: () => Promise<T>) => {
      dispatch(loadingFlagUp());

      try {
        return await callback();
      } finally {
        dispatch(loadingFlagDown());
      }
    },
    [dispatch],
  );

  return { runWithGlobalLoading };
};
