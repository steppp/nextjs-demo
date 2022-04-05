import { createRef, useEffect } from 'react'
import { useRouter } from 'next/router'
import SlideFadeInOut from '../src/components/animations/SlideFadeInOut'
import styles from '../styles/Home.module.scss'

export default function Target(props) {
    const navBtn = createRef()
    const router = useRouter();

    useEffect(() => {
        navBtn.current?.addEventListener('click', router.back)
    }, [navBtn, router])

    return (
        <SlideFadeInOut>
            <div>
                <h1 className={ styles.title }>Look at that! 🚀</h1>

                <p className={ styles.description }>
                    <button ref={navBtn} className={ styles.button }>
                        ⏮ BACK
                    </button>
                </p>
            </div>
        </SlideFadeInOut>
    )
}