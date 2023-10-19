import NavigationItem from "../navigation/NavigationItem";
import styles from "./SidebarMenu.module.scss";
import { mobileMenuActions } from "@/store/mobile-menu";
import { useDispatch } from 'react-redux';

const SidebarMenu:React.FC<{isOpen: boolean}> = (props) => {

    const dispatch = useDispatch();
    const closeSidebarHandler = () => {
        dispatch(mobileMenuActions.toggleMenuVisibility())
    }

    if (!props.isOpen) {
        return;
    }

    return <div className={styles["mobile-menu"]}>
    <button className={styles.cross} onClick={closeSidebarHandler}></button>
    <ul className={styles["nav-list"]}>
            <NavigationItem href="voting" image="/images/vote-table.png" />
            <NavigationItem href="breeds" image="/images/pet-breeds.png" />
            <NavigationItem href="gallery" image="/images/images-search.png" />
        </ul>
    </div>
}

export default SidebarMenu;