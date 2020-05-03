import React from 'react'
import { Link } from 'gatsby'
import config from '../../config'
import HeadphoneIcon from './HeadphoneIcon'

const Header = () => (
  <header>
    <Link to="/">
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <HeadphoneIcon />
        <div
          css={css`
            font-weight: bold;
            font-size: 2rem;
            margin-left: 15px;
          `}
        >
          {config.siteTitle}
        </div>
      </div>
    </Link>
  </header>
)

export default Header
