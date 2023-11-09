import  Image from 'next/image';

import MainNavigation from "@/components/navigation/MainNavigation";
import Logo from "@/components/logo/Logo";

import styles from '../styles/HomePage.module.scss';



const HomePage = () => {
    return <>
            <section className={styles["nav-container"]}>
                <header className={styles.header}><Logo/></header>
                <MainNavigation></MainNavigation>
            </section>
            <section className={styles["image-container"]}>
                <Image 
                    src="/images/girl-and-pet.png" 
                    alt="girl with a cat" 
                    className={styles['home-image']} 
                    width={775} 
                    height={840} 
                    priority
                />
            </section>
    </>
}


export default HomePage;