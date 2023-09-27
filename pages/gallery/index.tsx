import MainNavigation from "@/components/layout/MainNavigation";
import Logo from "@/components/layout/Logo";
import ActionsHeader from "@/components/ui/ActionsHeader";
import styles from './GalleryPage.module.scss';
import BaseButton from "@/components/ui/BaseButton";
import SelectList from "@/components/ui/SelectList";
import GridLayout from "@/components/layout/GridLayout";
import ModalContainer from "@/components/modal/ModalContainer";

import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice';
import UploadButton from "@/components/ui/UploadButton";


const GalleryPage = () => {
    // const dispatch = useDispatch();
    // const modal = useSelector((state: RootState) => state.modal);

    const orderOptions = ['Random', 'Desc', 'Asc'];
    const breedOptions = [''];
    const typeOptions = ['All', 'Static', 'Animated'];
    const limitOptions = ['5 items per page', '10 items per page', '15 items per page', '20 items per page'];

    const images = [
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' }
    ];


    return <>
    {/* <div className={styles.wrapper}>
        <ModalContainer />

        <section className={styles["left-section"]}>
            <header className={styles.header}>
                <Logo/>
            </header>
            <MainNavigation page="gallery"></MainNavigation>
        </section> */}
       
        <section>
            <ActionsHeader></ActionsHeader>
            <div className={styles['gallery-container']}>
                <div className={styles['title-wrapper']}>
                    <div className={styles['back-block']}>
                        <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                        <div className={styles['section-title']}>GALLERY</div>
                    </div>
                    <UploadButton></UploadButton>
                </div>

                <div className={styles['filters-wrapper']}>
                    <SelectList options={orderOptions} width={290} name="ORDER" bgColor="white"></SelectList>
                    <SelectList options={typeOptions} width={290} name="TYPE" bgColor="white"></SelectList>
                    <SelectList options={breedOptions} defaultText='None' width={290} name="BREED" bgColor="white"></SelectList>
                    <div>
                        <SelectList options={limitOptions} width={240} name="LIMIT" bgColor="white"></SelectList>
                        <BaseButton mode="action-button"></BaseButton>
                    </div>

                </div>
                <GridLayout images={images} limit={10} coverMode="fav"></GridLayout>
            </div>


        </section>

    {/* </div> */}
    </>
}

export default GalleryPage;