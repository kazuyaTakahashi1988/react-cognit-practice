import React from "react";
import type { Preview } from "@storybook/react";

import { GlobalStyle } from "../src/lib/style";
import "./storybook.css";

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(
        React.Fragment,
        null,
        React.createElement(GlobalStyle),
        React.createElement(Story),
      ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
