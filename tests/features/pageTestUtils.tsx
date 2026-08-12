import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { AuthContext } from "../../src/utils/authHelper/authProvider";
import { store } from "../../src/utils/storeHelper";

import type { ReactElement } from "react";

export const renderPage = (page: ReactElement) =>
  render(
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          authState: { status: "anonymous" },
          isChecking: false,
          isSignedIn: false,
          refreshAuthState: () => undefined,
        }}
      >
        <MemoryRouter>{page}</MemoryRouter>
      </AuthContext.Provider>
    </Provider>,
  );
