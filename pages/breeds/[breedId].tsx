import { useRouter } from 'next/router';
import MainNavigation from "@/components/layout/MainNavigation";
import Logo from "@/components/layout/Logo";
import ActionsHeader from "@/components/ui/ActionsHeader";
import BreedInfo from '@/components/breeds/BreedInfo';
import Pagination from '@/components/ui/Pagination';
import BaseButton from "@/components/ui/BaseButton";
import styles from './breedId.module.scss';


const DetailPage:React.FC<{}> = (props) => {
    const router = useRouter();
    const breedId = router.query.breedId;


return <>
{/* <div className={styles.wrapper}>
            <section className={styles["left-section"]}>
                <header className={styles.header}>
                    <Logo/>
                </header>
                <MainNavigation page="breeds"></MainNavigation>
            </section> */}
       
        <section>
            <ActionsHeader></ActionsHeader>
            <div className={styles['breeds-container']}>
                <div className={styles['title-wrapper']}>
                    <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>BREEDS</div>
                    <div className={styles['section-id']}>ID</div>
                </div>

                <div>
                    <div className={styles['image-wrapper']}>
                        <img src={`/images/test-image.png`} alt="cat image" className={styles.image}/>
                        <Pagination count={5}/>
                    </div>

                    <BreedInfo></BreedInfo>
                </div>
            </div>
        </section>
        </>
// </div>;

}

export default DetailPage;