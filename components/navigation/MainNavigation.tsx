import styles from "./MainNavigation.module.scss";
import NavigationItem from "./NavigationItem";
import React from 'react';

const MainNavigation = () => {
    return (<div className={styles.wrapper}>
            <h1 className={styles["main-title"]}>Hi!👋</h1>
            <p className={styles["sub-title"]}>
                Welcome to my Pet Project 2023 / Next.js
            </p>
            <p className={styles["nav-text"]}>Lets start using The Cat API</p>

            <ul className={styles["nav-list"]}>
                <NavigationItem href="voting" image="/images/vote-table.png" />
                <NavigationItem href="breeds" image="/images/pet-breeds.png" />
                <NavigationItem href="gallery" image="/images/images-search.png" />
            </ul>
        </div>);
};

export default React.memo(MainNavigation);

