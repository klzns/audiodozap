/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import SEO from '../components/SEO'
import PrevNext from '../components/PrevNext'
import Article from '../components/Article'
import { audioUrl } from '../modules/url'

const Post = ({
  pageContext: { slug, prev, next },
  data: { mdx: postNode },
}) => {
  const post = postNode.frontmatter
  const url = audioUrl(slug)

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO postPath={url} postNode={postNode} article />
        <Header />
        <Article
          title={post.title}
          date={post.date}
          audio={post.audio}
          slug={slug}
          categories={post.categories}
        >
          <MDXRenderer>{postNode.body}</MDXRenderer>
        </Article>
        <PrevNext prev={prev} next={next} />
      </Wrapper>
    </Layout>
  )
}

export default Post

Post.propTypes = {
  pageContext: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    next: PropTypes.object,
    prev: PropTypes.object,
  }),
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
}

Post.defaultProps = {
  pageContext: PropTypes.shape({
    next: null,
    prev: null,
  }),
}

export const postQuery = graphql`
  query postBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        audio
        categories
      }
      timeToRead
      parent {
        ... on File {
          mtime
          birthtime
        }
      }
    }
  }
`
