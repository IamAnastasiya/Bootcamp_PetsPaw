import Logo from "@/components/layout/Logo";
import MainNavigation from "@/components/layout/MainNavigation";
import ActionsHeader from "@/components/ui/ActionsHeader";
import GridLayout from "@/components/layout/GridLayout";
import styles from './LikesPage.module.scss';
import BaseButton from "@/components/ui/BaseButton";


const LikesPage = () => {
    const images = [
        // { url: '/images/test-image.png' },
        // { url: '/images/test-image.png' }
    ]



    return <>
    {/* <div className={styles.wrapper}>
    <section className={styles["left-section"]}>
        <header className={styles.header}>
            <Logo/>
        </header>
        <MainNavigation></MainNavigation>
    </section> */}
        
    <section className={styles['likes-section']}>
        <ActionsHeader></ActionsHeader>
        <div className={styles['likes-container']}>
                <div className={styles['title-wrapper']}>
                    <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>LIKES</div>
                </div>
                {images.length !== 0 && <GridLayout limit={20}></GridLayout>}
                {!images.length && <div className={styles['empty-text']}>No item found</div>}
            </div>
    </section>

{/* </div> */}

</>
}

export default LikesPage;