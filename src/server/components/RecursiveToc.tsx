import { type TableOfContentsEntry } from "@altano/remark-mdx-toc-with-slugs";

const cnx = {
  0: "tocs",
  1: "ml-5 mt-2",
  2: "ml-8",
};

export const RecursiveTocs = ({
  tocs,
  level = 0,
}: {
  tocs: Array<TableOfContentsEntry>;
  level?: number;
}) => (
  <>
    {level === 0 && <h2>Table des matières</h2>}
    <ul class={cnx[level as keyof typeof cnx]}>
      {tocs?.map((toc) => {
        const hasChildren = toc.children && toc.children.length !== 0;
        return (
          <li class="pb-2">
            <a href={`#${toc.slug}`}>{toc.value}</a>
            {hasChildren ? (
              <RecursiveTocs level={level + 1} tocs={toc.children} />
            ) : null}
          </li>
        );
      })}
    </ul>
  </>
);
