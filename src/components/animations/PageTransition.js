import React, { useState, createContext, useCallback } from 'react'
import gsap from 'gsap'

// transition context used bt intro/outro components to share the timeline
const TransitionContext = createContext({})

// provider to wrap the child components in the transition context
const TransitionProvider = ({ children }) => {
    const [timeline, setTimeline] = useState(() => 
        gsap.timeline({ paused: true })
    )

    return (
        <TransitionContext.Provider value={{
            timeline,
            setTimeline
        }}>
            { children }
        </TransitionContext.Provider>
    )
}

export { TransitionContext, TransitionProvider }