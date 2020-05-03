import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Bold = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  margin: 0.75em 0;
`

const Transcription = ({ children }) => {
  return (
    <div
      css={css`
        color: #303030;
      `}
    >
      <Bold>[Transcrição]</Bold>
      <p>{children}</p>
    </div>
  )
}

Transcription.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Transcription
