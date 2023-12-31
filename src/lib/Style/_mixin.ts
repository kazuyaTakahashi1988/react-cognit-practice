const pc = "769px"; // pc 幅（min-width）の指定
const sp = "768px"; // sp 幅（max-width）の指定
const tab = "1080px"; // tablet 幅（max-width）の指定

export const media = {
  pc: `@media (min-width: ${pc})`,
  sp: `@media (max-width: ${sp})`,
  tab: `@media (max-width: ${tab})`,
};

export const params = {
  white: "#fff",
  black: "#000",
  red: "#ff0000",
  gray: "#ccc",
  gray50: "#333",
  gray100: "#666",
  gray200: "#ddd",
  primary: "#2196f3",
};
