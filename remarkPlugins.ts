import { type Options } from "@mdx-js/rollup";
import rehypeStarryNight from "rehype-starry-night";
import { all } from "@wooorm/starry-night";

export default [
  [rehypeStarryNight, { grammars: all }],
] as Options["remarkPlugins"];
