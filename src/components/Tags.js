import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'gatsby'
import kebabCase from 'lodash/kebabCase'

const TagList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`

const TagItem = styled.li`
  margin-right: 0.5em;
  padding: 0.25em 0.75em;
  font-weight: 600;
  border-radius: 9999px;
  background-color: #edf2f7;
  font-size: 0.875em;
  margin-bottom: 0.5em;
`

const Tags = ({ tags }) => (
  <TagList>
    {tags.map((cat) => (
      <TagItem key={cat}>
        <Link to={`/categorias/${kebabCase(cat)}`}>#{cat}</Link>
      </TagItem>
    ))}
  </TagList>
)

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
}

export default Tags
