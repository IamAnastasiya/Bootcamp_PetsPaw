import Logo from "@/components/layout/Logo";
import MainNavigation from "@/components/layout/MainNavigation";
import ActionsHeader from "@/components/ui/ActionsHeader";
import GridLayout from "@/components/layout/GridLayout";
import VotingLog from "@/components/voting/VotingLog";
import BaseButton from "@/components/ui/BaseButton";
import styles from './FavoritesPage.module.scss'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { favoritesActions } from '../../store/favorites-slice';

type ImageDataType = {
    [key: string]: {
        [key: string]: string,
    }
};

interface Image {
    id: string;
    url: string;
  }

const FavoritesPage = () => {
    // const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();
    const [images, setImages] = useState<Image[]>([]);
    const userId = useSelector((state: RootState) => state.userId);
    const favorites = useSelector((state: RootState) => state.favorites);

    useEffect(() => {   
        console.log(favorites);
        const fetchData = async () => {
            const data = await fetch(`https://api.thecatapi.com/v1/favourites?sub_id=${userId.id}`, {
                headers:{
                    'x-api-key': 'live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX'
                }
            });
            const json = await data.json();
            const result = json.map((item: ImageDataType) => ({ url: item.image.url, id: item.image.id }));

            setImages(result);
            // console.log(result);
            // setIsLoading(false);
        }
        fetchData();
    }, [])

    const deleteFromFav = async (id: string) => {

        const favoriteItem = favorites.images.find(
            (item) => item.imageId === id
          );

        //   console.log(favoriteItem);
        const data = await fetch(`https://api.thecatapi.com/v1/favourites/${favoriteItem?.favId}`, {
            method: 'DELETE',
            headers:{
                'x-api-key': 'live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX',
                'Content-Type': 'application/json'
            }
        });
        // console.log(images);
        if (data.status === 200) {
            console.log('Successfully deleted favorite.');
            dispatch(favoritesActions.removeFromFavorites(id));
            console.log(images[0]);
            setImages((prevState) => prevState.filter(item => item.id !== id));
          } else {
            console.error('Failed to delete favorite:', await data.text());
          }
    }



    return <>

    
    {/* <div className={styles.wrapper}>
    <section className={styles["left-section"]}>
        <header className={styles.header}>
            <Logo/>
        </header>
        <MainNavigation></MainNavigation>
    </section> */}


    <section className={styles['favorites-section']}>
        <ActionsHeader></ActionsHeader>
        <div className={styles['favorites-container']}>
                <div className={styles['title-wrapper']}>
                    <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>FAVORITES</div>
                </div>
                {images.length !== 0 && <div className={styles['grid-wrapper']}>
                    <GridLayout limit={20} coverMode="fav" isFav={true} images={images} deleteFromFav={deleteFromFav}></GridLayout>
                </div>}

                {/* {images.length !== 0 && <VotingLog id="7524ghshc6" action="add" category="dislikes"></VotingLog>} */}
                {!images.length && <div className={styles['empty-text']}>No item found</div>}

            </div>
    </section>

{/* </div> */}
</>
}

export default FavoritesPage;