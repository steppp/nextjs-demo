import React from 'react'
import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import SlideFadeInOut from '../src/components/animations/SlideFadeInOut'
import styles from '../styles/Home.module.css'

export default function Target(props) {
    const navBtn = createRef()
    const router = useRouter();

    useEffect(() => {
        navBtn.current?.addEventListener('click', router.back)
    }, [navBtn])

    return (
        <SlideFadeInOut>
            <div>
                <h1 className={ styles.title }>Target page!</h1>

                <p className={ styles.description }>
                    <button ref={navBtn} className={ styles.button }>
                        BACK
                    </button>
                </p>
            </div>
        </SlideFadeInOut>
    )
}