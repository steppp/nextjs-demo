import { useContext, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { TransitionContext } from './PageTransition'
import styles from '../../../styles/AnimatedGraphic.base.module.scss'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import useViewportSize from '../../hooks/useViewportSize'

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
    const sizes = useViewportSize()
    const [ready, setReady] = useState(false)

    useIsomorphicLayoutEffect(() => {
        // do nothing while we do not have a value for the window sizes
        if (!sizes.height || !sizes.width) {
            return
        }

        if (animatableObjectRef.current) {
            const { height, width } = animatableObjectRef.current.parentElement.getBoundingClientRect()
            setContainerStyle({ height, width })
            // now that the container size is set, we can signal that the
            // component is ready to play animations
            setReady(true)
        }
    }, [animatableObjectRef, sizes])

    useIsomorphicLayoutEffect(() => {
        // do not play animations until we have all the data we need
        if (!ready) {
            return
        }

        const endTlParams = {
            target: animatableObjectRef.current,
            transform: positions[counter],
            normalizationValues: containerStyle,
        }
        const endTl = buildAnimationTimeline(endTlParams)
        const [, endTween ] = halveTimeline(endTl)
        endTween.vars.id = 'enter-tween'
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
        startTween.vars.id = 'exit-tween'

        timeline.add(startTween.play(), 0)
        // when the ready state changes we can, and should, run this hook
    }, [triggerObj, animatableObjectRef, ready])

    // useIsomorphicLayoutEffect(() => {
    //     // remove the currently scheduled exit timeline
    //     timeline.getById('exit-tween').kill()

    //     const startTlParams = {
    //         target: animatableObjectRef.current,
    //         transform: positions[counter],
    //         normalizationValues: containerStyle,
    //         duration: ANIMATION_DURATION
    //     }
    //     const startTl = buildAnimationTimeline(startTlParams)
    //     const [ startTween ] = halveTimeline(startTl)
    //     startTween.vars.id = 'exit-tween'

    //     timeline.add(startTween.play(), 0)
    // }, [sizes])

    return (
        <div className={styles.animated_obj_container}>
            <div ref={animatableObjectRef}
                className={styles.animated_obj}>
                <div className={styles.animated_obj_content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AnimatedGraphic