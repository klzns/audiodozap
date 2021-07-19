import { createCss, StitchesCss } from '@stitches/react'
export type { StitchesVariants } from '@stitches/react'

export const stitches = createCss({
  prefix: '',
  utils: {},
  media: {
    phone: '(min-width: 600px)',
    tablet: '(min-width: 1200px)',
  },
})

export type CSS = StitchesCss<typeof stitches>

export const { css, styled, global, theme, keyframes, getCssString } = stitches
