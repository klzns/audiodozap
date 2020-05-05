import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'

import Audio from './Audio'
import PostFooter from './PostFooter'
import ArrowIcon from './ArrowIcon'
import Transcription from './Transcription'
import { audioUrl } from '../modules/url'

const Post = styled.article`
  display: flex;
  position: relative;
  flex-direction: column;
  margin-top: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 1px 0.5px rgba(0, 0, 0, 0.13);
  background: #fff;
  border-radius: 7.5px;
  border-top-left-radius: 0;

  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
`

const colors = [
  '#91ab01', // Lemon green
  '#e542a3', // Pink
  '#6bcbef', // Light blue
  '#35cd96', // Neon green
  '#1f7aec', // Blue
  '#ffa97a', // Orange
  '#dfb610', // Yellow
  '#00bfa5', // Teal
]

const Title = styled.h2`
  position: relative;
  text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  font-size: 1.4em;
  margin-bottom: 0.75em;
  margin-top: 0.5em;
  color: ${(props) => props.$color || colors[0]};

  a {
    color: ${(props) => props.$color || colors[0]};
    font-weight: 500;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Padding = styled.div`
  padding: 0.5em 1em;
`

const Small = styled.div`
  font-size: 0.75em;
  a {
    color: #b5b5b5;
  }
`

function djbHash(s) {
  let hash = 5381

  for (let c of s) {
    hash = hash * 33 + c.charCodeAt(0)
  }
  return hash
}

function mapToValues(s, values) {
  const hash = djbHash(s)
  return values[parseInt(hash.toString()[0], 10) % values.length]
}

const Article = ({ title, date, audio, slug, categories, children }) => {
  const url = audioUrl(slug)
  const color = mapToValues(title, colors)

  return (
    <Post>
      <div
        css={css`
          position: absolute;
          top: -7px;
          left: -8px;
          color: #fff;
          width: 8px;
          height: 13px;
          display: block;
        `}
      >
        <ArrowIcon />
      </div>
      <Padding>
        <Title as={children ? 'h1' : 'h2'} $color={color}>
          {children ? title : <Link to={url}>{title}</Link>}
        </Title>
        <Audio file={audio} />
        {!children && (
          <Small>
            <Link to={url}>Ler transcrição</Link>
          </Small>
        )}
        {children && <Transcription>{children}</Transcription>}
      </Padding>
      <PostFooter categories={categories} date={date} url={url} />
    </Post>
  )
}

export default Article

Article.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  children: PropTypes.any,
}
