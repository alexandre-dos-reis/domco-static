import { type Options } from "@mdx-js/rollup";
import starryNight from "rehype-starry-night";
import { all } from "@wooorm/starry-night";
import moveIdHeadingToSection from "./move-id-heading-to-section";
import slugTitle from "rehype-slug";

export default [
  [starryNight, { grammars: all }],
  slugTitle,
  moveIdHeadingToSection,
] as Options["rehypePlugins"];
