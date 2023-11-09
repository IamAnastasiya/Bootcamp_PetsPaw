import GridLayout from "@/components/layout/GridLayout";
import BackButton from "@/components/buttons/BackButton";
import styles from './DislikesPage.module.scss';

import ImageData from '../../models/ImageData';
import { getAllVotes } from "@/services/votes-api";

const DislikesPage:React.FC<{dislikes: ImageData[], hasError: boolean}>  = (props) => {

    return <div className={styles.container}>
        <div className={styles['title-wrapper']}>
            <BackButton></BackButton>
            <div className={styles['section-title']}>DISLIKES</div>
        </div>                
        {(props.dislikes.length !== 0 || props.hasError) && <GridLayout 
            limit={60} 
            images={props.dislikes} 
            error={props.hasError}
        ></GridLayout>}
        {!props.dislikes.length && ! props.hasError && <div className={styles['empty-text']}>No item found</div>}
    </div>
}



export async function getServerSideProps(context: {req: {headers: {cookie: string}}}) {

    const cookies = context.req.headers.cookie;
    const userIdMatch = cookies.match(/userId=([^;]+)/);
    let hasError = false;
    let disLikesFetched: ImageData[] = [];

    if (userIdMatch) {
        const userId = userIdMatch[1];

        try {
            const response = await getAllVotes(userId);
            if (response.status !== 200) {
                hasError = true;
            } else {
                const data = await response.json();
                if (data && data.length) {
                    disLikesFetched = data.filter((item: ImageData) => item.value === -1);
                }
            }
        } catch (error) {
            console.warn('Error in API request:', error);
            hasError = true;
        }
    }

    return {
        props: {
            dislikes: disLikesFetched,
            hasError: hasError,
        }
    };
}

export default DislikesPage;