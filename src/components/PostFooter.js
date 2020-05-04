import React from 'react'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share'

import Tags from './Tags'
import config from '../../config'

const iconSize = 40

const PostFooter = ({ categories, url }) => {
  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
  const homeURL = `${config.siteUrl}${realPrefix}`
  const finalUrl = `${homeURL}${url || ''}`

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
      <Tags tags={categories} />
      <div
        css={css`
          min-width: 135px;
          @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
            margin-top: 1em;
          }

          button {
            margin-right: 5px;
          }
        `}
      >
        <WhatsappShareButton url={finalUrl}>
          <WhatsappIcon round size={iconSize} />
        </WhatsappShareButton>
        <TwitterShareButton url={finalUrl}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
        <FacebookShareButton url={finalUrl}>
          <FacebookIcon round size={iconSize} />
        </FacebookShareButton>
      </div>
    </div>
  )
}

export default PostFooter
