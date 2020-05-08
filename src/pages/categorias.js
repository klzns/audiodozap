import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import Wrapper from '../components/Wrapper'
import Header from '../components/Header'
import SectionTitle from '../components/SectionTitle'
import SEO from '../components/SEO'
import config from '../../config'
import { categoryUrl, categoriesUrl } from '../modules/url'

const Title = styled.h3`
  margin: 0.75rem 0;
  font-size: 1.2em;
`

const Small = styled.span`
  font-size: 0.8em;
  color: #777;
`

const categorySample = (categories) => {
  return categories
    .slice()
    .sort((a, b) => (a.totalCount > b.totalCount ? -1 : 1))
    .slice(0, 15)
    .map((category) => `"${category.fieldValue}"`)
    .join(', ')
}

const Categorias = ({
  data: {
    allMdx: { group },
  },
}) => (
  <Layout customSEO>
    <Wrapper>
      <SEO
        path={categoriesUrl()}
        title={`Categorias | ${config.siteTitle}`}
        description={`Todas as categorias de áudios do WhatsApp para escutar e baixar. Categorias como: ${categorySample(
          group
        )}.`}
      />
      <Header />
      <SectionTitle as="h1">Categorias</SectionTitle>
      {group.map((category) => (
        <Title key={category.fieldValue}>
          <Link to={categoryUrl(category.fieldValue)}>
            {category.fieldValue}
          </Link>{' '}
          <Small>({category.totalCount})</Small>
        </Title>
      ))}
    </Wrapper>
  </Layout>
)

export default Categorias

Categorias.propTypes = {
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
