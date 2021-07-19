import 'twin.macro'
import { baseUrl } from './AudioPlayer'

function TwitterPlayer({ audio }: { audio?: string }) {
  const url = `${baseUrl}${audio}`

  return (
    <div tw="flex justify-center w-full h-screen items-center px-2">
      <style>
        {`
        body {
          background: white !important;
        }
        `}
      </style>
      <audio controls tw="w-full">
        <source src={url} />
        <p>Seu navegador não suporta o elemento audio.</p>
      </audio>
    </div>
  )
}

export default TwitterPlayer
