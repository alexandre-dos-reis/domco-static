import { Link } from "@/server/components/Link";
import type { PageConfig } from "@/server/types";
import { getRouter } from "@/server/utils";
import { join } from "path";

export const config = { title: "Blog" } satisfies PageConfig;

export default () => {
  const router = getRouter("blog");
  return (
    <div>
      <ul>
        {Object.keys(router.routes).map((route) => (
          <li>
            <Link href={join("/blog", route)}>{route}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// export default () => {
//   return (
//     <section class="bg-white dark:bg-gray-900">
//       <div class="container px-6 py-10 mx-auto">
//         <h1 class="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
//           From the blog
//         </h1>
//
//         <div class="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
//           <BlogCard
//             date="20 October 2019"
//             imgSrc="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//           >
//             How to use sticky note for problem solving
//           </BlogCard>
//
//           <BlogCard
//             imgSrc="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//             date="20 October 2019"
//           >
//             How to use sticky note for problem solving
//           </BlogCard>
//
//           <BlogCard
//             imgSrc="https://images.unsplash.com/photo-1544654803-b69140b285a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//             date="25 November 2020"
//           >
//             Morning routine to boost your mood
//           </BlogCard>
//
//           <BlogCard
//             date="30 September 2020"
//             imgSrc="https://images.unsplash.com/photo-1530099486328-e021101a494a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1547&q=80"
//           >
//             All the features you want to know
//           </BlogCard>
//
//           <BlogCard
//             imgSrc="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1484&q=80"
//             date="On: 13 October 2019"
//           >
//             Minimal workspace for your inspirations
//           </BlogCard>
//
//           <BlogCard
//             imgSrc="https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
//             date="On: 20 October 2019"
//           >
//             What do you want to know about Blockchane
//           </BlogCard>
//         </div>
//       </div>
//     </section>
//   );
// };
