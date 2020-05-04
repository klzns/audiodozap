import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Post from './post'
import { AmpContextProvider } from '../components/AmpContext'

const PostAmp = (props) => (
  <AmpContextProvider>
    <Helmet>
      <html lang="pt" amp="" />
      <script
        async
        custom-element="amp-audio"
        src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
      />
    </Helmet>
    <Post {...props} />
  </AmpContextProvider>
)

export default PostAmp

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
  query postBySlugAmp($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      excerpt
      frontmatter {
        title
        date(formatString: "DD/MM/YYYY")
        categories
        audio
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
