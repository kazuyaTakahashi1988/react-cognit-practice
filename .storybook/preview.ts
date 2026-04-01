import type { Preview } from "@storybook/react";

import { GlobalStyle } from "../src/lib/style";
import "./storybook.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyle />
        <Story />
      </>
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
  },
};

export default preview;
