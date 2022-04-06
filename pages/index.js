import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.scss'
import SlideFadeInOut from '../src/components/animations/SlideFadeInOut'
import Head from 'next/head'
import staticData from '../src/static/home.json'

export default function Home(props) {
  return (
    <>
      <Head>
        <title>{staticData.title}</title>
      </Head>
      <SlideFadeInOut>
        <div>
          <h1 className={styles.title}>
            My awesome <a href="https://nextjs.org" target="_blank" rel='noreferrer'>Next.js</a> website!
          </h1>

          <p className={styles.description}>
            {staticData.description} <br />
            <Link href="/target">
              <a className={styles.internalLink}>
                Go to the target page
              </a>
            </Link>
          </p>
        </div>
      </SlideFadeInOut>
    </>
  )
}
