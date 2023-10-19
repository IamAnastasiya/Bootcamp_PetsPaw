import { useRouter } from 'next/router';
import styles from './BackButton.module.scss';

const BackButton = () => {
    const router = useRouter()

    return <button className={styles['back-btn']} type="button" onClick={() => router.back()}></button>
}

export default BackButton;