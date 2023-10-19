import BaseButton from "../buttons/BaseButton";
import SearchBar from "../search/SearchBar";
import styles from './SectionHeader.module.scss';
import { useRouter } from 'next/router';
// import  { RootState }  from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { mobileMenuActions } from "@/store/mobile-menu";


const ActionsHeader = () => {
    const router = useRouter();
    const dispatch = useDispatch();


    const handleMobileMenu = () => {
        dispatch(mobileMenuActions.toggleMenuVisibility())
    }

    return <div className={styles['header-wrapper']}>
        <div className={styles.menu}>
            <BaseButton mode="header-btn" icon="menu" onClick={handleMobileMenu}></BaseButton>
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