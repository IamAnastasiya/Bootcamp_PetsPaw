import MainNavigation from "@/components/layout/MainNavigation";
import Logo from "@/components/layout/Logo";
import VotingLog from '../../components/voting/VotingLog';
import ActionsHeader from "@/components/ui/ActionsHeader";
import ActionsBar from "@/components/voting/ActionsBar";
import BaseButton from "@/components/ui/BaseButton";
import LoaderSpinner from "@/components/ui/LoaderSpinner";
import styles from './VotingPage.module.scss';



import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import { useState, useEffect, useRef } from 'react';
import  { favoritesActions } from '../../store/favorites-slice';

interface VotingLogItem {
    id: string;
    action: string;
    category: string;
}

const VotingPage = () => {

    const userId = useSelector((state: RootState) => state.userId);
    // const favorites = useSelector((state: RootState) => state.favorites);
    // console.log(favorites);

    const dispatch = useDispatch();
    const [pet, setPet] = useState({url: '', id: ''});
    const [nextPet, setNextPet] = useState(false);
    const [votingLog, setVotingLog] = useState<VotingLogItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render

    useEffect(() => {
        if (shoudGetCategoryCounts.current) { 
            shoudGetCategoryCounts.current = false;
            const fetchData = async () => {
                const data = await fetch('https://api.thecatapi.com/v1/images/search');
                const json = await data.json();
                setPet(json[0]);
                setIsLoading(false);
            }
            fetchData();
        }
    }, [nextPet])

    const showNext = (category: string) => {
        const newVotingLogItem = { id: pet.id, action: 'add', category: category };
        setVotingLog(prevVotingLog => [...prevVotingLog, newVotingLogItem]);
        shoudGetCategoryCounts.current = true;
        setNextPet((prevState) => prevState = !prevState);
        if (category === 'favorite') {
            addToFavorites();
        } else {
            sendVote(category);
        }


    }

    const sendVote = async (category: string) => {
        const imageData = {
            "image_id": pet.id,
            "sub_id": userId.id,
            "value": category === 'likes' ? 1 : -1
        }
        let response = await fetch('https://api.thecatapi.com/v1/votes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              'x-api-key': 'live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX'
            },
            body: JSON.stringify(imageData)
        });
        await response.json();
    }

    const addToFavorites = async () => {
        
        const imageData = { 
            "image_id": pet.id,
            "sub_id": userId.id
        };

        try {
            let newFavourite = await fetch("https://api.thecatapi.com/v1/favourites", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'x-api-key': 'live_cJJq1XRJPGRYOvxTVW06i3PHF4q1JaUX38KGzQvFtLdSRg9nOTnyUJJUUUNT0AUX'
                },
                body: JSON.stringify(imageData)
            });
            if (newFavourite.status === 200) {
                const result = await newFavourite.json();
                dispatch(favoritesActions.addToFavorites({favId: result.id.toString(), imageId: pet.id}));
                
            } else {
                console.error('Error adding to favorites:', newFavourite.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }

    }



    return <>
        {/* <section className={styles["left-section"]}>
            <header className={styles.header}>
                <Logo/>
            </header>
            <MainNavigation page="voting"></MainNavigation>
        </section> */}


        <section className={styles.wrapper}>
            <ActionsHeader></ActionsHeader>
            <div className={styles['voting-container']}>
                <div className={styles['title-wrapper']}>
                     <BaseButton link={true} href="/" mode="back-btn"></BaseButton>
                    <div className={styles['section-title']}>VOTING</div>
                </div>
                <div className={styles['image-wrapper']}>
                    {!isLoading && <img src={pet.url} alt="cat"/>}
                    {isLoading && <LoaderSpinner></LoaderSpinner>}
                    <ActionsBar onClick={showNext}></ActionsBar>
                </div>

                {votingLog.map(info => (
                    <VotingLog key={info.id} id={info.id} action={info.action} category={info.category}></VotingLog>
                ))}
            </div>
        </section>

        </>
}

export default VotingPage;