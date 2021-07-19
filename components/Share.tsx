import { useState } from 'react'
import { useEffect } from 'react'
import tw, { styled } from 'twin.macro'

import { Button } from './Button'
import { baseUrl } from './audio/AudioPlayer'

const Image = styled.img({
  marginRight: '0.5em',
  width: '25px',
  height: '25px',
})

type ShareProps = {
  title: string
  audio: string
}

function Share({ title, audio }: ShareProps) {
  const [canShare, setCanShare] = useState<boolean>()

  useEffect(() => {
    setCanShare(Boolean((navigator as any).canShare))
  }, [])

  async function handleClick(e: any) {
    e.preventDefault()
    const url = `${baseUrl}${audio}`
    const blob = await fetch(url, { mode: 'cors' }).then((res) => res.blob())
    const filesArray = [
      new File([blob], `${title}.mp3`, {
        type: 'audio/mp3',
      }),
    ]
    if ((navigator as any).canShare({ files: filesArray })) {
      ;(navigator as any).share({
        title,
        description: 'audiodozap.com.br',
        files: filesArray,
      })
    } else {
      alert('Seu sistema não suporta compartilhar arquivos')
    }
  }

  if (!canShare) {
    return null
  }

  return (
    <div css={[!canShare && tw`hidden`]}>
      <Button onClick={handleClick}>
        <Image
          height={25}
          width={25}
          src="/whatsapp-logo.png"
          alt="WhatsApp logo"
        />
        Enviar no WhatsApp
      </Button>
    </div>
  )
}

export default Share
