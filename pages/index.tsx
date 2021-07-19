import React from 'react'
import Header from '../components/Header'
import Wrapper from '../components/Wrapper'
import Audio from '../components/audio/Audio'
import { Page, paginatePosts } from '../lib/api'
import SEODefault from '../components/SEODefault'
import SEOSite from '../components/SEOSite'
import Pagination from '../components/Pagination'

export default function Home({ page }: { page: Page }) {
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

export async function getStaticProps() {
  const pages = paginatePosts()

  return {
    props: {
      page: pages[0],
    },
  }
}
