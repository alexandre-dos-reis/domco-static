import { visitParents } from "unist-util-visit-parents";

// https://github.com/jake-low/remark-sectionize/issues/5

function update(section) {
  if (
    section.children &&
    section.children[0] &&
    HEADINGS.includes(section.children[0].tagName)
  ) {
    const heading = section.children[0];
    const { id, ...rest } = heading.properties;
    section.properties.id = id;
    heading.properties = rest;
  }
}

export default function plugin() {
  return (tree) => visitParents(tree, "element", update);
}

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];
