import styled from 'styled-components'

const Wrapper = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  padding-top: 2.6rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 3rem 3rem;
  }
  @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
    padding: 2rem 1.3rem;
  }

  p {
    font-size: 1.1rem;
    letter-spacing: -0.003em;
    line-height: 1.58;
    --baseline-multiplier: 0.179;
    --x-height-multiplier: 0.35;
    @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
      font-size: 1rem;
    }
  }
`

export default Wrapper
