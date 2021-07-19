import tw, { styled } from 'twin.macro'

const Wrapper = styled.div({
  maxWidth: '650px',
  ...tw`
    my-0
    mx-auto

    py-8 px-5
    md:p-12
    lg:px-0
  `,
})

export default Wrapper
