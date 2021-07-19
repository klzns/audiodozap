import Head from 'next/head'
import getConfig from 'next/config'
import config from '../config'
import { useRouter } from 'next/router'

const { publicRuntimeConfig } = getConfig()

function SEOSite() {
  const router = useRouter()

  const URL = `${config.siteUrl}${router.asPath || ''}`
  const image = `${config.siteUrl}${config.siteBanner}`

  const schemaOrgWebPage = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    url: URL,
    headline: config.siteHeadline,
    inLanguage: config.siteLanguage,
    mainEntityOfPage: URL,
    description: config.siteDescription,
    name: config.siteTitle,
    image: {
      '@type': 'ImageObject',
      url: image,
    },
    author: {
      '@type': 'Person',
      name: 'Breno Calazans',
    },
    copyrightHolder: {
      '@type': 'Person',
      name: 'Breno Calazans',
    },
    copyrightYear: '2021',
    creator: {
      '@type': 'Person',
      name: 'Breno Calazans',
    },
    publisher: {
      '@type': 'Person',
      name: 'Breno Calazans',
    },
    datePublished: '2020-05-02T10:30:00+01:00',
    dateModified: new Date(publicRuntimeConfig.buildTime).toISOString(),
  }

  return (
    <Head>
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgWebPage)}
      </script>
    </Head>
  )
}

export default SEOSite
