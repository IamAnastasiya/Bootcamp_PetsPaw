import MainNavigation from "@/components/layout/MainNavigation";
import Logo from "@/components/layout/Logo";

import styles from '../styles/HomePage.module.scss';



const HomePage = () => {

    return <>
    {/* <div className={styles["main-wrapper"]}> */}
            <section className={styles["nav-container"]}>
                <header className={styles.header}><Logo/></header>
                <MainNavigation></MainNavigation>
            </section>
            <section className={styles["image-container"]}>
                <img src="/images/girl-and-pet.png" alt="girl with a cat" className={styles['home-image']} />
            </section>
    {/* </div>; */}
    </>
}

export default HomePage;