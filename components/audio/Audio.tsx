import React, { ReactNode } from 'react'
import tw, { styled } from 'twin.macro'
import Link from 'next/link'

import AudioPlayer from './AudioPlayer'
import PostFooter from './PostFooter'
import Title from './Title'
import ArrowIcon from './ArrowIcon'
import Transcription from './Transcription'
import { audioUrl } from '../../lib/url'

const Post = tw.article`
  flex
  flex-col
  relative
  my-8
  md:my-10
  shadow
  rounded-md
  bg-white
  rounded-tl-none
`

const Excerpt = tw.div`
  border-gray-200
  border-l-4
  pl-2
  text-base
  text-gray-700
  mt-5
`

const ExcerptLink = styled.a({
  color: '#10a0e3',
})

const ArrowContainer = styled.div({
  position: 'absolute',
  top: '0',
  left: '-8px',
  color: '#fff',
  width: '8px',
  height: '13px',
  display: 'block',
})

type AudioProps = {
  title: string
  audio: string
  slug: string
  categories: string[]
  excerpt: string
  colorNumber: number
  children?: ReactNode
}

function Audio({
  title,
  audio,
  slug,
  excerpt,
  categories,
  colorNumber,
  children,
}: AudioProps) {
  const url = audioUrl(slug)

  return (
    <Post>
      <ArrowContainer>
        <ArrowIcon />
      </ArrowContainer>

      <div tw="py-4 px-4 space-y-4">
        <Title as={children ? 'h1' : 'h2'} color={colorNumber}>
          {children ? (
            title
          ) : (
            <Link href={url}>
              <a tw="cursor-pointer hover:underline">{title}</a>
            </Link>
          )}
        </Title>

        <AudioPlayer file={audio} title={title} />

        {!children && (
          <Excerpt>
            {excerpt}
            {excerpt && excerpt.indexOf('…') !== -1 ? (
              <>
                {' '}
                <Link href={url} passHref>
                  <ExcerptLink>Ler mais</ExcerptLink>
                </Link>
              </>
            ) : null}
          </Excerpt>
        )}

        {children && <Transcription>{children}</Transcription>}

        <PostFooter categories={categories} title={title} audio={audio} />
      </div>
    </Post>
  )
}

export default Audio
