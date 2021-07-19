import Head from 'next/head'
import Script from 'next/script'

function GoogleAnalyticsScript() {
  return (
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-98L1WDD59N"
      onLoad={() => {
        // @ts-expect-error
        window.dataLayer = window.dataLayer || []
        function gtag() {
          // @ts-expect-error
          dataLayer.push(arguments)
        }
        // @ts-expect-error
        gtag('js', new Date())

        // @ts-expect-error
        gtag('config', 'G-98L1WDD59N')
      }}
    />
  )
}

export default GoogleAnalyticsScript
