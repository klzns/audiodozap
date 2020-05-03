import React from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

import { SearchIcon, Form, Input } from './SearchStyles'

export default connectSearchBox(({ refine, ...rest }) => (
  <Form>
    <Input
      type="text"
      placeholder="Buscar"
      aria-label="Buscar"
      onChange={(e) => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))
