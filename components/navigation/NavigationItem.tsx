import Link from "next/link";
import styles from "./NavigationItem.module.scss";
import BaseButton from "../buttons/BaseButton";
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import { mobileMenuActions } from "@/store/mobile-menu";

interface NavigationItemConfig {
    href: string,
    image: string,
}

const NavigationItem:React.FC<NavigationItemConfig> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const mobileMenu = useSelector((state: RootState) => state.mobileMenu);

    const handleMobileMenuClick = () => {
        if (mobileMenu.isOpen) {
            dispatch(mobileMenuActions.toggleMenuVisibility())
        }
    }

    return <li className={styles["list-item"]} onClick={handleMobileMenuClick} >
                <Link href={`/${props.href}`} className={`${styles["list-img"]} ${styles[`${props.href}`]}`}>
                    <img src={props.image} alt={`go to ${props.href} page`} width="100" height="124"/>
                </Link>
                <BaseButton 
                    link={true} 
                    href={`/${props.href}`} 
                    mode="main-nav-btn"
                    active={router.route.includes(`${props.href}`)}>
                    {props.href.toUpperCase()}
                </BaseButton>
            </li>
};

export default NavigationItem;
