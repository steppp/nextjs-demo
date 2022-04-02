import { useContext, useRef, useState } from 'react'
import { gsap } from 'gsap'
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

const AnimatedGraphic = ({ 
    children, 
    whenChanges: triggerObj, 
    ...props }) => {
    const { timeline } = useContext(TransitionContext)
    const animatableObjectRef = useRef()
    const [counter, setCounter] = useState(0)
    const [transform, setTransform] = useState({})
    const [containerStyle, setContainerStyle] = useState({ height: 0, width: 0})

    useIsomorphicLayoutEffect(() => {
        if (animatableObjectRef.current) {
            const { height, width } = animatableObjectRef.current.parentElement.getBoundingClientRect()
            
            setContainerStyle({ height, width })
        }
    }, [animatableObjectRef])

    useIsomorphicLayoutEffect(() => {
        setTransform(positions[counter])
        setCounter((counter + 1) % positions.length)

        gsap.to(animatableObjectRef.current, {
            top: transform.y * containerStyle.height,
            left: transform.x * containerStyle.width,
            rotate: transform.rotate,
            duration: 0.5
        })
    }, [triggerObj])

    return (
        <>
            <div className={styles.animatedObjContainer}>
                <div ref={animatableObjectRef}
                    className={styles.animatedObj}>
                    <div className={styles.animatedObjContent}>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AnimatedGraphic