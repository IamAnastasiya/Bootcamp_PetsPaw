import { getRandomImage, sendImageVote } from "@/services/votes-api";
import { addToApiFavorites } from "@/services/favorites-api";

import ActionLog from '../../components/action-log/ActionLogLog';
import ActionsBar from "@/components/voting-actions/ActionsBar";
import BackButton from "@/components/buttons/BackButton";
import BaseButton from "@/components/buttons/BaseButton";
import LoaderSpinner from "@/components/loader/LoaderSpinner";
import styles from './VotingPage.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import { useState, useEffect } from 'react';
import  { logsActions } from '../../store/userLogs-slice';
import Image from 'next/image'


const VotingPage = () => {

const userId = useSelector((state: RootState) => state.userId);
const votingLog = useSelector((state: RootState) => state.userLogs.votingLog);

const dispatch = useDispatch();

const [pet, setPet] = useState({url: '', id: ''});
const [nextPet, setNextPet] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
    setIsLoading(true);
    getRandomImage().then(data => {
        if (!data) {
            setError(true);
        } else {
            setPet(data);
        }
    }).catch((err) => {
        setError(true);
    })
    .finally(() => {
    setIsLoading(false);
    });
}, [nextPet])


const showNext = (category: string) => {
    const newVotingLogItem = { id: pet.id, action: 'add', category: category };
    dispatch(logsActions.addToVotingLog(newVotingLogItem))
    setNextPet((prevState) => prevState = !prevState);
    category === 'favorite' ? setAsFavorite() : sendVote(category);
}


const sendVote = (category: string) => {
    sendImageVote({
        "image_id": pet.id,
        "sub_id": userId,
        "value": category === 'likes' ? 1 : -1
    });
}

const setAsFavorite = () => {
    try {
        addToApiFavorites({"image_id": pet.id, "sub_id": userId})

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

const handleErrorCase = () => {
    setError(false);
    setNextPet((prevState) => prevState = !prevState);
}


if (error) {
    return <div className={styles['error-wrapper']}>
        <span className={styles.error}>Something went wrong, please try again</span>
        <BaseButton mode="action-button" onClick={handleErrorCase}></BaseButton>
    </div>
}


return  <div className={styles.container}>
            <div className={styles['title-wrapper']}>
                <BackButton></BackButton>
                <div className={styles['section-title']}>VOTING</div>
            </div>
            <div className={styles['image-wrapper']}>
                {!isLoading && pet.url && <Image src={pet.url} alt="cat" width={600} height={360} priority={true}/>}
                {isLoading && <LoaderSpinner/>}
                <ActionsBar onClick={showNext}></ActionsBar>
            </div>

            {votingLog.map(info => (
                <ActionLog key={info.id} id={info.id} action={info.action} category={info.category}></ActionLog>
            ))}
        </div>
}


export default VotingPage;