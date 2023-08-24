import Link from "next/link";
import styles from "./MainNavigation.module.scss";

const MainNavigation = () => {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles["main-title"]}>Hi!👋</h1>
            <p className={styles["sub-title"]}>
                Welcome to MacPaw Bootcamp 2023
            </p>
            <p className={styles["nav-text"]}>Lets start using The Cat API</p>

            <ul className={styles["nav-list"]}>
                <li>
                    <Link href="/voting" className={styles.voting}>
                        <img src="/images/vote-table.png" alt="go to voting page" width="100" height="124"/>
                    </Link>
                </li>
                <li>
                    <Link href="/breeds" className={styles.breeds}>
                        <img src="/images/pet-breeds.png" alt="go to breeds page"  width="117" height="163"/>
                    </Link>
                </li>
                <li>
                    <Link href="/gallery" className={styles.gallery}>
                        <img src="/images/images-search.png" alt="go to search page"  width="112" height="190"/>
                    </Link>
                </li>
                <li>
                    <Link href="/voting" className={styles['link-name']}>VOTING</Link>
                </li>
                <li>
                    <Link href="/breeds"  className={styles['link-name']}>BREEDS</Link>
                </li>
                <li>
                    <Link href="/gallery"  className={styles['link-name']}>GALLERY</Link>
                </li>
            </ul>
        </div>
    );
};

export default MainNavigation;
