import SectionHeader from "@/components/header/SectionHeader";
import styles from './GalleryPage.module.scss';
import BackButton from "@/components/buttons/BackButton";
import BaseButton from "@/components/buttons/BaseButton";
import SelectList from "@/components/select/SelectList";
import GridLayout from "@/components/layout/GridLayout";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import ModalContainer from "@/components/modal/ModalContainer";

import { ORDER_OPTIONS, TYPE_OPTIONS, GALERY_LIMITS } from '@/constants/constants';

import { useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import  { RootState }  from '../../store/index';
import { getAllBreeds, getSetOfImages} from "@/services/breeds-api";
import { getAllFavorites, addToApiFavorites, deleteFromApiFavorites } from "@/services/favorites-api";
import UploadButton from "@/components/buttons/UploadButton";

import ImageData from '@/models/ImageData';
import ApiImageData from '@/models/ApiImageData';


const GalleryPage:React.FC<{breeds: {name: string, value: string}[]}> = (props) => {
    const modal = useSelector((state: RootState) => state.modal);
    const userId = useSelector((state: RootState) => state.userId);


    const [images, setImages] = useState<ImageData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState('5');
    const [order, setOrder] = useState('RAND');
    const [type, setType] = useState('gif,jpg,png');

    const [chosenBreed, setChosenBreed] = useState('');
    const [favorites, setFavorites] = useState<ImageData[]>([]);
    const [baseUrl, setBaseUrl] = useState(`images/search?&has_breeds=1&limit=5&order=RAND`);
    const shoudGetAllBreeds = useRef(true);     // to prevent duplicated useEffect running for the initial render


    useEffect(() => {
        if (shoudGetAllBreeds.current) { 
            shoudGetAllBreeds.current = false;
            getAllFavorites(userId.id).then(data => {
                const favoriteImages = data.map((item: ImageData) => ({...item,  isFav: true }));
                setFavorites(favoriteImages);  
                getSetOfImages(baseUrl).then(data => {
                    const newImages = data.map((item: ApiImageData) => ({
                        image: { url: item.url }, 
                        image_id: item.id,
                        isFav: favoriteImages.some((favorite: ImageData) => favorite.image_id === item.id)
                    }));   
  
                    setIsLoading(false);
                    setImages(newImages);
                })
        });
        }
    }, [baseUrl, isLoading, userId.id]);


    const handleUpdateAction = () => {
        shoudGetAllBreeds.current = true;
        setImages([]);
        setIsLoading(true);

        const breed = (!chosenBreed || chosenBreed === 'None') ? '' : `breed_ids=${chosenBreed}`;
        const imageType = type === 'gif' ? 'mime_type=gif' : `mime_types=${type}`;
        setBaseUrl(`images/search?&has_breeds=1&limit=${limit}&order=${order}&${breed}&${imageType}`);
    }

    const updateFavoriteStatus = (id: string) => {
        const favoriteImageIds = favorites.map(favorite => favorite.image_id);

        if (favoriteImageIds.includes(id)) {
            const favoriteItem = favorites.find((item) => item.image_id === id);

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
            addToApiFavorites({"image_id": id, "sub_id": userId.id})

        }

        setImages(prevImages => prevImages.map(image =>
            image.image_id === id ? { ...image, isFav: !image.isFav } : image
          ));     
    }




    return <section className={styles['gallery-section']}>
            <SectionHeader/>
            <div className={styles['gallery-container']}>
                <div className={styles['title-wrapper']}>
                    <div className={styles['back-block']}>
                        <BackButton></BackButton>
                        <div className={styles['section-title']}>GALLERY</div>
                    </div>
                    <UploadButton></UploadButton>
                    {modal.isVisible && <ModalContainer/>}
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
                            onSetValue={(value) => setLimit(value)}
                        ></SelectList>
                        <BaseButton mode="action-button" onClick={handleUpdateAction}></BaseButton>
                    </div>

                </div>

                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                <GridLayout limit={20} images={images} coverMode="fav" onFavoriteUpdate={updateFavoriteStatus}></GridLayout>
            </div>
        </section>
}


export async function getStaticProps() {
    const breeds = await getAllBreeds();
    const result = breeds.map((item: {name: string; id: string}) => ({ name: item.name, value: item.id }));

    return {
        props: {
            breeds: result
        }
    }
}


export default GalleryPage;