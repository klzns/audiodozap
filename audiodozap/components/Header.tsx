import tw, { styled } from 'twin.macro'

import config from '../../config'
import HeadphoneIcon from './HeadphoneIcon'
import Contribute from './Contribute'
import { StyledLink } from './StyledLink'
import { categoriesUrl } from '../lib/url'

const Title = styled.h1({
  ...tw`
    font-bold
    text-4xl
    ml-6
  `,
  color: '#009588',
})

const Small = styled.small({
  ...tw`
    font-normal
    block
    text-base
  `,
  color: '#00af9f',
})

type HeaderProps = {
  index: boolean
  contribute: boolean
}

function Header({ index, contribute = true }: HeaderProps) {
  return (
    <>
      <header>
        <StyledLink href="/">
          <div tw="flex items-center">
            <HeadphoneIcon />
            <Title as={index ? 'h1' : 'h2'}>
              {config.siteTitle}
              <Small>O hall da fama dos áudios do WhatsApp</Small>
            </Title>
          </div>
        </StyledLink>
      </header>

      <div tw="flex items-center mt-10 justify-between">
        <div>
          <StyledLink href={categoriesUrl()}>Navegar por categorias</StyledLink>
        </div>

        {contribute && <Contribute />}
      </div>
    </>
  )
}

export default Header
