/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'

import { useAmp } from './AmpContext'
import DownloadIcon from './DownloadIcon'

export const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

const Download = ({ url }) => {
  return (
    <a
      href={url}
      download
      css={css`
        margin-left: 0.5em;
        display: flex;
        align-items: center;
      `}
    >
      <DownloadIcon />
    </a>
  )
}

const Audio = ({ file, title }) => {
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
        margin-bottom: 0.75em;
      `}
    >
      <audio controls>
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
  title: PropTypes.string.isRequired,
}

export default Audio
