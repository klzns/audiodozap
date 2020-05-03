import React from 'react'
import PropTypes from 'prop-types'
import { useAmp } from './AmpContext'

const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

const audioExtension = /.(mp4|mp3|ogg)/

const Audio = ({ file }) => {
  const url = `${baseUrl}${file}`
  const trackFile = file.replace(audioExtension, '.vtt')

  const amp = useAmp()

  if (amp) {
    return (
      <>
        <amp-audio controls>
          <source src={url} />
          <div fallback="true">
            <p>Your browser doesn’t support HTML5 audio</p>
          </div>
        </amp-audio>
      </>
    )
  }

  return (
    <div>
      <audio controls>
        <source src={url} />
        {/* <track default src={`/vtt/${trackFile}`} srcLang="pt" /> */}
        <p>Seu navegador não suporta o elemento audio.</p>
      </audio>
    </div>
  )
}

Audio.propTypes = {
  file: PropTypes.string.isRequired,
}

export default Audio
