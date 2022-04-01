import { useContext, useRef, useState } from 'react'
import { TransitionContext } from './animations/PageTransition'
import styles from '../../styles/AnimatedGraphic.base.module.css'
import useIsomorphicLayoutEffect from '../hooks/useIsomorphicLayoutEffect'

const positions = [
    {
        x: 0.3,
        y: 0.7,
        rotate: 47
    },
    {
        x: -0.1,
        y: 0.1,
        rotate: 250
    },
    {
        x: 0.5,
        y: 0.8,
        rotate: 140
    },
    {
        x: 0.7,
        y: 0.2,
        rotate: 320
    }
]

const AnimatedGraphic = ({ children, content, ...props }) => {
    const [timeline, setTimeline] = useContext(TransitionContext)
    const animatableObjectRef = useRef()
    const [counter, setCounter] = useState(0)

    useIsomorphicLayoutEffect(() => {

    }, [children])

    return (
        <>
            <div className={styles.animatedObjContainer}>
                <div ref={animatableObjectRef}
                    className={styles.animatedObj}>
                    <div className={styles.animatedObjContent}>
                        {content}
                    </div>
                </div>
            </div>
            {children}
        </>
    )
}

export default AnimatedGraphic