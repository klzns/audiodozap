import tw, { styled } from 'twin.macro'

export const Button = styled.Button({
  color: '#009588',
  ...tw`
    flex
    flex-nowrap
    items-center
    cursor-pointer
    py-2 px-4
    font-bold
    rounded
    bg-white
    shadow
  `,
})
