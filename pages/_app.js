import { TransitionProvider } from '../src/components/animations/PageTransition'
import DefaultLayout from '../src/components/layouts/DefaultLayout'
import TransitionLayout from '../src/components/layouts/TransitionLayout'
import { withDefaultPage } from '../src/compositors/withDefaultPage'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // example of composition (do not use this)
  // const PageComponent = withDefaultPage(Component)
  // return <PageComponent {...pageProps} />
  
  return (
    <DefaultLayout>
      <TransitionProvider>
        <TransitionLayout>
          <Component {...pageProps} />
        </TransitionLayout>
      </TransitionProvider>
    </DefaultLayout>
  )
}

export default MyApp
