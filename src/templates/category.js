import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import { Layout, Wrapper, Header, Subline, Article, SectionTitle } from '../components'
import config from '../../config'

const Category = ({ pageContext: { category }, data: { allMdx } }) => {
  const { nodes, totalCount } = allMdx
  const subline = `${totalCount} post${totalCount === 1 ? '' : 's'} tagged with "${category}"`

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`Category: ${category} | ${config.siteTitle}`} />
        <Header />

        <SectionTitle>Category &ndash; {category}</SectionTitle>
        <Subline sectionTitle>
          {subline} (See <Link to="/categories">all categories</Link>)
        </Subline>
        {nodes.map(post => (
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
}

export default Category

Category.propTypes = {
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      nodes: PropTypes.array.isRequired,
      totalCount: PropTypes.number.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query CategoryPage($category: String!) {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { eq: $category } } }
    ) {
      totalCount
      nodes {
        frontmatter {
          title
          date(formatString: "YYYY-MM-DD")
          categories
        }
        fields {
          slug
        }
        excerpt(pruneLength: 200)
        timeToRead
      }
    }
  }
`
