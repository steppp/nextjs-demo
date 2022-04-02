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

const getNextCounterValue = (counter, maxLength) => (counter + 1) % maxLength

const AnimatedGraphic = ({
    children,
    whenChanges: triggerObj,
    ...props }) => {
    const { timeline } = useContext(TransitionContext)
    const animatableObjectRef = useRef()
    const [counter, setCounter] = useState(0)
    const [containerStyle, setContainerStyle] = useState({ height: 0, width: 0 })

    useIsomorphicLayoutEffect(() => {
        if (animatableObjectRef.current) {
            const { height, width } = animatableObjectRef.current.parentElement.getBoundingClientRect()
            setContainerStyle({ height, width })
        }
    }, [animatableObjectRef])

    useIsomorphicLayoutEffect(() => {
        const transform = positions[counter]

        gsap.timeline()
            .to(animatableObjectRef.current, {
                top: transform.y * containerStyle.height,
                left: transform.x * containerStyle.width,
                rotate: transform.rotate,
                duration: 1
            })
            .play(0.5)

        const nextCounterValue = getNextCounterValue(counter, positions.length)
        setCounter(nextCounterValue)
        const nextTransform = positions[nextCounterValue]

        const firstHalfTimeline = gsap.timeline()
            .to(animatableObjectRef.current, {
                top: nextTransform.y * containerStyle.height,
                left: nextTransform.x * containerStyle.width,
                rotate: nextTransform.rotate,
                duration: 1
            })
            .pause()
        const firstHalfTween = firstHalfTimeline.tweenFromTo(0, 0.5)


        timeline.add(firstHalfTween, 0)
    }, [triggerObj, containerStyle])

    return (
        <div className={styles.animatedObjContainer}>
            <div ref={animatableObjectRef}
                className={styles.animatedObj}>
                <div className={styles.animatedObjContent}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AnimatedGraphic