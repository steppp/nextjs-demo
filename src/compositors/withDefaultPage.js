import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import styles from '../../styles/Home.module.scss'

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName ||
        WrappedComponent.name || 'Component'
}

export function withDefaultPage(WrappedComponent) {
    class WithDefaultPage extends React.Component {
        constructor(props) {
            super(props)
        }

        getAlert(message) {
            if (message) {
                return <div>{message}</div>
            }

            return null
        }

        render() {
            const { alertMessage, ...passthroughProps } = this.props
            const alert = this.getAlert(alertMessage)
            console.log(alert)

            return (
                <div className={styles.container}>
                    <Head>
                        <title>Create Next App</title>
                        <meta name="description" content="Generated by create next app" />
                        <link rel="icon" href="/favicon.ico" />
                    </Head>

                    { alert }

                    <main className={styles.main}>
                        <WrappedComponent {...passthroughProps} />
                    </main>

                    <footer className={styles.footer}>
                        <a
                            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Powered by{' '}
                            <span className={styles.logo}>
                                <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                            </span>
                        </a>
                    </footer>
                </div>
            )
        }
    }

    WithDefaultPage.displayName = `WithDefaultPage${getDisplayName(WrappedComponent)}`
    return WithDefaultPage
}