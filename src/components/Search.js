import React, { useState, useEffect, createRef } from 'react'
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch/lite'

import { Root, HitsWrapper, PoweredBy } from './SearchStyles'
import Input from './SearchInput'
import * as hitComps from './HitComps'

const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `Nenhum resultado para '${state.query}'`
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res &&
    res.nbHits > 0 &&
    `${res.nbHits} resultado${res.nbHits > 1 ? `s` : ``}`
)

const useClickOutside = (ref, handler, events) => {
  if (!events) events = [`mousedown`, `touchstart`]
  const isSSR = typeof window === 'undefined'

  const detectClickOutside = (event) =>
    ref.current && !ref.current.contains(event.target) && handler()

  useEffect(() => {
    for (const event of events) {
      !isSSR && document.addEventListener(event, detectClickOutside)
    }
    return () => {
      for (const event of events) {
        !isSSR && document.removeEventListener(event, detectClickOutside)
      }
    }
  })
}

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_KEY
)

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)

  useClickOutside(ref, () => setFocus(false))

  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
      root={{ Root, props: { ref } }}
    >
      <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
      <HitsWrapper show={query.length > 0 && focus} asGrid={hitsAsGrid}>
        {indices.map(({ name, title, hitComp }) => (
          <Index key={name} indexName={name}>
            <header>
              <h3>{title}</h3>
              <Stats />
            </header>
            <Results>
              <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
            </Results>
          </Index>
        ))}
        <PoweredBy />
      </HitsWrapper>
    </InstantSearch>
  )
}
