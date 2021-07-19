/* eslint-disable jsx-a11y/media-has-caption */
import 'twin.macro'
import DownloadIcon from './DownloadIcon'

export const baseUrl = 'https://d3dabxdkbtmy0c.cloudfront.net/'

function AudioPlayer({ file }: { file: string; title: string }) {
  const url = `${baseUrl}${file}`

  return (
    <div tw="flex items-center space-x-2">
      <audio controls>
        <source src={url} />
        <p>Seu navegador não suporta o elemento audio.</p>
      </audio>
      <a tw="flex items-center" href={url} download>
        <DownloadIcon />
      </a>
    </div>
  )
}

export default AudioPlayer
