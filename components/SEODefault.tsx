import Head from 'next/head'
import config from '../config'

function SEODefault() {
  const image = `${config.siteUrl}${config.siteBanner}`

  return (
    <Head>
      <title>{config.siteTitleAlt}</title>
      <meta name="description" content={config.siteDescription} />
      <meta name="image" content={image} />
      <meta property="og:locale" content={config.ogLanguage} />
      <meta
        property="og:site_name"
        content={config.ogSiteName ? config.ogSiteName : ''}
      />
      <meta property="og:url" content={config.siteUrl} />
      <meta property="og:type" content={'website'} />
      <meta property="og:title" content={config.siteTitleAlt} />
      <meta property="og:description" content={config.siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={config.siteDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ''}
      />
      <meta name="twitter:title" content={config.siteTitleAlt} />
      <meta name="twitter:url" content={config.siteUrl} />
      <meta name="twitter:description" content={config.siteDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={config.siteDescription} />
    </Head>
  )
}

export default SEODefault
