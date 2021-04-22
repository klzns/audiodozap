import React from 'react'
import styled, { css } from 'styled-components'

import { button } from './Button'

const Image = styled.img`
  margin-right: 0.5em;
  width: 25px;
  height: 25px;
`

const canUseDOM = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
)

const Share = ({ title, url }) => {
  if (canUseDOM && !navigator.canShare) {
    return null
  }

  async function handleClick(e) {
    e.preventDefault()
    const blob = await fetch(url, { mode: 'cors' }).then((res) => res.blob())
    const filesArray = [
      new File([blob], `${title}.mp3`, {
        type: 'audio/mp3',
      }),
    ]
    if (navigator.canShare({ files: filesArray })) {
      navigator.share({
        title,
        description: 'audiodozap.com.br',
        files: filesArray,
      })
    } else {
      alert('Seu sistema não suporta compartilhar arquivos')
    }
  }

  return (
    <button
      onClick={handleClick}
      css={
        button +
        css`
          color: #009588;
          text-align: left;
          border-color: rgb(226 232 240 / 38%);
          font-size: 15px;
        `
      }
    >
      <Image
        height={25}
        width={25}
        src="/whatsapp-logo.png"
        alt="WhatsApp logo"
      />
      Enviar no WhatsApp
    </button>
  )
}

export default Share
