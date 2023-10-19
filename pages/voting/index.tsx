import { getRandomImage, sendImageVote } from "@/services/votes-api";
import { addToApiFavorites } from "@/services/favorites-api";

import ActionLog from '../../components/action-log/ActionLogLog';
import SectionHeader from "@/components/header/SectionHeader";
import ActionsBar from "@/components/voting-actions/ActionsBar";
import BackButton from "@/components/buttons/BackButton";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './VotingPage.module.scss';


import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import { useState, useEffect, useRef } from 'react';
import  { logsActions } from '../../store/userLogs-slice';


const VotingPage = () => {

    const userId = useSelector((state: RootState) => state.userId);
    const votingLog = useSelector((state: RootState) => state.userLogs.votingLog);

    const dispatch = useDispatch();

    const [pet, setPet] = useState({url: '', id: ''});
    const [nextPet, setNextPet] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render

    useEffect(() => {
        setIsLoading(true);
        if (shoudGetCategoryCounts.current) { 
            shoudGetCategoryCounts.current = false;
            getRandomImage().then(data => {
                setPet(data);
                setIsLoading(false);
            });
        }
    }, [nextPet])

    const showNext = (category: string) => {
        const newVotingLogItem = { id: pet.id, action: 'add', category: category };
        dispatch(logsActions.addToVotingLog(newVotingLogItem))
        shoudGetCategoryCounts.current = true;
        setNextPet((prevState) => prevState = !prevState);
        category === 'favorite' ? setAsFavorite() : sendVote(category);
    }

    const sendVote = (category: string) => {
        sendImageVote({
            "image_id": pet.id,
            "sub_id": userId.id,
            "value": category === 'likes' ? 1 : -1
        });
    }

    const setAsFavorite = () => {
        try {
            addToApiFavorites({"image_id": pet.id, "sub_id": userId.id})
   
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }


    return <>
        <section className={styles.wrapper}>
            <SectionHeader/>
            <div className={styles['voting-container']}>
                <div className={styles['title-wrapper']}>
                     <BackButton></BackButton>
                    <div className={styles['section-title']}>VOTING</div>
                </div>
                <div className={styles['image-wrapper']}>
                    {!isLoading && <img src={pet.url} alt="cat"/>}v
                    {isLoading && <LoaderSpinner></LoaderSpinner>}
                    <ActionsBar onClick={showNext}></ActionsBar>
                </div>

                {votingLog.map(info => (
                    <ActionLog key={info.id} id={info.id} action={info.action} category={info.category}></ActionLog>
                ))}
            </div>
        </section>
        </>
}

export default VotingPage;