import { describe, expect, it } from "vitest";

import {
  exampleFlagSet,
  exampleStringSet,
  loadingFlagDown,
  loadingFlagUp,
} from "../../src/utils/storeHelper";
import { exampleReducer } from "../../src/utils/storeHelper/slices/exampleSlice";
import { loadingReducer } from "../../src/utils/storeHelper/slices/loadingSlice";

describe("example slice", () => {
  it("初期状態を返す", () => {
    expect(exampleReducer(undefined, { type: "unknown" })).toEqual({
      exampleFlag: false,
      exampleString: "",
    });
  });

  it("exampleFlagを更新する", () => {
    const state = exampleReducer(undefined, exampleFlagSet(true));

    expect(state).toEqual({ exampleFlag: true, exampleString: "" });
  });

  it("exampleStringを更新する", () => {
    const state = exampleReducer(undefined, exampleStringSet("updated"));

    expect(state).toEqual({ exampleFlag: false, exampleString: "updated" });
  });
});

describe("loading slice", () => {
  it("初期状態を返す", () => {
    expect(loadingReducer(undefined, { type: "unknown" })).toEqual({
      count: 0,
    });
  });

  it("loadingFlagUpの回数だけカウントを増やす", () => {
    const firstState = loadingReducer(undefined, loadingFlagUp());
    const secondState = loadingReducer(firstState, loadingFlagUp());

    expect(secondState.count).toBe(2);
  });

  it("loadingFlagDownでカウントを減らす", () => {
    const state = loadingReducer({ count: 2 }, loadingFlagDown());

    expect(state.count).toBe(1);
  });

  it("カウントを0未満にしない", () => {
    const state = loadingReducer({ count: 0 }, loadingFlagDown());

    expect(state.count).toBe(0);
  });
});
