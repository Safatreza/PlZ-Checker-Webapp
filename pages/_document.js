import { Html, Head, Main, NextScript } from 'next/document'

/**
 * Custom HTML document component
 * Configures HTML lang, meta tags, and document structure
 * @returns {JSX.Element} HTML document structure
 */
export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Basic meta tags for proper document setup */}
        <meta charSet="utf-8" />
        
        {/* SEO and application meta tags */}
        <meta name="description" content="PLZ Router Webapp - German Postal Code Routing System" />
        <meta name="author" content="aboutwater" />
        <meta name="project-id" content="plz-checker-webapp-2024" />
        <meta name="application" content="PLZ Router - aboutwater" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
