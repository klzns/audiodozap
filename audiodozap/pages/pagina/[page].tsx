import { paginatePosts, Page } from "../../lib/api"
import markdownToHtml from "../../lib/markdownToHtml"
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function PageC({ page }: { page: Page }) {
  const router = useRouter()

  return (
    <div>
      <pre>
        {JSON.stringify(page, null, 2)}
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

export async function getStaticProps({ params }: { params: { page: number }}) {
  const pages = paginatePosts()

  return {
    props: {
      page: pages[params.page - 1]
    },
  }
}

export async function getStaticPaths() {
  const pages = paginatePosts()

  return {
    paths: pages.map((page) => {
      return {
        params: {
          page: `${page.pageInfo.page}`,
        },
      }
    }),
    fallback: false,
  }
}