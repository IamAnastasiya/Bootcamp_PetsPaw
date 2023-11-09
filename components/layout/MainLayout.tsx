import Logo from "../logo/Logo";
import MainNavigation from "../navigation/MainNavigation";
import SidebarMenu from "../sidebar/SidebarMenu";
import SectionHeader from "../header/SectionHeader";
import styles from './MainLayout.module.scss'
import { setUserId } from "@/store/userId-slice";
import { getCookie } from "@/helpers/helpers";

import { useEffect } from 'react';
import { useRouter} from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import  { RootState }  from '../../store/index';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    children?: React.ReactNode
  };


const MainLayout:React.FC<Props> = ({children}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const mobileMenu = useSelector((state: RootState) => state.mobileMenu);

    useEffect(() => {
        const storedUserId = getCookie('userId');

        if (!storedUserId) {
            const uniqueUserId = uuidv4();
            document.cookie = `userId=${uniqueUserId}`;
            dispatch(setUserId(uniqueUserId));
        } else {
            dispatch(setUserId(storedUserId));
        }
    }, [dispatch]);

    return <>
        <SidebarMenu isOpen={mobileMenu.isOpen}/>
        <div className={styles.wrapper}>
            <section className={styles["left-section"]}> 
                <header className={styles.header}>
                    <Logo/>
                </header>
                <MainNavigation></MainNavigation>
            </section>
            <section className={styles['content-section']}>
                {router.pathname !== '/' && <SectionHeader/>}
                {children}
            </section>

        </div>
    </>
}

export default MainLayout;