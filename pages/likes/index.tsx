import Logo from "@/components/logo/Logo";
import MainNavigation from "@/components/navigation/MainNavigation";
import SectionHeader from "@/components/header/SectionHeader";
import GridLayout from "@/components/layout/GridLayout";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './LikesPage.module.scss';
import BackButton from "@/components/buttons/BackButton";

import Image from '../../models/Image';
import  { RootState }  from '../../store/index';
import { useSelector } from 'react-redux';
import { getAllVotes } from "@/services/votes-api";
import { useEffect, useState, useRef } from 'react';


const LikesPage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const userId = useSelector((state: RootState) => state.userId);
    const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render

    useEffect(() => {
        if (shoudGetCategoryCounts.current) { 
            shoudGetCategoryCounts.current = false;
            getAllVotes(userId.id).then(data => {
                data.forEach((item: Image) => {
                    item.value === 1 && setImages((prevState) => [...prevState, item]);      
                    setIsLoading(false);
            })
       })
    }
    }, [])

    return <section className={styles['likes-section']}>
        <SectionHeader/>
        <div className={styles['likes-container']}>
                <div className={styles['title-wrapper']}>
                    <BackButton></BackButton>
                    <div className={styles['section-title']}>LIKES</div>
                </div>                
                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                {images.length !== 0 && <GridLayout limit={60} images={images}></GridLayout>}
                {!images.length && !isLoading && <div className={styles['empty-text']}>No item found</div>}
            </div>
    </section>
}

export default LikesPage;