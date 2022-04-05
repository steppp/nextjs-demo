import { useContext, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { TransitionContext } from './PageTransition'
import styles from '../../../styles/AnimatedGraphic.base.module.scss'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'

/** @const {number} */
const ANIMATION_DURATION = 1

/**
 * Transform values which will be applied to the animatable object
 * @typedef {Object} AnimationTransform
 * @property {number} x - Offset from the start of the container on the x axis
 * @property {number} y - Offset from the start of the container on the y axis
 * @property {number} rotate - Rotation angle (in degrees) to apply to element
 */

/**
 * @type {Array<AnimationTransform>}
 */
const positions = [
    {
        x: 0.3,
        y: 0.7,
        rotate: 47
    },
    {
        x: -0.03,
        y: 0.1,
        rotate: 250
    },
    {
        x: 0.5,
        y: 0.8,
        rotate: 140
    },
    {
        x: 0.9,
        y: 0.2,
        rotate: 320
    }

]

/**
 * Computes the next counter value by adding one to the current value and taking the modulo
 * of that value by the provided maximum length
 * @param {number} counter Current value of the counter
 * @param {number} maxLength Upper limit (excluded) of the counter value
 * @returns The next counter value
 */
const getNextCounterValue = (counter, maxLength) => (counter + 1) % maxLength

/**
 * Returns two Tweens resulting from splitting the passed timeline
 * @param {gsap.core.Timeline} tl Timeline to split
 * @returns An array containing the two halves of the original timeline
 */
const halveTimeline = (tl) => {
    const timelineDuration = tl.duration()
    const firstHalf = tl.tweenFromTo(0, timelineDuration / 2).pause()
    const secondHalf = tl.tweenFromTo(timelineDuration / 2, timelineDuration).pause()
    return [firstHalf, secondHalf]
}

/**
 * Describes the size of an object by its width an height
 * @typedef {Object} Size
 * @property {number} width - Width of the object
 * @property {number} height - Height of the object
 */

/**
 * Wraps all the necessary parameters to build an animation timeline
 * @typedef {Object} AnimationBuilderConfig
 * @property {any} target Target object which is the subject of the timeline
 * @property {AnimationTransform} transform Transform data to transition to
 * @property {Size} normalizationValues Size of the container element to normalize the transform values
 * @property {number} duration Duration of the timeline to create
 */

/**
 * Utility method to build a timeline with a default duration of ANIMATION_DURATION which can be overridden.
 * @param {AnimationBuilderConfig} config Configuration object to use to build the timeline
 * @returns a gsap.Timeline object built using the provided info.
 */
const buildAnimationTimeline = (config) => {
    const timelineParams = {
        duration: ANIMATION_DURATION,
        transform: {
            x: 0,
            y: 0,
            rotate: 0
        },
        normalizationValues: {
            height: 0,
            width: 0
        },
        ...config
    }

    timelineParams.transform

    return gsap.timeline()
        .to(timelineParams.target, {
            top: timelineParams.transform.y * timelineParams.normalizationValues.height,
            left: timelineParams.transform.x * timelineParams.normalizationValues.width,
            rotate: timelineParams.transform.rotate,
            duration: timelineParams.duration
        })
        .pause()
}

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
        const endTlParams = {
            target: animatableObjectRef.current,
            transform: positions[counter],
            normalizationValues: containerStyle,
        }
        const endTl = buildAnimationTimeline(endTlParams)
        const [, endTween ] = halveTimeline(endTl)
        endTween.play()

        const nextCounterValue = getNextCounterValue(counter, positions.length)
        setCounter(nextCounterValue)

        const startTlParams = {
            target: animatableObjectRef.current,
            transform: positions[nextCounterValue],
            normalizationValues: containerStyle,
            duration: ANIMATION_DURATION
        }
        const startTl = buildAnimationTimeline(startTlParams)
        const [ startTween ] = halveTimeline(startTl)

        timeline.add(startTween.play(), 0)
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