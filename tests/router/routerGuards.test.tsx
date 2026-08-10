import { render, screen } from "@testing-library/react";
import { lazy, Suspense } from "react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { routeElement } from "../../src/router/guards";
import { AuthContext } from "../../src/utils/authHelper/authProvider";

import type { AppRoute, AuthContextValue } from "../../src/lib/types";

const TestPage = () => <h1>Protected content</h1>;
const LazyTestPage = lazy(() => Promise.resolve({ default: TestPage }));
const Location = () => <p data-testid="location">{useLocation().pathname}</p>;

const createRoute = (access: AppRoute["access"]): AppRoute => ({
  access,
  component: LazyTestPage,
  path: "/target",
  pageMeta: { description: "Guard test page", title: "Guard Test" },
});

const renderGuard = (
  access: AppRoute["access"],
  authState: Pick<AuthContextValue, "isChecking" | "isSignedIn">,
) =>
  render(
    <AuthContext.Provider
      value={{ ...authState, refreshAuthState: () => undefined }}
    >
      <MemoryRouter initialEntries={["/target"]}>
        <Location />
        <Suspense fallback={<p>Loading page</p>}>
          <Routes>
            <Route element={routeElement(createRoute(access))} path="/target" />
            <Route element={<p>Sign in destination</p>} path="/auth/signin" />
            <Route element={<p>Sign out destination</p>} path="/auth/signout" />
          </Routes>
        </Suspense>
      </MemoryRouter>
    </AuthContext.Provider>,
  );

describe("router guards", () => {
  it("未認証でauthページへアクセスするとサインインへリダイレクトする", async () => {
    renderGuard("auth", { isChecking: false, isSignedIn: false });

    expect(await screen.findByText("Sign in destination")).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("/auth/signin");
  });

  it("認証済みでguestページへアクセスするとサインアウトへリダイレクトする", async () => {
    renderGuard("guest", { isChecking: false, isSignedIn: true });

    expect(await screen.findByText("Sign out destination")).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("/auth/signout");
  });

  it("認証状態のchecking中はページやリダイレクト先を表示しない", () => {
    renderGuard("auth", { isChecking: true, isSignedIn: false });

    expect(screen.getByText("認証状態を確認しています...")).toBeVisible();
    expect(screen.queryByText("Protected content")).toBeNull();
    expect(screen.getByTestId("location")).toHaveTextContent("/target");
  });

  it("ガード条件を満たす場合はリダイレクトせず対象ページを表示する", async () => {
    renderGuard("auth", { isChecking: false, isSignedIn: true });

    expect(
      await screen.findByRole("heading", { name: "Protected content" }),
    ).toBeVisible();
    expect(screen.getByTestId("location")).toHaveTextContent("/target");
  });
});
