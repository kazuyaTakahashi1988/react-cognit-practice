import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";

import { store, useGlobalLoading } from "../../src/utils/storeHelper";

import type React from "react";

const wrapper: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);

const createDeferred = <T,>() => {
  let resolve: (value: T) => void = () => undefined;
  let reject: (reason?: unknown) => void = () => undefined;
  const promise = new Promise<T>((promiseResolve, promiseReject) => {
    resolve = promiseResolve;
    reject = promiseReject;
  });

  return { promise, reject, resolve };
};

describe("useGlobalLoading", () => {
  it("処理の開始から完了までグローバルローディングを表示する", async () => {
    const deferred = createDeferred<string>();
    const { result } = renderHook(useGlobalLoading, { wrapper });

    const request = result.current.runWithGlobalLoading(() => deferred.promise);
    expect(store.getState().loading.count).toBe(1);

    deferred.resolve("completed");

    await expect(request).resolves.toBe("completed");
    expect(store.getState().loading.count).toBe(0);
  });

  it("処理が失敗した場合もグローバルローディングを終了する", async () => {
    const deferred = createDeferred<never>();
    const { result } = renderHook(useGlobalLoading, { wrapper });

    const request = result.current.runWithGlobalLoading(() => deferred.promise);
    expect(store.getState().loading.count).toBe(1);

    deferred.reject(new Error("request failed"));

    await expect(request).rejects.toThrow("request failed");
    expect(store.getState().loading.count).toBe(0);
  });
});
