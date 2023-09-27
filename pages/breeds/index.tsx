import MainNavigation from "@/components/layout/MainNavigation";
import { useEffect, useState, useRef } from 'react';

import Logo from "@/components/layout/Logo";
import ActionsHeader from "@/components/ui/ActionsHeader";
import SelectList from "../../components/ui/SelectList";
import BaseButton from "@/components/ui/BaseButton";
import styles from './BreedsPage.module.scss';
import GridLayout from "@/components/layout/GridLayout";


const BreedsPage = () => {
    const [breeds, setBreeds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [limit, setLimit] = useState(5);
    const shoudGetAllBreeds = useRef(true);     // to prevent duplicated useEffect running for the initial render
    const limits = ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'];
    const url = `https://api.thecatapi.com/v1/breeds`;
    const api_key = "live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX";

    const images = [
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' },
        { url: '/images/test-image.png' }
    ];


    useEffect(() => {
        if (shoudGetAllBreeds.current) { 
            shoudGetAllBreeds.current = false;
            const fetchData = async () => {
            try {
                const response = await fetch(url, {headers: {'x-api-key': api_key}})
                const jsonData = await response.json();
                console.log(jsonData);
                const breedsArr = jsonData.map((item: {name: string}) => item.name)
                setBreeds(breedsArr);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
            };
        
            fetchData();
        }
    }, []);

    return <>
    {/* <div className={styles.wrapper}> */}
        {/* <section className={styles["left-section"]}>
            <header className={styles.header}>
                <Logo/>
            </header>
            <MainNavigation page="breeds"></MainNavigation>
        </section> */}
       
        <section>
            <ActionsHeader></ActionsHeader>
            <div className={styles['breeds-container']}>
                <div className={styles['title-wrapper']}>
                    <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>BREEDS</div>
                    <SelectList options={breeds} defaultText="All breeds" width={226} bgColor="gray"></SelectList>
                    <div>
                        <SelectList options={limits} width={101} bgColor="gray"></SelectList>
                        <button className={styles['filter-ZA']}></button>
                        <button className={styles['filter-AZ']}></button>
                    </div>
                </div>

                <GridLayout images={images} limit={30} coverMode="breed"></GridLayout>
            </div>


        </section>

    {/* </div> */}
    </>
}

export default BreedsPage;



