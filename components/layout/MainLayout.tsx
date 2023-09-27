import Logo from "./Logo";
import MainNavigation from "./MainNavigation";
import styles from './MainLayout.module.scss'
import { setUserId } from "@/store/userId-slice";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    children?: React.ReactNode
  };


const MainLayout:React.FC<Props> = ({children}) => {
    const dispatch = useDispatch();

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



    return <>
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