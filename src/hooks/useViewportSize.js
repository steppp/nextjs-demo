import { useState } from 'react'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'

function useViewportSize() {
    const initialState = {
        width: 0,
        height: 0
    }
    const [size, setSize] = useState(initialState)

    useIsomorphicLayoutEffect(() => {
        function handleSizeChange() {
            setSize({
                width: window?.innerWidth,
                height: window.innerHeight
            })
        }

        window?.addEventListener('resize', handleSizeChange)
        return () => window?.removeEventListener('resize', handleSizeChange)
    })

    return size
}

export default useViewportSize