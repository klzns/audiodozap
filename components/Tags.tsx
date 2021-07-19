import { styled } from 'twin.macro'
import { StyledLink } from './StyledLink'

import { categoryUrl } from '../lib/url'

const TagList = styled.ul({
  listStyle: 'none',
  padding: '0',
  margin: '0 0',
  display: 'flex',
  flexWrap: 'wrap',
})

const TagItem = styled.li({
  marginRight: '0.5em',
  padding: '0.25em 0.75em',
  fontWeight: '600',
  borderRadius: '9999px',
  backgroundColor: '#edf2f7',
  fontSize: '0.875em',
})

type TagsProps = {
  tags: string[]
}

const Tags = ({ tags }: TagsProps) => (
  <TagList>
    {tags.map((cat) => (
      <TagItem key={cat}>
        <StyledLink href={categoryUrl(cat)}>#{cat}</StyledLink>
      </TagItem>
    ))}
  </TagList>
)

export default Tags
