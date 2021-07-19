import Head from 'next/head'
import config from '../config'
import { useRouter } from 'next/router'
import { Post } from '../lib/api'
import { audioPlayerUrl } from '../lib/url'

const mapCategories = (category: string) => `"${category}"`

const generatePad = (title: string, categories: string[]) => {
  const tags = categories.map(mapCategories).join(', ')
  return ` Escute e baixe o áudio do WhatsApp: "${title}". Classificado com ${
    categories.length > 1 ? 'as tags' : 'a tag'
  } ${tags}.`
}

type SEOAudioProps = {
  post: Post
}

function SEOAudio({ post }: SEOAudioProps) {
  const { asPath } = useRouter()

  const URL = `${config.siteUrl}${asPath || ''}`
  const image = `${config.siteUrl}${config.siteBanner}`

  const title = `Aúdio ${post.title} | ${config.siteTitle}`
  const description =
    `"${post.excerpt.replace('\n', '')}"` +
    generatePad(post.title, post.categories)

  const schemaArticle = {
    '@context': 'http://schema.org',
    '@type': 'Article',
    publisher: {
      '@type': 'Person',
      name: 'Breno Calazans',
    },
    datePublished: post.date,
    dateModified: post.date,
    description,
    headline: title,
    name: title,
    inLanguage: 'pt',
    url: URL,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    mainEntityOfPage: URL,
  }

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
        name: post.title,
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

      <meta name="twitter:card" content="player" />
      <meta name="twitter:site" content="@audiodozap" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      <meta
        name="twitter:player"
        content={`${config.siteUrl}${audioPlayerUrl(post.slug)}`}
      />
      <meta name="twitter:player:width" content="300" />
      <meta name="twitter:player:height" content="70" />

      <script type="application/ld+json">
        {JSON.stringify(schemaArticle)}
      </script>
      <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
    </Head>
  )
}

export default SEOAudio
