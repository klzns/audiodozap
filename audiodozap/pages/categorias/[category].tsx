import { getPostBySlug, getCategories, Category } from "../../lib/api"
import markdownToHtml from "../../lib/markdownToHtml"
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Post({ category }: { category: Category }) {
  const router = useRouter()
  return (
    <div>
      <pre>
        {JSON.stringify(category, null, 2)}
      </pre>
    </div>
  )
  // if (!router.isFallback && !post?.slug) {
  //   return <div>404</div>
  // }

  // return (
  //   <div>
  //     <div>
  //       {router.isFallback ? (
  //         <p>Loading…</p>
  //       ) : (
  //         <>
  //           <article className="mb-32">
  //             <Head>
  //               <title>
  //                 {post.title} | Next.js Blog Example with
  //               </title>
  //               {/* <meta property="og:image" content={post.ogImage.url} /> */}
  //             </Head>
  //             {post.title}
  //             {post.date}
  //             <div className="max-w-2xl mx-auto">
  //               <div
  //                 // className={markdownStyles['markdown']}
  //                 dangerouslySetInnerHTML={{ __html: post.content }}
  //               />
  //             </div>
  //           </article>
  //         </>
  //       )}
  //     </div>
  //   </div>
  // )
}

export async function getStaticProps({ params }: { params: { category: string }}) {
  const categories = getCategories()
  const categoryData = categories[params.category]

  return {
    props: {
      category: categoryData
    },
  }
}

export async function getStaticPaths() {
  const categories = getCategories()

  const categoriesSlugs = Object.keys(categories)

  return {
    paths: categoriesSlugs.map((slug) => {
      return {
        params: {
          category: slug,
        },
      }
    }),
    fallback: false,
  }
}