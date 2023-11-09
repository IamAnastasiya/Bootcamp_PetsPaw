import GridLayout from "@/components/layout/GridLayout";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './SearchPage.module.scss';
import BackButton from "@/components/buttons/BackButton";

import ImageData from '../../models/ImageData';
import { useRouter} from 'next/router';
import { getImagesByBreed, getAllBreeds } from '@/services/breeds-api';
import { getBreedId } from "@/helpers/helpers";
import { useEffect, useState } from 'react';

import Breed from '@/models/Breed';


const SearchPage:React.FC<{breeds: Breed[]}> = (props) => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();
    const searchInput = router.query.breed as string;


    useEffect(() => {
            setIsLoading(true);
            setImages([]);

            const breed = getBreedId(props.breeds, searchInput);

            try {
                handleSearch(breed);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
    }, [searchInput, props.breeds]);


    const handleSearch = async(breed: {name: string, id: string}) => {
        if (breed.id  === '') {
            setIsLoading(false);
            return;
        }

        const data = await getImagesByBreed(breed.id);
        const newImage = [{
            image: { url: data[0].url }, 
            image_id: data[0].id,
            breeds: { name: breed.name, breedId: breed.id} 
        }]
        setImages(newImage);
        setIsLoading(false);
    }

    return <div className={styles.container}>
                <div className={styles['title-wrapper']}>
                    <BackButton></BackButton>
                    <div className={styles['section-title']}>SEARCH</div>
                </div>  
                <p className={styles['result-text']}>Search results for: &apos;<span className={styles.input}>{searchInput}</span> &apos;</p>              
                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                {!isLoading && images.length !== 0 && <GridLayout limit={1} images={images} coverMode="breed"></GridLayout>}
                {!isLoading && !images.length && <div className={styles['empty-text']}>No item found</div>}    
            </div>
}


export async function getStaticProps() {
    const breeds = await getAllBreeds();

    return {
        props: {
            breeds: breeds
        },
        revalidate: 3600
    }
}


export default SearchPage;