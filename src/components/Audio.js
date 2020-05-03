import React from 'react'
import PropTypes from 'prop-types'
import { useAmp } from './AmpContext'
import DownloadIcon from './DownloadIcon'
import styled from 'styled-components'

const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

const Small = styled.span`
  font-size: 0.5em;
  color: #999;
  width: 120px;
  display: inline-block;
  margin-left: 1em;
`

const Download = ({ url }) => {
  const isSSR = typeof window === 'undefined'

  const isSafari =
    isSSR === false &&
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  const isTouch =
    isSSR === false &&
    ('ontouchstart' in window || navigator.msMaxTouchPoints > 0)

  return (
    <a
      href={url}
      download
      css={css`
        margin-left: 0.5em;
        display: flex;
        align-items: center;
        @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
          margin-top: 0.5em;
          margin-left: 0;
          margin-bottom: 1em;
        }
      `}
    >
      <DownloadIcon />
      {isTouch ? (
        isSafari ? (
          <Small>Segure o botão e escolha 'Baixar arquivo vinculado'</Small>
        ) : (
          <Small>Segure o botão e escolha 'Fazer download do link'</Small>
        )
      ) : (
        <Small>Clique com o botão direito e escolha 'Salvar link como'</Small>
      )}
    </a>
  )
}

const Audio = ({ file }) => {
  const url = `${baseUrl}${file}`
  const amp = useAmp()

  if (amp) {
    return (
      <>
        <amp-audio controls>
          <source src={url} />
          <div fallback="">
            <p>Your browser doesn’t support HTML5 audio</p>
          </div>
          <Download url={url} />
        </amp-audio>
      </>
    )
  }

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
        @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
          display: block;
        }
      `}
    >
      <audio
        controls
        css={css`
          width: 100%;
        `}
      >
        <source src={url} />
        {/* <track default src={`/vtt/${trackFile}`} srcLang="pt" /> */}
        <p>Seu navegador não suporta o elemento audio.</p>
      </audio>
      <Download url={url} />
    </div>
  )
}

Audio.propTypes = {
  file: PropTypes.string.isRequired,
}

export default Audio
