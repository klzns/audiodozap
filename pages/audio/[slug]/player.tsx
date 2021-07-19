import { getPostBySlug, getAllPosts } from '../../../lib/api'
import { GetStaticPaths, GetStaticProps } from 'next'
import TwitterPlayer from '../../../components/audio/TwitterPlayer'

export const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

function Player({ post }: { post: { audio?: string } }) {
  return <TwitterPlayer audio={post.audio} />
}

export const getStaticProps: GetStaticProps<
  { post: { audio?: string } },
  { slug: string }
> = async ({ params }) => {
  const post = getPostBySlug(params!.slug)

  return {
    props: {
      post: {
        audio: post?.audio,
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

export default Player
