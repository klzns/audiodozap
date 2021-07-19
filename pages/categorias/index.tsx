import 'twin.macro'
import { Category, getCategories } from '../../lib/api'
import Wrapper from '../../components/Wrapper'
import Header from '../../components/Header'
import SEODefault from '../../components/SEODefault'
import { categoryUrl } from '../../lib/url'
import type { GetStaticProps } from 'next'
import SEOCategories from '../../components/SEOCategories'
import { StyledLink } from '../../components/StyledLink'
import CategoryTitle from '../../components/CategoryTitle'

type CategoryData = Pick<Category, 'name' | 'slug' | 'quantity'>

type Props = {
  categories: CategoryData[]
}

export default function CategoriesPage({ categories }: Props) {
  return (
    <Wrapper>
      <SEODefault />
      <SEOCategories />

      <Header index={false} contribute />

      <CategoryTitle title="Categorias" />

      <ul tw="space-y-2">
        {categories.map((category) => (
          <li
            key={category.name}
            tw="text-lg font-semibold flex items-center space-x-1"
          >
            <StyledLink href={categoryUrl(category.slug)}>
              {category.name}
            </StyledLink>{' '}
            <span tw="text-sm text-gray-500">({category.quantity})</span>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const categories = getCategories()

  const data = Object.entries(categories).map<CategoryData>(
    ([_key, category]) => ({
      name: category.name,
      slug: category.slug,
      quantity: category.quantity,
    })
  )

  data.sort((a, b) => a.name.localeCompare(b.name))

  return {
    props: {
      categories: data,
    },
  }
}
