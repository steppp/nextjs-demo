import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/ImageLink.module.scss"

function ImageLink({ link, src, width, height, target, imageStyle, ...otherProps }) {
    target ??= '_self'
    const sizing = width && height ? { width, height } : { layout: 'fill' }

    return (
        <Link href={link}>
            <a className={styles.anchor}>
                <Image src={src} target={target} style={imageStyle} {...sizing} />
            </a>
        </Link>
    )
} 

export default ImageLink