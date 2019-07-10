import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import kebabCase from 'lodash/kebabCase'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import config from '../../config'

import { Layout, Wrapper, Header, Subline, SEO, PrevNext } from '../components'

const Title = styled.h1`
  margin-bottom: 1rem;
`

const PostContent = styled.div`
  margin-top: 4rem;
`

const Post = ({ pageContext: { slug, prev, next }, data: { mdx: postNode } }) => {
  const post = postNode.frontmatter

  const blogPostUrl = `${config.siteUrl}${slug}`

  return (
    <Layout customSEO>
      <Wrapper>
        <SEO postPath={slug} postNode={postNode} article />
        <Header />
        <article>
          <Title>{post.title}</Title>
          <Subline>
            {post.date} &mdash; {postNode.timeToRead} Min Read &mdash; In{' '}
            {post.categories.map((cat, i) => (
              <React.Fragment key={cat}>
                {!!i && ', '}
                <Link to={`/categories/${kebabCase(cat)}`}>{cat}</Link>
              </React.Fragment>
            ))}
          </Subline>
          <PostContent>
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </PostContent>
        </article>
        <p css={{textAlign: 'right'}}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            // using mobile.twitter.com because if people haven't upgraded
            // to the new experience, the regular URL wont work for them
            href={`https://mobile.twitter.com/search?q=${encodeURIComponent(
              blogPostUrl,
            )}`}
          >
            Discuss on Twitter
          </a>
          <span css={{marginLeft: 10, marginRight: 10}}>{` • `}</span>
          <a target="_blank" rel="noopener noreferrer" href={postNode.fields.editLink}>
            Edit post on GitHub
          </a>
        </p>
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
      fields {
        editLink
      }
      excerpt
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
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
