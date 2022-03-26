import React from 'react'
import { withDefaultPage } from "../src/compositors/withDefaultPage"

const TargetContents = () => <h1>Target page!</h1>

export default function Target(props) {

    const TargetContent = withDefaultPage(TargetContents) 
    const alertMessage = (document.referrer && `Previous path was ${document.referrer}`)

    return <TargetContent {...props} alertMessage={alertMessage} />
}