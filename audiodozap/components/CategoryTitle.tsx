import { ReactNode } from 'react'
import tw, { styled } from 'twin.macro'

type CategoryTitleProps = {
  title: ReactNode
  subtitle?: ReactNode
}

function CategoryTitle({ title, subtitle }: CategoryTitleProps) {
  return (
    <div tw="my-8 space-y-4 text-center">
      <h1 tw="text-sm uppercase font-bold">{title}</h1>

      {subtitle && <div tw="text-sm text-gray-600">{subtitle}</div>}
    </div>
  )
}

export default CategoryTitle
