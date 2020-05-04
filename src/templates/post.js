import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import PostFooter from '../components/PostFooter'

import {
  Layout,
  Wrapper,
  Header,
  Subline,
  SEO,
  PrevNext,
  Article,
} from '../components'

const Post = ({
  pageContext: { slug, prev, next },
  data: { mdx: postNode },
}) => {
  const post = postNode.frontmatter
  const url = `/audio${slug}`

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
