import Link from "next/link";
import styles from './Logo.module.scss';

const Logo = () => {
    return <Link href="/" className={styles["logo-wrapper"]}>
        <img src="/images/paw-img.png" alt="paw image" />
        <img src="/images/logo-text.svg" alt="paw image" />
    </Link>
}

export default Logo;