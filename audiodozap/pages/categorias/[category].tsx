import { getCategories, Category } from '../../lib/api'
import { StyledLink } from '../../components/StyledLink'
import Audio from '../../components/audio/Audio'
import { categoriesUrl } from '../../lib/url'
import Header from '../../components/Header'
import Wrapper from '../../components/Wrapper'
import type { GetStaticPaths, GetStaticProps } from 'next'
import SEODefault from '../../components/SEODefault'
import SEOCategory from '../../components/SEOCategory'
import CategoryTitle from '../../components/CategoryTitle'

type Props = {
  category: Category
}

export default function CategoryPage({ category }: Props) {
  const subline = `${category.quantity} áudio${
    category.quantity === 1 ? '' : 's'
  } na categoria "${category.name}"`

  return (
    <Wrapper>
      <SEODefault />
      <SEOCategory category={category} />
      <Header index={false} contribute />

      <CategoryTitle
        title={`Categoria – ${category.name}`}
        subtitle={
          <>
            {subline} (Ver{' '}
            <StyledLink href={categoriesUrl()}>todas as categorias</StyledLink>)
          </>
        }
      />
      {category.posts.map((post) => (
        <Audio
          key={post.slug}
          title={post.title}
          audio={post.audio}
          excerpt={post.excerpt}
          slug={post.slug}
          colorNumber={post.colorNumber}
          categories={post.categories}
        />
      ))}
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps<
  { category: Category },
  { category: string }
> = async ({ params }) => {
  const categories = getCategories()
  const categoryData = categories[params!.category]

  return {
    props: {
      category: categoryData,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = getCategories()

  const categoriesSlugs = Object.keys(categories)

  return {
    paths: categoriesSlugs.map((slug) => {
      return {
        params: {
          category: slug,
        },
      }
    }),
    fallback: false,
  }
}
