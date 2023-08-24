import Link from "next/link";
import styles from "./MainNavigation.module.scss";
import BaseButton from "../ui/BaseButton";

const MainNavigation = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles["main-title"]}>Hi!👋</h1>
            <p className={styles["sub-title"]}>
                Welcome to MacPaw Bootcamp 2023
            </p>
            <p className={styles["nav-text"]}>Lets start using The Cat API</p>

            <ul className={styles["nav-list"]}>
                <li className={styles["list-item"]}>
                    <Link href="/voting" className={`${styles["list-img"]} ${styles.voting}`}>
                        <img src="/images/vote-table.png" alt="go to voting page" width="100" height="124"/>
                    </Link>
                    <BaseButton link={true} href="/voting" mode="white">VOTING</BaseButton>
                </li>
                <li className={styles["list-item"]}>
                    <Link href="/breeds" className={`${styles["list-img"]} ${styles.breeds}`}>
                        <img src="/images/pet-breeds.png" alt="go to breeds page"  width="117" height="163"/>
                    </Link>
                    <BaseButton link={true} href="/voting" mode="white">BREEDS</BaseButton>
                </li>
                <li className={styles["list-item"]}>
                    <Link href="/gallery" className={`${styles["list-img"]} ${styles.gallery}`}>
                        <img src="/images/images-search.png" alt="go to search page"  width="112" height="190"/>
                    </Link>
                    <BaseButton link={true} href="/voting" mode="white">GALLERY</BaseButton>
                </li>
            </ul>
        </div>
    );
};

export default MainNavigation;
