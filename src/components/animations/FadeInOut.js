import { useContext, useRef } from 'react'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import { TransitionContext } from './PageTransition'
import { gsap } from 'gsap'

const FadeInOut = ({ children }) => {
    const { timeline } = useContext(TransitionContext)
    const el = useRef()

    useIsomorphicLayoutEffect(() => {
        // intro animation will play immediately
        gsap.to(el.current, {
            opacity: 1,
            duration: 1
        })

        // add outro animation to top-level outro animation timeline
        timeline.add(
            gsap.to(el.current, {
                opacity: 1,
                duration: 1
            }),
            0
        )
    }, [])

    // set initial opacity to 0 to avoid FOUC for SSR
    return <div ref={el} style={{ opacity: 0 }}>
        {children}
    </div>
}

export default FadeInOut