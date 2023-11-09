import GridLayout from "@/components/layout/GridLayout";
import ActionLog from "@/components/action-log/ActionLogLog";
import BackButton from "@/components/buttons/BackButton";
import styles from './FavoritesPage.module.scss';

import ImageData from '../../models/ImageData';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { logsActions } from '../../store/userLogs-slice';
import { getAllFavorites, deleteFromApiFavorites } from "@/services/favorites-api";


const FavoritesPage:React.FC<{favorites: ImageData[], hasError: boolean}>  = (props) => {

    const dispatch = useDispatch();
    const [images, setImages] = useState<ImageData[]>(props.favorites);
    const favoritesLog = useSelector((state: RootState) => state.userLogs.favoritesLog);

    const deleteFromFav = async (id: string) => {
        const favoriteItem = images.find((item) => item.image_id === id);
        if (!favoriteItem || !favoriteItem.id) return;

        deleteFromApiFavorites(favoriteItem.id).then(data => { 
            if (data.status == 200) {
                setImages((prevState) => prevState.filter(item => item.image_id !== id));  
            } else {
                console.error('Failed to delete favorite');  
            }
        });  

        dispatch(logsActions.addToFavotitesLog({id: id, action: 'remove', category: 'favorites'}));
    }


    return <div className={styles.container}>
                <div className={styles['title-wrapper']}>
                    <BackButton></BackButton>
                    <div className={styles['section-title']}>FAVORITES</div>
                </div>

                {images.length === 0 && !props.hasError && <div className={styles['empty-text']}>No item found</div>}
                {(images.length > 0 || props.hasError) && <div className={styles['grid-wrapper']}>
                    <GridLayout 
                        limit={30} 
                        coverMode="fav" 
                        images={images} 
                        onFavoriteUpdate={deleteFromFav} 
                        error={props.hasError}
                    ></GridLayout>
                </div>}


                {favoritesLog.map(info => (
                    <ActionLog key={info.id} id={info.id} action={info.action} category={info.category}></ActionLog>
                ))}

            </div>
}



export async function getServerSideProps(context: {req: {headers: {cookie: string}}}) {

    const cookies = context.req.headers.cookie;
    const userIdMatch = cookies.match(/userId=([^;]+)/);
    let favoritesFetched: ImageData[] = [];
    let hasError = false;

    if (!userIdMatch) {
        return {
            props: {
                favorites: favoritesFetched,
                hasError
            }        
        }
    }

    const userId = userIdMatch[1];
    const favoritesData = await getAllFavorites(userId);

    if (favoritesData.hasError) {
        hasError = favoritesData.hasError; 
    }

    if (favoritesData && favoritesData.length) {
        favoritesFetched = favoritesData.map((item: ImageData) => ({ ...item, isFav: true }));
    }
    

    return {
        props: {
            favorites: favoritesFetched,
            hasError: hasError
        }
    }

}



export default FavoritesPage;


