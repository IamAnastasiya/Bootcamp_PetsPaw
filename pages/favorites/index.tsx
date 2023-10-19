import Logo from "@/components/logo/Logo";
import MainNavigation from "@/components/navigation/MainNavigation";
import SectionHeader from "@/components/header/SectionHeader";
import GridLayout from "@/components/layout/GridLayout";
import ActionLog from "@/components/action-log/ActionLogLog";
import BackButton from "@/components/buttons/BackButton";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './FavoritesPage.module.scss';

import Image from '../../models/Image';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { logsActions } from '../../store/userLogs-slice';
import  { favoritesActions } from '../../store/favorites-slice';
import { getAllFavorites, deleteFromApiFavorites } from "@/services/favorites-api";

// type ImageDataType = {
//     [key: string]: {
//         [key: string]: string,
//     }
// };

const FavoritesPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const [images, setImages] = useState<Image[]>([]);
    const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render
    const userId = useSelector((state: RootState) => state.userId);
    const favoritesLog = useSelector((state: RootState) => state.userLogs.favoritesLog);


    // const favorites = useSelector((state: RootState) => state.favorites);

    useEffect(() => {   
        if (shoudGetCategoryCounts.current) { 
            shoudGetCategoryCounts.current = false;
            // if (!favorites.length) {
                setIsLoading(true);  
                getAllFavorites(userId.id).then(data => {
                    // dispatch(favoritesActions.addToFavorites(data))
                    const favoriteImages = data.map((item: Image) => ({
                        ...item,
                        isFav: true,
                      }));
                    setImages(favoriteImages);  
                    setIsLoading(false);  
                })
            // } else {
            //     setIsLoading(false);  
            // }
        }
    }, [])

    // console.log('data from store');
    // console.log(favorites);

    const deleteFromFav = async (id: string) => {
        const favoriteItem = images.find((item) => item.image_id === id);
        if (!favoriteItem || !favoriteItem.id) return;

        // console.log(favoriteItem.id);

        deleteFromApiFavorites(favoriteItem.id).then(data => {
            data.status !== 200 && console.error('Failed to delete favorite');  
            setImages((prevState) => prevState.filter(item => item.image_id !== id));    
        });  

        // dispatch(favoritesActions.removeFromFavorites(String(favoriteItem.id)));

        dispatch(logsActions.addToFavotitesLog({id: id, action: 'remove', category: 'favorites'}));
    }

    // if (!images.length && !isLoading) {
    //    return <div className={styles['empty-text']}>No item found</div>
    // }

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
                    {/* <GridLayout limit={30} coverMode="fav" isFav={true} images={images} onClick={deleteFromFav}></GridLayout> */}
                    <GridLayout limit={30} coverMode="fav" images={images} onFavoriteUpdate={deleteFromFav}></GridLayout>
                </div>}


                {favoritesLog.map(info => (
                    <ActionLog key={info.id} id={info.id} action={info.action} category={info.category}></ActionLog>
                ))}

            </div>
    </section>
}

export default FavoritesPage;


