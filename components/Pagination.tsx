import 'twin.macro'
import Link from 'next/link'

import { Button } from './Button'

import { audioPageUrl } from '../lib/url'
import { PageInfo } from '../lib/api'

type PaginationProps = {
  total: number
  pageInfo: PageInfo
}

function Pagination({ pageInfo, total }: PaginationProps) {
  const prevPage = audioPageUrl(pageInfo.page - 1)
  const nextPage = audioPageUrl(pageInfo.page + 1)

  return (
    <div tw="block md:flex md:justify-between">
      <div>
        <p tw="text-base text-gray-700">
          Exibindo <span tw="font-medium">{pageInfo.from + 1}</span> até{' '}
          <span tw="font-medium">{Math.min(pageInfo.to, total)}</span> de{' '}
          <span>{total}</span> áudios
        </p>
      </div>
      <ul tw="flex justify-between items-center p-0 space-x-2">
        {pageInfo.hasPreviousPage && (
          <li>
            <Link href={prevPage} passHref>
              <Button as="a" rel="prev">
                ← Anterior
              </Button>
            </Link>
          </li>
        )}
        {pageInfo.hasNextPage && (
          <li>
            <Link href={nextPage} passHref>
              <Button as="a" rel="next">
                Próxima →
              </Button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Pagination
