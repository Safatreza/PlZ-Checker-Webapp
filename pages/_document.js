import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="PLZ Router Webapp - German Postal Code Routing System" />
        <meta name="author" content="AboutWater GmbH" />
        <meta name="project-id" content="plz-checker-webapp-2024" />
        <meta name="browser-id" content={`plz-checker-${Date.now()}`} />
        <link rel="icon" href="/favicon.ico" />
        <title>PLZ Router - AboutWater GmbH</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
