import { getPostBySlug, getAllPosts } from "../../lib/api"
import markdownToHtml from "../../lib/markdownToHtml"
import Head from 'next/head'
import { useRouter } from 'next/router'
import React from "react"
import { Title } from "../../components/audio/Title"
import Audio from '../../components/audio/Audio'
import Link from 'next/link'

function djbHash(s: string) {
  let hash = 5381

  for (const c of s) {
    hash = hash * 33 + c.charCodeAt(0)
  }

  return hash
}

function mapToValues(s: string, number: number) {
  const hash = djbHash(s)

  return parseInt(hash.toString()[0], 10) % number
}

export default function Post({ post, morePosts, preview }: any) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <div>404</div>
  }

  const color = mapToValues(post.title, 7)

  return (
    <div>
      <div>
        {router.isFallback ? (
          <p>Loading…</p>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
                <Title color={color}>
                  <Link href="/audio"><a>{post.title}</a></Link> 
                </Title>
                <Audio title={post.title} file={post.audio} />
              {post.date}
              <div className="max-w-2xl mx-auto">
                <div
                  // className={markdownStyles['markdown']}
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </div>
            </article>
          </>
        )}
      </div>
    </div>
  )
}

export async function getStaticProps({ params }: { params: { slug: string }}) {
  const post = getPostBySlug(params.slug)
  const content = await markdownToHtml(post?.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}