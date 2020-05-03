/* eslint react/jsx-boolean-value: 0 */
/* eslint no-unused-vars: 0 */
/* eslint react/prop-types: 0 */
/* eslint react/destructuring-assignment: 0 */
import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import styled from 'styled-components'

const StyledEditor = styled(LiveEditor)`
  background: ${theme.plain.backgroundColor};
  border-radius: 5px;
  margin-bottom: 1rem;
`

const Wrapper = styled.div`
  overflow: auto;
  margin-bottom: 1rem;

  .prism-code {
    padding: 0.75rem;
    border-radius: 5px;
    font-size: 16px;
  }
`

const Pre = styled.pre`
  float: left;
  min-width: 100%;
  overflow: initial;
`

const RE = /{([\d,-]+)}/

function calculateLinesToHighlight(meta) {
  if (RE.test(meta)) {
    const lineNumbers = RE.exec(meta)[1]
      .split(',')
      .map((v) => v.split('-').map((y) => parseInt(y, 10)))
    return (index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) =>
        end ? lineNumber >= start && lineNumber <= end : lineNumber === start
      )
      return inRange
    }
  }
  return () => false
}

const Code = ({ codeString, language, metastring, ...props }) => {
  const shouldHighlightLine = calculateLinesToHighlight(metastring)

  if (props['react-live']) {
    return (
      <LiveProvider code={codeString} noInline={true} theme={theme}>
        <StyledEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    )
  }
  return (
    <Highlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Wrapper>
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div
                {...getLineProps({
                  line,
                  key: i,
                  className: shouldHighlightLine(i) ? 'highlight-line' : '',
                })}
              >
                <span
                  css={css`
                    display: inline-block;
                    width: 2em;
                    user-select: none;
                    opacity: 0.3;
                  `}
                >
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Pre>
        </Wrapper>
      )}
    </Highlight>
  )
}

export default Code
