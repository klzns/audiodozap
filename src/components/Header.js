import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import config from '../../config'
import HeadphoneIcon from './HeadphoneIcon'

const Title = styled.h1`
  font-weight: bold;
  font-size: 2em;
  margin-left: 15px;
  color: ${(props) => props.theme.colors.primary};
`

const Small = styled.small`
  display: block;
  font-size: 0.5em;
  font-weight: normal;
  color: ${(props) => props.theme.colors.primaryLight};
`

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
        <Title>
          {config.siteTitle}
          <Small>{config.siteDescription}</Small>
        </Title>
      </div>
    </Link>
  </header>
)

export default Header
