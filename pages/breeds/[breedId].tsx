import { useRouter} from 'next/router';
import { useEffect, useState, useRef } from 'react';

import SectionHeader from "@/components/header/SectionHeader";
import BreedInfo from '@/components/breed-info/BreedInfo';
import Pagination from '@/components/pagination/Pagination';
import BackButton from "@/components/buttons/BackButton";
import LoaderSpinner from '@/components/loader/LoaderSpinner';

import { getImagesByBreed, getImageDetails } from '@/services/breeds-api';
import { getIdFromImageUrl } from '../../helpers/helpers';
import BreedData from '@/models/BreedData';

import styles from './breedId.module.scss';



const DetailPage:React.FC<{}> = () => {

    const shoudGetAllBreeds = useRef(true);     // to prevent duplicated useEffect running for the initial render
    const [images, setImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [imageNumber, setImageNumber] = useState(0);
    const [info, setInfo] = useState<BreedData>({ description: '',  name: '',temperament: '',origin: '', weight: { metric: '', },life_span: ''});

    const router = useRouter();
    const breedId = router.query.breedId as string;
    // const currentImageId = router.query.image_id as string;

    useEffect( () => {
        if (shoudGetAllBreeds.current) { 
            shoudGetAllBreeds.current = false;

            try {
                getImagesByBreed(breedId).then(data => {
                    const imagesArr = data.slice(0, 5).map((item: {url: string}) => item.url);
                    let firstImageId = '';
                    imagesArr.forEach((item: string, index: number) => {
                        setImages((prevState) => [...prevState, item]);

                        if (index === 0) {
                            firstImageId = getIdFromImageUrl(item);
                        } 
                    })
                    return firstImageId;
                })   
                .then((id: string) => {
                    return getImageDetails(id);
                })
                .then((data) => {
                    setInfo({
                        id: data.breeds[0].id,
                        description: data.breeds[0].description, 
                        name: data.breeds[0].name,
                        temperament: data.breeds[0].temperament, 
                        origin: data.breeds[0].origin, 
                        weight: { metric: data.breeds[0].weight.metric },
                        life_span: data.breeds[0].life_span
                    });
                    setIsLoading(false);
                })
            } catch (error) {
                console.error('Error:', error);
              }     
        }
    }, []);



    const handleImageChange = (index: number) => {
        setImageNumber(index);
    }


return <section className={styles['breeds-section']}>
        <SectionHeader />
        <div className={styles['breeds-container']}>
            <div className={styles['title-wrapper']}>
                <BackButton></BackButton>
                <div className={styles['section-title']}>BREEDS</div>
                <div className={styles['section-id']}>{info.id}</div>
            </div>
 
            {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
            {!isLoading && <div>
            <div className={styles['image-wrapper']}>
                <img src={images[imageNumber]} alt="cat image" className={styles.image}/>
                <Pagination count={5} active={imageNumber} setPagination={handleImageChange}/>
            </div>

            <BreedInfo info={info}></BreedInfo>
            </div>}

        </div>
    </section>
}

export default DetailPage;