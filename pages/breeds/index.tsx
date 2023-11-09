import { useEffect, useState } from 'react';
import { getAllBreeds, getSetOfImages } from "@/services/breeds-api";

import LoaderSpinner from "@/components/loader/LoaderSpinner";
import SelectList from "@/components/select/SelectList";
import BackButton from "@/components/buttons/BackButton";
import GridLayout from "@/components/layout/GridLayout";

import styles from './BreedsPage.module.scss';

import Image from '@/models/ImageData';
import ApiImageData from '@/models/ApiImageData';
import { BREED_LIMITS, BREEDS_DEFAULT } from '@/constants/constants';


const BreedsPage:React.FC<{breeds: {name: string, value: string}[]}> = (props) => {
    const [images, setImages] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [baseUrl, setBaseUrl] = useState(`images/search?&has_breeds=1&limit=10&order=RAND`);

    useEffect(() => {
            setIsLoading(true);
            getSetOfImages(baseUrl).then(response => {
                if (response.ok) {
                    return response.json();
                } 
    
                return response.json().then((data) => {
                    throw new Error(data.message || "Failed to fetch");
                });
            }).then(data => {
                const newImages = data.filter((item: ApiImageData) => item.breeds.length > 0).map((item: ApiImageData) => ({
                    image: { url: item.url }, 
                    image_id: item.id, 
                    breeds: { name: item.breeds[0].name, breedId: item.breeds[0].id }
                }));
                setImages(newImages);
            })
            .catch((error) => {
                setError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [baseUrl]);


    const setLoadingState = () => {
        setImages([]);
        setError(false);
        setIsLoading(true);
    }

    const limitSelectHandler = (value: string) => {
        setLoadingState();
        setBaseUrl((prevValue) => prevValue.replace(/limit=(\d+)/, `limit=${value}`));
    }

    const breedSelectHandler = (value: string) => {
        setLoadingState();
        const defaultValue = value === BREEDS_DEFAULT ? '' : `&breed_ids=${value}`;

        baseUrl.includes('breed_ids') ?
            setBaseUrl((prevValue) => prevValue.replace(/&breed_ids=[^&]+/, defaultValue)) :
            setBaseUrl((prevValue) => prevValue.concat(`&breed_ids=${value}`));
    }

    const sortingHandler = (value: string) => {
        setLoadingState();
        setBaseUrl((prevValue) => prevValue.replace(/&order=[^&]+/, `&order=${value}`));
    }


    return <div className={styles.container}>
                <div className={styles['title-wrapper']}>
                    <BackButton></BackButton>
                    <div className={styles['section-title']}>BREEDS</div>
                    <SelectList 
                        options={props.breeds} 
                        defaultText={BREEDS_DEFAULT} 
                        width={226} 
                        bgColor="gray"
                        onSetValue={breedSelectHandler}
                    ></SelectList>
                    <div>
                        <SelectList 
                            options={BREED_LIMITS} 
                            initial={BREED_LIMITS[1]} 
                            width={101} 
                            bgColor="gray" 
                            onSetValue={limitSelectHandler}
                        ></SelectList>
                        <button className={styles['filter-ZA']} onClick={() => sortingHandler('DESC')}></button>
                        <button className={styles['filter-AZ']} onClick={() => sortingHandler('ASC')}></button>
                    </div>
                </div>

                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                {!isLoading && <GridLayout images={images} limit={30} coverMode="breed" error={error}></GridLayout>}
            </div>
}



export async function getStaticProps() {
    const breeds = await getAllBreeds();
    const result = breeds.map((item: {name: string; id: string}) => ({ name: item.name, value: item.id }));

    return {
        props: {
            breeds: result
        },
        revalidate: 3600
    }
}


export default BreedsPage;



