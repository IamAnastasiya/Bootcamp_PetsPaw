import { useState, useEffect } from 'react';
import  Image from 'next/image';

import BreedInfo from '@/components/breed-info/BreedInfo';
import Pagination from '@/components/pagination/Pagination';
import BackButton from "@/components/buttons/BackButton";

import { getImagesByBreed, getImageDetails, getAllBreeds } from '@/services/breeds-api';
import { getIdFromImageUrl } from '../../helpers/helpers';
import BreedData from '@/models/BreedData';

import styles from './breedId.module.scss';
import LoaderSpinner from '@/components/loader/LoaderSpinner';


const DetailPage:React.FC<{images: string[], info: BreedData}> = ({images, info}) => {

    const [imageNumber, setImageNumber] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
    }, [imageNumber]);


    const handleImageChange = async (index: number) => {
        setImageNumber(index);
    }

    const handleLoadEvent = (): void => setIsLoading(false);

return <div className={styles.container}>
            <div className={styles['title-wrapper']}>
                <BackButton></BackButton>
                <div className={styles['section-title']}>BREEDS</div>
                <div className={styles['section-id']}>{info.id?.toUpperCase()}</div>
            </div>

            <div className={styles['image-wrapper']}>
                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner/></div>}
                <Image 
                    src={images[imageNumber]} 
                    alt="cat image" 
                    className={`${styles.image} ${!isLoading ? styles.visible : ''}`} 
                    fill
                    priority
                    onLoadingComplete={handleLoadEvent}
                    sizes="(max-width: 640px) 100%"/>
                <Pagination count={images.length} active={imageNumber} setPagination={handleImageChange}/>
            </div>

            <BreedInfo info={info}></BreedInfo>

        </div>
}


export async function getStaticPaths() {

    const breedsFromApi = await getAllBreeds();

    return {
        fallback: false,
        paths: breedsFromApi.map((item: {name: string; id: string}) => ({ params: {breedId: item.id} }))
    }
}


export async function getStaticProps(context: {params: {breedId: string}}) {

    const breedId = context.params.breedId;

    const imagesByBreed = await getImagesByBreed(breedId);

    if (!imagesByBreed.length) {
        return {
            notFound: true
        };
    } else {
        const imagesArr = imagesByBreed.slice(0, 5).map((item: {url: string}) => item.url);

        const firstImage = getIdFromImageUrl(imagesArr[0]);
        const infoDetails = await getImageDetails(firstImage);

        return {
            props: {
                images: imagesArr,
                info: {
                    id: infoDetails.breeds[0].id,
                    description: infoDetails.breeds[0].description, 
                    name: infoDetails.breeds[0].name,
                    temperament: infoDetails.breeds[0].temperament, 
                    origin: infoDetails.breeds[0].origin, 
                    weight: { metric: infoDetails.breeds[0].weight.metric },
                    life_span: infoDetails.breeds[0].life_span
                }
            }
        }
    }
}


export default DetailPage;