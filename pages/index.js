import Link from 'next/link'
import { withDefaultPage } from '../src/compositors/withDefaultPage'
import React from 'react'
import styles from '../styles/Home.module.css'
import SlideFadeInOut from '../src/components/animations/SlideFadeInOut'

export default function Home(props) {
  return (
    <SlideFadeInOut>
      <div>
        <h1 className={styles.title}>
          My awesome 
          <a href="https://nextjs.org" target="_blank" rel='noreferrer'> Next.js </a> 
          website!
        </h1>

        <p className={styles.description}>
          <Link href="/target">
            <a>
              Go to the target page
            </a>
          </Link>
        </p>
      </div>
    </SlideFadeInOut>
  )
}
