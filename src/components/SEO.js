import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'

import config from '../../config'

const mapCategories = (category) => `"${category}"`

const generatePad = (title, categories) => {
  const tags = categories.map(mapCategories).join(', ')
  return ` Escute e baixe o áudio de WhatsApp "${title}". Classificado com ${
    categories.length > 1 ? 'as tags' : 'a tag'
  } ${tags}.`
}

const SEO = (props) => {
  const { postNode, path, article, buildTime } = props

  const realPrefix = config.pathPrefix === '/' ? '' : config.pathPrefix
  const homeURL = `${config.siteUrl}${realPrefix}`
  const URL = `${homeURL}${path || ''}`
  const image = `${homeURL}${config.siteBanner}`

  let title = props.title || config.siteTitleAlt
  let description = props.description || config.siteDescription

  if (article) {
    const postMeta = postNode.frontmatter
    title = `${postMeta.title} | ${config.siteTitle}`
    description =
      `"${postNode.excerpt}"` +
      generatePad(postMeta.title, postNode.frontmatter.categories)
  }

  // schema.org in JSONLD format
  // https://developers.google.com/search/docs/guides/intro-structured-data
  // You can fill out the 'author', 'creator' with more data or another type (e.g. 'Organization')

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: URL,
    headline: config.siteHeadline,
    inLanguage: config.siteLanguage,
    mainEntityOfPage: URL,
    description: config.siteDescription,
    name: config.siteTitle,
    author: {
      '@type': 'Person',
      name: config.author,
    },
    copyrightHolder: {
      '@type': 'Person',
      name: config.author,
    },
    copyrightYear: '2018',
    creator: {
      '@type': 'Person',
      name: config.author,
    },
    publisher: {
      '@type': 'Person',
      name: config.author,
    },
    datePublished: '2020-05-02T10:30:00+01:00',
    dateModified: buildTime,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
  }

  let schemaArticle = null
  let breadcrumb = {}

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@type': 'Person',
        name: config.author,
      },
      copyrightHolder: {
        '@type': 'Person',
        name: config.author,
      },
      copyrightYear: postNode.parent.birthtime,
      creator: {
        '@type': 'Person',
        name: config.author,
      },
      publisher: {
        '@type': 'Organization',
        name: config.author,
        logo: {
          '@type': 'ImageObject',
          url: `${homeURL}${config.siteLogo}`,
        },
      },
      datePublished: postNode.parent.birthtime,
      dateModified: postNode.parent.mtime,
      description,
      headline: title,
      inLanguage: 'en',
      url: URL,
      name: title,
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      mainEntityOfPage: URL,
    }

    breadcrumb = {
      '@context': 'http://schema.org',
      '@type': 'BreadcrumbList',
      description: 'Breadcrumbs list',
      name: 'Breadcrumbs',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Áudios',
          '@id': homeURL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: URL,
        },
      ],
    }
  }

  return (
    <Helmet>
      <html lang={config.siteLanguage} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={image} />
      <meta property="og:locale" content={config.ogLanguage} />
      <meta
        property="og:site_name"
        content={config.ogSiteName ? config.ogSiteName : ''}
      />
      <meta property="og:url" content={URL} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={description} />
      {config.siteFBAppID && (
        <meta property="fb:app_id" content={config.siteFBAppID} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={description} />
      {!article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgWebPage)}
        </script>
      )}
      {article && (
        <script type="application/ld+json">
          {JSON.stringify(schemaArticle)}
        </script>
      )}
      {article && (
        <script type="application/ld+json">{JSON.stringify(breadcrumb)}</script>
      )}
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  postNode: PropTypes.object,
  path: PropTypes.string,
  article: PropTypes.bool,
  buildTime: PropTypes.string,
}

SEO.defaultProps = {
  postNode: null,
  path: null,
  article: false,
  buildTime: null,
}
