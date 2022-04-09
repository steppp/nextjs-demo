import { useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useViewportSize() {
    const initialState = {
        width: undefined,
        height: undefined
    }
    const [size, setSize] = useState(initialState)

    function handleSizeChange() {
        setSize({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useIsomorphicLayoutEffect(() => {
        handleSizeChange()

        window.addEventListener('resize', handleSizeChange)
        return () => window.removeEventListener('resize', handleSizeChange)
    }, [])

    return size
}

export default useViewportSize