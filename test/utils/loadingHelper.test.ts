import { beforeEach, describe, expect, it } from "vitest";

import { withGlobalLoading } from "../../src/utils/loadingHelper";
import { loadingFlagDown, store } from "../../src/utils/storeHelper";

const resetLoadingCount = () => {
  while (store.getState().loading.count > 0) {
    store.dispatch(loadingFlagDown());
  }
};

describe("withGlobalLoading", () => {
  beforeEach(resetLoadingCount);

  it("returns the task result and closes loading after success", async () => {
    const result = await withGlobalLoading(() => Promise.resolve("completed"));

    expect(result).toBe("completed");
    expect(store.getState().loading.count).toBe(0);
  });

  it("closes loading and rethrows when the task fails", async () => {
    const error = new Error("failed");

    await expect(withGlobalLoading(() => Promise.reject(error))).rejects.toBe(
      error,
    );
    expect(store.getState().loading.count).toBe(0);
  });

  it("keeps loading visible until every concurrent task finishes", async () => {
    let finishFirst: (() => void) | undefined;
    let finishSecond: (() => void) | undefined;
    const firstTask = new Promise<void>((resolve) => {
      finishFirst = resolve;
    });
    const secondTask = new Promise<void>((resolve) => {
      finishSecond = resolve;
    });

    const first = withGlobalLoading(() => firstTask);
    const second = withGlobalLoading(() => secondTask);
    expect(store.getState().loading.count).toBe(2);

    finishFirst?.();
    await first;
    expect(store.getState().loading.count).toBe(1);

    finishSecond?.();
    await second;
    expect(store.getState().loading.count).toBe(0);
  });
});
