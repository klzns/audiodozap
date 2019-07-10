import React from 'react'
import { Link } from 'gatsby'
import config from '../../config'
import styled from 'styled-components'

const Avatar = styled.img`
  border-radius: 100%;
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1rem;
`

const Header = () => (
  <header>
    <Link to="/">
      <Avatar src="/social/avatar.jpg" />
      {config.siteTitle}
    </Link>
  </header>
)

export default Header
