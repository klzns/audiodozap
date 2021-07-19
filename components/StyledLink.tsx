import NextLink from 'next/link'
import { styled } from 'twin.macro'

const A = styled.a({
  color: '#009588',
})

type StyledLinkProps = { href: string } & React.HTMLProps<HTMLAnchorElement>

export function StyledLink({ href, children, ...rest }: StyledLinkProps) {
  return (
    <NextLink href={href} passHref>
      <A {...rest}>{children}</A>
    </NextLink>
  )
}
