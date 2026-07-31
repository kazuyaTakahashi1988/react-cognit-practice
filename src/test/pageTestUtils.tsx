import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import type { ReactElement } from "react";

export const renderPage = (page: ReactElement) =>
  render(<MemoryRouter>{page}</MemoryRouter>);
