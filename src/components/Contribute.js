import React from 'react'
import styled, { css } from 'styled-components'

import { button } from './Button'

const Image = styled.img`
  margin-right: 0.5em;
  width: 30px;
  height: 30px;
`

const Contribute = () => {
  return (
    <a
      css={
        button +
        css`
          text-align: left;
        `
      }
      href="https://wa.me/5521990609164?text=Oi%2C%20estou%20enviando%20um%20audio%20e%20sua%20transcri%C3%A7%C3%A3o%20pra%20colocar%20no%20site!%20Segue:"
    >
      <Image
        height={30}
        width={30}
        src="/whatsapp-logo.png"
        alt="WhatsApp logo"
      />
      Enviar novo áudio pro site
    </a>
  )
}

export default Contribute
