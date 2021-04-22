import React from 'react'

import Tags from './Tags'
import { baseUrl } from './Audio'
import Share from './Share'

const PostFooter = ({ categories, title, audio }) => {
  const url = `${baseUrl}${audio}`

  return (
    <div
      css={css`
        display: flex;
        margin: 1em 0;
        padding: 0 1em;
        justify-content: space-between;
        align-items: flex-end;

        @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
          display: block;
        }
      `}
    >
      <div
        css={css`
          min-width: 135px;
          display: none;
          @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
            display: block;
            margin-bottom: 1em;
          }

          button {
            margin-right: 5px;
          }
        `}
      >
        <Share url={url} title={title} />
      </div>
      <Tags tags={categories} />
    </div>
  )
}

export default PostFooter
