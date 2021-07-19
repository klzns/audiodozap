import '../styles/globals.css'
import globalStyles from '../styles/globalStyles'
import type { AppProps } from 'next/app'
import { styled } from 'twin.macro'
import Head from 'next/head'
import { StyledLink } from '../components/StyledLink'

const Footer = styled.footer({
  textAlign: 'center',
  flexShrink: 0,
  padding: '3rem 1rem',
  fontSize: '0.75rem',
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, shrink-to-fit=no"
        />
      </Head>
      <div tw="min-h-screen flex flex-col">
        <div tw="flex-grow">
          <Component {...pageProps} />
        </div>
        <Footer>
          <div>
            Site desenvolvido por{' '}
            <StyledLink href="https://www.linkedin.com/in/brenocalazans/">
              Breno Calazans
            </StyledLink>
          </div>
          <div>
            <StyledLink href="https://github.com/klzns/audiodozap/">
              Código aberto no GitHub
            </StyledLink>
          </div>
          <StyledLink
            target="_blank"
            href="https://icons8.com.br/icons/set/headphones"
          >
            Ícone de fones de ouvido
          </StyledLink>{' '}
          por{' '}
          <StyledLink target="_blank" href="https://icons8.com.br">
            Icons8
          </StyledLink>
        </Footer>
      </div>
    </>
  )
}
export default MyApp
