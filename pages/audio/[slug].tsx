import { getPostBySlug, getAllPosts } from '../../lib/api'
import type { Post } from '../../lib/api'
import markdownToHtml from '../../lib/markdownToHtml'
import Audio from '../../components/audio/Audio'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import { GetStaticPaths, GetStaticProps } from 'next'
import SEODefault from '../../components/SEODefault'
import SEOAudio from '../../components/SEOAudio'

export const config = { amp: 'hybrid ' }

export default function AudioPage({ post }: { post: Post }) {
  return (
    <Wrapper>
      <Header index={false} contribute={false} />
      <SEODefault />
      <SEOAudio post={post} />

      <Audio
        title={post.title}
        audio={post.audio}
        excerpt={post.excerpt}
        slug={post.slug}
        colorNumber={post.colorNumber}
        categories={post.categories}
      >
        <span dangerouslySetInnerHTML={{ __html: post.content }} />
      </Audio>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<
  { post: Partial<Post> & { content: string } },
  { slug: string }
> = async ({ params }) => {
  const post = getPostBySlug(params!.slug)
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

export const getStaticPaths: GetStaticPaths = async () => {
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
