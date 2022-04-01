import AnimatedGraphic from '../src/components/AnimatedGraphic'
import { TransitionProvider } from '../src/components/animations/PageTransition'
import DefaultLayout from '../src/components/layouts/DefaultLayout'
import TransitionLayout from '../src/components/layouts/TransitionLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  // example of composition (do not use this)
  // const PageComponent = withDefaultPage(Component)
  // return <PageComponent {...pageProps} />
  
  return (
    <DefaultLayout>
      <TransitionProvider>
        <TransitionLayout>
            <AnimatedGraphic content='🤟'>
              <Component {...pageProps} />
            </AnimatedGraphic>
        </TransitionLayout>
      </TransitionProvider>
    </DefaultLayout>
  )
}

export default MyApp
