import React from 'react'
import { withDefaultPage } from "../src/compositors/withDefaultPage"

export default function Target(props) {
    const alertMessage = (document.referrer && `Previous path was ${document.referrer}`)

    return (
        <h1>Target page!</h1>
    )
    // return <TargetContents {...props} alertMessage={alertMessage} />
}