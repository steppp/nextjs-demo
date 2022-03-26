import DefaultLayout from '../src/components/layouts/DefaultLayout'
import { withDefaultPage } from '../src/compositors/withDefaultPage'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  console.log(pageProps)

  // example of composition (do not use this)
  // const PageComponent = withDefaultPage(Component)
  // return <PageComponent {...pageProps} />
  
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  )
}

export default MyApp
