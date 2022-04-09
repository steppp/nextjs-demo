import react from "react"
import styles from '../../../styles/Navbar/Navbar.module.scss'
import navigationData from '../../static/navigation.json'
import Menu from "./Menu"

const Navbar = (props) => {
    return (
        <nav className={styles.navbar}>
            {/* IMPROVEMENT: iterate over the keys of navigationData for a variable number of menus */}
            {navigationData.leftMenu &&
                <Menu for={navigationData.leftMenu} variant="left"/>}
            {navigationData.centerMenu &&
                <Menu for={navigationData.centerMenu} variant="center" />}
            {navigationData.rightMenu &&
                <Menu for={navigationData.rightMenu} variant="right" />}
        </nav>
    )
}

export default Navbar