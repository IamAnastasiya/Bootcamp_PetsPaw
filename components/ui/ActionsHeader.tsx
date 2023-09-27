import BaseButton from "./BaseButton";
import SearchBar from "./SearchBar";
import styles from './ActionsHeader.module.scss';
import { useRouter } from 'next/router';


const ActionsHeader = () => {
    const router = useRouter();

    return <div className={styles['header-wrapper']}>
        <div className={styles.menu}>
            <BaseButton mode="header-btn" icon="menu"></BaseButton>
        </div>

        <div className={styles['search-wrapper']}>
            <SearchBar></SearchBar>
        </div>


        <div className={styles['btns-wrapper']}>
            <BaseButton 
                link={true} 
                href="/likes" 
                mode="header-btn" 
                icon="likes" 
                active={router.route === '/likes'}>
            </BaseButton>

            <BaseButton 
                link={true} 
                href="/favorites" 
                mode="header-btn" 
                icon="favorites" 
                active={router.route === '/favorites'}>
            </BaseButton>

            <BaseButton 
                link={true} 
                href="/dislikes" 
                mode="header-btn" 
                icon="dislikes" 
                active={router.route === '/dislikes'}>
            </BaseButton>
        </div>
    </div>
}

export default ActionsHeader;