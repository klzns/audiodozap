/* eslint react/prop-types: 0 */
/* eslint react/display-name: 0  */
import React from 'react'
import { MDXProvider } from '@mdx-js/react'

// components is its own object outside of render so that the references to
// components are stable
const components = {
  wrapper: ({ children }) => <>{children}</>,
}
export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
)
