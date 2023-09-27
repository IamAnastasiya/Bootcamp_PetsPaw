import Logo from "@/components/layout/Logo";
import MainNavigation from "@/components/layout/MainNavigation";
import ActionsHeader from "@/components/ui/ActionsHeader";
import GridLayout from "@/components/layout/GridLayout";
import BaseButton from "@/components/ui/BaseButton";
import styles from './DislikesPage.module.scss';


const DislikesPage = () => {
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


    <section className={styles['dislikes-section']}>
        <ActionsHeader></ActionsHeader>
        <div className={styles['dislikes-container']}>
                <div className={styles['title-wrapper']}>
                    <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>DISLIKES</div>
                </div>
   
                {images.length !== 0 && <GridLayout limit={20}></GridLayout>}
                {!images.length && <div className={styles['empty-text']}>No item found</div>}

            </div>
    </section>

{/* </div> */}
</>
}

export default DislikesPage;