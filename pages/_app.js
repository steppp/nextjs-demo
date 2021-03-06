import AnimatedGraphic from '../src/components/animations/AnimatedGraphic'
import { TransitionProvider } from '../src/components/animations/PageTransition'
import DefaultLayout from '../src/components/layouts/DefaultLayout'
import TransitionLayout from '../src/components/layouts/TransitionLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // example of composition (do not use this)
  // const PageComponent = withDefaultPage(Component)
  // return <PageComponent {...pageProps} />
  const pageContents = <Component {...pageProps} />
  
  return (
    <DefaultLayout>
      <TransitionProvider>
        <TransitionLayout>
            <AnimatedGraphic whenChanges={pageContents}>
              🤟
            </AnimatedGraphic>

            { pageContents }
        </TransitionLayout>
      </TransitionProvider>
    </DefaultLayout>
  )
}

export default MyApp
