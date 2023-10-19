import Logo from "../logo/Logo";
import MainNavigation from "../navigation/MainNavigation";
import SidebarMenu from "../sidebar/SidebarMenu";
import styles from './MainLayout.module.scss'
import { setUserId } from "@/store/userId-slice";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import  { RootState }  from '../../store/index';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    children?: React.ReactNode
  };


const MainLayout:React.FC<Props> = ({children}) => {
    const dispatch = useDispatch();
    const mobileMenu = useSelector((state: RootState) => state.mobileMenu);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');

        if (!storedUserId) {
            const uniqueUserId = uuidv4();
            localStorage.setItem('userId', uniqueUserId);
            dispatch(setUserId(uniqueUserId));
        } else {
            dispatch(setUserId(storedUserId));
        }
    }, []);

    // if (mobileMenu.isOpen) {
    //     return <SidebarMenu/>
    // }

    return <>
        <SidebarMenu isOpen={mobileMenu.isOpen}/>
        <div className={styles.wrapper}>
            <section className={styles["left-section"]}> 
                <header className={styles.header}>
                    <Logo/>
                </header>
                <MainNavigation></MainNavigation>
            </section>
            {children}
        </div>
    </>
}

export default MainLayout;