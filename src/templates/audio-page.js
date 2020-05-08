import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import Article from '../components/Article'
import Pagination from '../components/Pagination'
import config from '../../config'

const AudioPage = ({
  data: {
    allMdx: { nodes: posts },
  },
  pageContext,
}) => (
  <Layout>
    <Wrapper>
      <Helmet>
        <title>
          {config.siteTitleAlt}
          {pageContext.currentPage !== 1
            ? ` | Página ${pageContext.currentPage.toString()}`
            : ''}
        </title>
      </Helmet>
      <Header index />
      {posts.map((post) => (
        <Article
          title={post.frontmatter.title}
          date={post.frontmatter.date}
          audio={post.frontmatter.audio}
          slug={post.fields.slug}
          excerpt={post.excerpt}
          categories={post.frontmatter.categories}
          key={post.fields.slug}
        />
      ))}
      <Pagination
        skip={pageContext.skip}
        total={pageContext.total}
        limit={pageContext.limit}
        currentPage={pageContext.currentPage}
        numPages={pageContext.numPages}
      />
    </Wrapper>
  </Layout>
)

export default AudioPage

AudioPage.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query AudioPageQuery($skip: Int!, $limit: Int!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          audio
          date(formatString: "DD/MM/YYYY")
          categories
        }
        excerpt(pruneLength: 200)
        timeToRead
      }
    }
  }
`
