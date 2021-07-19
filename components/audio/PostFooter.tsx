import 'twin.macro'
import Tags from '../Tags'
import Share from '../Share'

type PostFooterProps = {
  categories: string[]
  title: string
  audio: string
}

function PostFooter({ categories, title, audio }: PostFooterProps) {
  return (
    <div tw="block md:flex md:flex-col md:justify-between space-y-4">
      <Share audio={audio} title={title} />
      <Tags tags={categories} />
    </div>
  )
}

export default PostFooter
