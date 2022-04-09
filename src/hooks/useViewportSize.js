import { useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useViewportSize() {
    const initialState = {
        width: undefined,
        height: undefined
    }
    const [size, setSize] = useState(initialState)

    useIsomorphicLayoutEffect(() => {
        function handleSizeChange() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        handleSizeChange()

        window.addEventListener('resize', handleSizeChange)
        return () => window.removeEventListener('resize', handleSizeChange)
    }, [])
    
    return size
}

export default useViewportSize