import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Bold = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  margin-top: 2em;
`

const Transcription = ({ children }) => {
  return (
    <div
      css={css`
        color: #303030;
      `}
    >
      <Bold>[Transcrição]</Bold>
      {children}
    </div>
  )
}

Transcription.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Transcription
