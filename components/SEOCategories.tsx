import Head from 'next/head'
import config from '../config'
import { useRouter } from 'next/router'

function SEOCategories() {
  const { asPath } = useRouter()

  const URL = `${config.siteUrl}${asPath || ''}`
  const image = `${config.siteUrl}${config.siteBanner}`

  const title = `Categorias | ${config.siteTitle}`
  const description = `Todas as categorias de áudios do WhatsApp para escutar e baixar.`

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

export default SEOCategories
