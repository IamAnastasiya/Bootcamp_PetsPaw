import GridLayout from "@/components/layout/GridLayout";
import styles from './LikesPage.module.scss';
import BackButton from "@/components/buttons/BackButton";

import ImageData from '../../models/ImageData';
import { getAllVotes } from "@/services/votes-api";


const LikesPage:React.FC<{likes: ImageData[], hasError: boolean}>  = (props) => {

    return <div className={styles.container}>
        <div className={styles['title-wrapper']}>
            <BackButton></BackButton>
            <div className={styles['section-title']}>LIKES</div>
        </div>                
        {(props.likes.length !== 0 || props.hasError) && <GridLayout 
            limit={60} 
            images={props.likes} 
            error={props.hasError}
        ></GridLayout>}
        {!props.likes.length && ! props.hasError && <div className={styles['empty-text']}>No item found</div>}
    </div>
}



export async function getServerSideProps(context: {req: {headers: {cookie: string}}}) {

    const cookies = context.req.headers.cookie;
    const userIdMatch = cookies.match(/userId=([^;]+)/);
    let hasError = false;
    let likesFetched: ImageData[] = [];

    if (userIdMatch) {
        const userId = userIdMatch[1];

        try {
            const response = await getAllVotes(userId);
            if (response.status !== 200) {
                hasError = true;
            } else {
                const data = await response.json();
                if (data && data.length) {
                    likesFetched = data.filter((item: ImageData) => item.value === 1);
                }
            }
        } catch (error) {
            console.warn('Error in API request:', error);
            hasError = true;
        }
    }

    return {
        props: {
            likes: likesFetched,
            hasError: hasError,
        }
    };
}

export default LikesPage;