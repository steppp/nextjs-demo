import Link from 'next/link'
import { withDefaultPage } from '../src/compositors/withDefaultPage'
import React from 'react'
import styles from '../styles/Home.module.css'

function HomeContents (props) {
  return (
    <div>
      <h1 className={styles.title}>
        My awesome demo website!
      </h1>

      <p className={styles.description}>
        <Link href="/target">
          <a>
            Go to the target page
          </a>
        </Link>
      </p>
    </div>
  )
}

export default function Home (props) {
  const PageContent = withDefaultPage(HomeContents)
  return <PageContent {...props} />
}
