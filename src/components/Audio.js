/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import PropTypes from 'prop-types'
import { css } from 'styled-components'

import { useAmp } from './AmpContext'
import DownloadIcon from './DownloadIcon'

const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

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

function Share({ title, url }) {
  if (!navigator.canShare) {
    return null
  }

  async function handleClick() {
    const blob = await fetch(url, { mode: 'cors' }).then((res) => res.blob())
    const audioFile = new File([blob], 'audio.mp3', { type: 'audio/mp3' })

    if (navigator.canShare({ files: [audioFile] })) {
      navigator
        .share({
          files: [audioFile],
          title,
          text: 'Áudio do Zap',
        })
        .then(() => alert('Share was successful.'))
        .catch((error) => alert(`Sharing failed ${error}`))
    } else {
      console.log(`Your system doesn't support sharing files.`)
    }
  }

  return <button onClick={handleClick}>Share</button>
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
          <Share file={file} title={title} />
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
      <Share file={file} title={title} />
      <Download url={url} />
    </div>
  )
}

Audio.propTypes = {
  file: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Audio
