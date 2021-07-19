import { paginatePosts, Page } from "../../lib/api"
import { GetStaticPaths, GetStaticProps } from 'next'
import React from 'react'
import Wrapper from '../../components/Wrapper'
import SEODefault from '../../components/SEODefault'
import SEOSite from '../../components/SEOSite'
import Header from '../../components/Header'
import Audio from '../../components/audio/Audio'
import Pagination from '../../components/Pagination'

export default function PageX({ page }: { page: Page }) {
  return (
    <Wrapper>
      <SEODefault />
      <SEOSite />
      <Header index contribute />

      {page.edges.map((post) => (
        <Audio
          key={post.slug}
          title={post.title}
          audio={post.audio}
          excerpt={post.excerpt}
          slug={post.slug}
          categories={post.categories}
          colorNumber={post.colorNumber}
        />
      ))}

      <Pagination pageInfo={page.pageInfo} total={page.total} />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<
  { page: Page },
  { page: string }
> = async ({ params }) => {
  const pages = paginatePosts()

  return {
    props: {
      page: pages[parseInt(params!.page) - 1],
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const pages = paginatePosts()

  return {
    fallback: false,
    paths: pages.map((page) => {
      return {
        params: {
          page: `${page.pageInfo.page}`,
        },
      }
    }),
  }
}