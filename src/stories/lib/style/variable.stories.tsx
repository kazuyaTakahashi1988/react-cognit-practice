import { params } from "../../../lib/style";

import type { Meta, StoryObj } from "@storybook/react";

const ColorAssetList = () => {
  const colorEntries = Object.entries(params);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "10px",
        width: "min(100%, 960px)",
      }}
    >
      {colorEntries.map(([name, color]) => {
        const normalized = color.replace("#", "");
        const hasValidHex = normalized.length === 3 || normalized.length === 6;

        const expanded =
          hasValidHex && normalized.length === 3
            ? normalized
                .split("")
                .map((char) => `${char}${char}`)
                .join("")
            : normalized;

        const red = Number.parseInt(expanded.slice(0, 2), 16);
        const green = Number.parseInt(expanded.slice(2, 4), 16);
        const blue = Number.parseInt(expanded.slice(4, 6), 16);
        const luminance = (red * 299 + green * 587 + blue * 114) / 1000;
        const textColor = luminance >= 140 ? "#1f2937" : "#ffffff";

        return (
          <div
            key={name}
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: "10px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                backgroundColor: color,
                color: textColor,
                minHeight: "60px",
                padding: "12px",
                display: "flex",
                alignItems: "flex-end",
                fontWeight: 700,
              }}
            ></div>

            <div style={{ padding: "5px 10px", borderTop: "1px solid #e5e7eb" }}>
              <div style={{ fontSize: "16px", fontWeight: "bold", color: "#2196f3" }}>{name}</div>
              <div style={{ fontSize: "13px", fontWeight: 400 }}>{color}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const meta = {
  title: "Lib/Style/Variable",
  component: ColorAssetList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "`src/lib/style/_variable.ts` の `params` で定義されているカラーアセット一覧です。",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ColorAssetList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = { render: () => <ColorAssetList /> };
