import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Article, Wrapper, Header, Content } from '../components'

const IndexPage = ({
  data: {
    allMdx: { nodes: posts },
  },
}) => (
  <Layout>
    <Wrapper>
      <Header />

      {posts.map(post => (
        <Article
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          excerpt={post.excerpt}
          timeToRead={post.timeToRead}
          slug={post.fields.slug}
          categories={post.frontmatter.categories}
          key={post.fields.slug}
        />
      ))}
    </Wrapper>
  </Layout>
)

export default IndexPage

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const IndexQuery = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          categories
        }
        excerpt(pruneLength: 200)
        timeToRead
      }
    }
  }
`
