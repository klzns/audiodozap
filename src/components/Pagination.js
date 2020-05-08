import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'

import { button } from './Button'

import { audioPageUrl } from '../modules/url'

const Medium = styled.span`
  font-weight: 500;
`

const Pagination = ({ skip, limit, total, currentPage, numPages }) => {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? '/' : audioPageUrl(currentPage - 1)
  const nextPage = audioPageUrl(currentPage + 1)

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-between;
        @media (max-width: ${(props) => props.theme.breakpoints.phone}) {
          display: block;
        }
      `}
    >
      <div>
        <p
          css={css`
            color: #374151;
            font-size: 0.85em;
          `}
        >
          Exibindo <Medium>{skip + 1}</Medium> até{' '}
          <Medium>{skip + limit}</Medium> de <Medium>{total}</Medium> áudios
        </p>
      </div>
      <ul
        css={css`
          display: flex;
          justify-content: space-between;
          align-items: center;
          list-style: none;
          padding: 0;
        `}
      >
        {isFirst ? (
          <div> </div>
        ) : (
          <li>
            <Link css={button} to={prevPage} rel="prev">
              ← Anterior
            </Link>
          </li>
        )}
        {!isLast && (
          <li>
            <Link
              css={button}
              css={css`
                margin-left: 1em;
              `}
              to={nextPage}
              rel="next"
            >
              Próxima →
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
