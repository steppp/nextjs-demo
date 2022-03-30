import { gsap } from 'gsap'
import { useContext, useRef, useState } from 'react'
import useIsomorphicLayoutEffect from '../../hooks/useIsomorphicLayoutEffect'
import { TransitionContext } from '../animations/PageTransition'

export default function TransitionLayout({ children }) {
    const [displayChildren, setDisplayChildren] = useState(children)
    const { timeline } = useContext(TransitionContext)
    const el = useRef()

    useIsomorphicLayoutEffect(() => {
        if (children !== displayChildren) {
            if (timeline.duration() === 0) {
                // there are no outro animations, transition immediately
                setDisplayChildren(children)
            } else {
                timeline.play().then(() => {
                    // outro complete, reset to an empty paused timeline
                    timeline.seek(0).pause().clear()
                    setDisplayChildren(children)
                })
            }
        }
    }, [children])

    return <div ref={el}>
        {displayChildren}
    </div>
}