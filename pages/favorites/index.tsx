import SectionHeader from "@/components/header/SectionHeader";
import GridLayout from "@/components/layout/GridLayout";
import ActionLog from "@/components/action-log/ActionLogLog";
import BackButton from "@/components/buttons/BackButton";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './FavoritesPage.module.scss';

import ImageData from '../../models/ImageData';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { logsActions } from '../../store/userLogs-slice';
import { getAllFavorites, deleteFromApiFavorites } from "@/services/favorites-api";


const FavoritesPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const [images, setImages] = useState<ImageData[]>([]);
    const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render
    const userId = useSelector((state: RootState) => state.userId);
    const favoritesLog = useSelector((state: RootState) => state.userLogs.favoritesLog);

    useEffect(() => {   
        if (shoudGetCategoryCounts.current) { 
            shoudGetCategoryCounts.current = false;
                setIsLoading(true);  
                getAllFavorites(userId.id).then(data => {
                    const favoriteImages = data.map((item: ImageData) => ({
                        ...item,
                        isFav: true,
                      }));
                    setImages(favoriteImages);  
                    setIsLoading(false);  
                })
        }
    }, [userId.id])

    const deleteFromFav = async (id: string) => {
        const favoriteItem = images.find((item) => item.image_id === id);
        if (!favoriteItem || !favoriteItem.id) return;

        deleteFromApiFavorites(favoriteItem.id).then(data => {
            data.status !== 200 && console.error('Failed to delete favorite');  
            setImages((prevState) => prevState.filter(item => item.image_id !== id));    
        });  

        dispatch(logsActions.addToFavotitesLog({id: id, action: 'remove', category: 'favorites'}));
    }


    return <section className={styles['favorites-section']}>
        <SectionHeader/>
        <div className={styles['favorites-container']}>
                <div className={styles['title-wrapper']}>
                    <BackButton></BackButton>
                    <div className={styles['section-title']}>FAVORITES</div>
                </div>
                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}

                {!isLoading && images.length === 0 && <div className={styles['empty-text']}>No item found</div>}
                {!isLoading && images.length > 0 && <div className={styles['grid-wrapper']}>
                    <GridLayout limit={30} coverMode="fav" images={images} onFavoriteUpdate={deleteFromFav}></GridLayout>
                </div>}


                {favoritesLog.map(info => (
                    <ActionLog key={info.id} id={info.id} action={info.action} category={info.category}></ActionLog>
                ))}

            </div>
    </section>
}

export default FavoritesPage;


