import Head from 'next/head'
import config from '../config'
import { useRouter } from 'next/router'
import { categoriesUrl, categoryUrl } from '../lib/url'
import { Category } from '../lib/api'

const mapCategories = (category: string) => `"${category}"`

const generatePad = (title: string, categories: string[]) => {
  const tags = categories.map(mapCategories).join(', ')
  return ` Escute e baixe o áudio do WhatsApp: "${title}". Classificado com ${
    categories.length > 1 ? 'as tags' : 'a tag'
  } ${tags}.`
}

type SEOCategoryProps = {
  category: Category
}

function SEOCategory({ category }: SEOCategoryProps) {
  const { asPath } = useRouter()

  const URL = `${config.siteUrl}${asPath || ''}`
  const image = `${config.siteUrl}${config.siteBanner}`

  const firstAudioTitles = category.posts
    .slice(0, 6)
    .map((post) => `"${post.title}"`)
    .join(', ')

  const title = `Categoria: ${category.name} | ${config.siteTitle}`
  const description = `Áudios do WhatsApp para escutar e baixar classificados como "${category.name}". Áudios como: ${firstAudioTitles}.`

  const breadcrumb = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    description: 'Breadcrumbs list',
    name: 'Breadcrumbs',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Áudios',
        item: config.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Categorias',
        item: `${config.siteUrl}${categoriesUrl()}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: URL,
      },
    ],
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />

      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Head>
  )
}

export default SEOCategory
