import ImageLink from "../ImageLink"
import styles from "../../../styles/Navbar/Menu.module.scss"

function ListItem({ item }) {
    return <li>
        { item.type === 'image' &&
            <ImageLink {...item} layout='responsive' />
        }
        { item.type === 'link' &&
            <a href={item.link} target={item.target}>
                {item.text}
            </a>
        }
    </li>

}

function Menu({ for: model, variant, ...otherProps}) {
    const { contents } = model
    const classList = [styles.menu_container]
    if (variant) {
        classList.push(styles[`menu_container__${variant}`])
    }

    return (
        <div className={classList.join(' ')}>
            <ul className={styles.items_list}>
                { contents?.map(item => <ListItem item={item} key={item.text + item.link} />)}
            </ul>
        </div>
    )
}

export default Menu