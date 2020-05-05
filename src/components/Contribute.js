import React from 'react'
import styled, { css } from 'styled-components'

const Button = styled.a`
  color: rgba(45,55,72,1));
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
  padding: 0.5em 1em;
  font-weight: 600;
  border-width: 1px;
  border-radius: 0.25em;
  border-color: rgb(226, 232, 240);
  background: #fff;
  display: inline-flex;
  align-items: center;
`

const Image = styled.img`
  margin-right: 0.5em;
`

const Contribute = () => {
  return (
    <div
      css={css`
        text-align: right;
      `}
    >
      <Button href="https://wa.me/5521990609164?text=Oi%2C%20estou%20enviando%20um%20audio%20e%20sua%20transcri%C3%A7%C3%A3o%20pra%20colocar%20no%20site!%20Segue:">
        <Image
          height={30}
          width={30}
          src="/whatsapp-logo.png"
          alt="WhatsApp logo"
        />
        Enviar novo áudio
      </Button>
    </div>
  )
}

export default Contribute
