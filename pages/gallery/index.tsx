import styles from './GalleryPage.module.scss';
import BackButton from "@/components/buttons/BackButton";
import BaseButton from "@/components/buttons/BaseButton";
import SelectList from "@/components/select/SelectList";
import GridLayout from "@/components/layout/GridLayout";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import ModalContainer from "@/components/modal/ModalContainer";
import ModalContent from '@/components/modal/ModalContent';

import { ORDER_OPTIONS, TYPE_OPTIONS, GALERY_LIMITS } from '@/constants/constants';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import  { RootState }  from '../../store/index';
import { getAllBreeds, getSetOfImages} from "@/services/breeds-api";
import { getAllFavorites, addToApiFavorites, deleteFromApiFavorites } from "@/services/favorites-api";
import UploadButton from "@/components/buttons/UploadButton";

import ImageData from '@/models/ImageData';
import ApiImageData from '@/models/ApiImageData';


const GalleryPage:React.FC<{breeds: {name: string, value: string}[], favorites: ImageData[], hasError: boolean}> = (props) => {
    const modal = useSelector((state: RootState) => state.modal);
    const userId = useSelector((state: RootState) => state.userId);

    const [images, setImages] = useState<ImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [nextSet, setNextSet] = useState(false);
    const [limit, setLimit] = useState(5);
    const [order, setOrder] = useState('RAND');
    const [type, setType] = useState('gif,jpg,png');
    const [error, setError] = useState(false);

    const [chosenBreed, setChosenBreed] = useState('');
    const [baseUrl, setBaseUrl] = useState(`images/search?&has_breeds=1&limit=5&order=RAND`);


    useEffect(() => {
        getSetOfImages(baseUrl).then(response => {
            if (response.ok) {
                return response.json();
            } 

            return response.json().then((data) => {
                throw new Error(data.message || "Failed to fetch");
            });
            
        }).then(data => {
            const newImages = data.map((item: ApiImageData) => ({
                image: { url: item.url }, 
                image_id: item.id,
                isFav: props.favorites ? props.favorites.some((favorite: ImageData) => favorite.image_id === item.id) : false
            }));   
            setImages(newImages);
        })
        .catch(error => {
            console.warn(error);
            setError(true);
        }).finally(() => {
            setIsLoading(false);
        });
    }, [baseUrl, nextSet, props.favorites]);

    const handleUpdateAction = () => {
        setImages([]);
        setIsLoading(true);
        setError(false);
        const breed = (!chosenBreed || chosenBreed === 'None') ? '' : `&breed_ids=${chosenBreed}`;

        setBaseUrl(`images/search?&has_breeds=${!breed ? 0 : 1}&limit=${limit}&order=${order}&mime_types=${type}${breed}`);
        setNextSet((prevState) => prevState = !prevState);
    }


    const updateFavoriteStatus = (id: string) => {
        const favoriteImageIds = props.favorites.map(favorite => favorite.image_id);

        if (favoriteImageIds.includes(id)) {
            const favoriteItem = props.favorites.find((item) => item.image_id === id);

            if (!favoriteItem || !favoriteItem.id) return;

            deleteFromApiFavorites(favoriteItem.id).then(data => {
                if (data.status !== 200) {
                    console.error('Failed to delete favorite');
                }
            })
            .catch(error => {
            console.error('Error deleting favorite:', error);
            });
        } else {
            addToApiFavorites({"image_id": id, "sub_id": userId})
        }

        setImages(prevImages => prevImages.map(image =>
            image.image_id === id ? { ...image, isFav: !image.isFav } : image
          ));     
    }


    return <div className={styles.container}>
                <div className={styles['title-wrapper']}>
                    <div className={styles['back-block']}>
                        <BackButton></BackButton>
                        <div className={styles['section-title']}>GALLERY</div>
                    </div>
                    <UploadButton></UploadButton>
                    {modal.isVisible && <ModalContainer><ModalContent /> </ModalContainer>}
                </div>

                <div className={styles['filters-wrapper']}>
                    <SelectList 
                        options={ORDER_OPTIONS} 
                        width={290} 
                        name="ORDER" 
                        bgColor="white" 
                        onSetValue={(value) => setOrder(value)}
                    ></SelectList>
                    <SelectList 
                        options={TYPE_OPTIONS} 
                        width={290} 
                        name="TYPE" 
                        bgColor="white" 
                        onSetValue={(value) => setType(value)}
                    ></SelectList>
                    <SelectList 
                        options={props.breeds}
                        defaultText='None' width={290} 
                        name="BREED" 
                        bgColor="white"   
                        onSetValue={(value) => setChosenBreed(value)}
                    ></SelectList>
                    <div>
                        <SelectList 
                            options={GALERY_LIMITS} 
                            width={240} 
                            initial={GALERY_LIMITS[0]}
                            name="LIMIT" 
                            bgColor="white" 
                            onSetValue={(value) => setLimit(+value)}
                        ></SelectList>
                        <BaseButton mode="action-button" onClick={handleUpdateAction}></BaseButton>
                    </div>

                </div>

                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                {!error && !images.length && !isLoading && <div className={styles['empty-text']}>No item found</div>}

                {!isLoading && (images.length || error) && <GridLayout 
                    limit={20} 
                    images={images}
                    error={error || props.hasError} 
                    coverMode="fav" 
                    onFavoriteUpdate={updateFavoriteStatus}
                ></GridLayout>}

            </div>
}


export async function getServerSideProps(context: {req: {headers: {cookie: string}}}) {

    const cookies = context.req.headers.cookie;
    const userIdMatch = cookies.match(/userId=([^;]+)/);
    let allFavorites: ImageData[] = [];
    let breedsFetched:{name: string, value: string}[] = [];
    let hasError = false;

    if (!userIdMatch) {
        return {
            props: {
                favorites: allFavorites,
                breeds: breedsFetched,
                hasError
            }        
        }
    }

    const userId = userIdMatch[1];
    
    const favorites = await getAllFavorites(userId);
    const breeds = await getAllBreeds();

    if (favorites.hasError) {
        hasError = favorites.hasError; 
    }

    if (favorites && favorites.length) {
        allFavorites = favorites.map((item: ImageData) => ({ ...item, isFav: true }));
    }

    if (breeds && breeds.length) {
        breedsFetched = breeds.map((item: {name: string; id: string}) => ({ name: item.name, value: item.id }));
    }

    return {
        props: {
            breeds: breedsFetched,
            favorites: allFavorites,
            hasError
        }
    }

}

export default GalleryPage;