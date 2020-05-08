import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import config from '../../config'
import HeadphoneIcon from './HeadphoneIcon'
import Contribute from './Contribute'
import { categoriesUrl } from '../modules/url'

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

const Header = ({ index, contribute = true }) => (
  <>
    <header>
      <Link to="/">
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <HeadphoneIcon />
          <Title as={index ? 'h1' : 'h2'}>
            {config.siteTitle}
            <Small>O hall da fama dos áudios do WhatsApp</Small>
          </Title>
        </div>
      </Link>
    </header>

    <div
      css={css`
        display: flex;
        align-items: center;
        margin-top: 1em;
        justify-content: space-between;
      `}
    >
      <div>
        <Link to={categoriesUrl()}>Navegar por categorias</Link>
      </div>

      {contribute && <Contribute />}
    </div>
  </>
)

export default Header
