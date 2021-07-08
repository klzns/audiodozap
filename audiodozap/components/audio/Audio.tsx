/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { styled } from '../../stitches.config'
import DownloadIcon from './DownloadIcon'

export const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

const DownloadLink = styled('a', {
  marginLeft: '0.5em',
  display: 'flex',
  alignItems: 'center',
})

const Download = ({ url }: { url: string }) => {
  return (
    <DownloadLink
      href={url}
      download
    >
      <DownloadIcon />
    </DownloadLink>
  )
}

const Div = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.75em',
})

function Audio({ file, title }: { file: string, title: string }) {
  const url = `${baseUrl}${file}`

  return (
    <Div>
      <audio controls>
        <source src={url} />
        {/* <track default src={`/vtt/${trackFile}`} srcLang="pt" /> */}
        <p>Seu navegador não suporta o elemento audio.</p>
      </audio>
      <Download url={url} />
    </Div>
  )
}

export default Audio
