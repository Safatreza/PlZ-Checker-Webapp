import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'
import Head from 'next/head'

/**
 * Root application component
 * Wraps all pages with global error boundary and CSS
 * @param {Object} props - App component props
 * @param {React.Component} props.Component - Current page component
 * @param {Object} props.pageProps - Props for the current page
 */
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>PLZ Router - aboutwater</title>
      </Head>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  )
}
