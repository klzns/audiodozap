import { getPostBySlug, getCategories } from "../../lib/api"
import markdownToHtml from "../../lib/markdownToHtml"
import Head from 'next/head'
import { useRouter } from 'next/router'

type CategoryData = {
  slug: string
  quantity: number
}

export default function Post({ categories }: { categories: CategoryData[] }) {
  const router = useRouter()
  return (
    <div>
      {categories.map((category) =>
        <div key={category.slug}>
          {category.slug} 
          ({category.quantity})
        </div>
      )}
    </div>
  )
}

export async function getStaticProps({ params }: { params: { slug: string }}) {
  const categories = getCategories()

  const data = Object.entries(categories)
    .map(([key, category]) => ({ slug: category.slug, quantity: category.quantity }))


  return {
    props: {
      categories: data,
    },
  }
}