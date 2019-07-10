import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'

import { Layout, Wrapper, Header, SectionTitle } from '../components'
import config from '../../config'

const Title = styled.h3`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.75rem;
`

const Category = ({
  data: {
    allMdx: { group },
  },
}) => (
  <Layout>
    <Wrapper>
      <Helmet title={`Categories | ${config.siteTitle}`} />
      <Header />
      <SectionTitle>Categories</SectionTitle>
      {group.map(category => (
        <Title key={category.fieldValue}>
          <Link to={`/categories/${kebabCase(category.fieldValue)}`}>{category.fieldValue}</Link> (
          {category.totalCount})
        </Title>
      ))}
    </Wrapper>
  </Layout>
)

export default Category

Category.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      group: PropTypes.array.isRequired,
    }),
  }).isRequired,
}

export const postQuery = graphql`
  query CategoriesPage {
    allMdx {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`
