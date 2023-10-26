import Link from "next/link";
import styles from './Logo.module.scss';
import Image from 'next/image';

const Logo = () => {
    return <Link href="/" className={styles["logo-wrapper"]}>
        <Image src="/images/paw-img.png" alt="paw image" width={24} height={24}/>
        <Image src="/images/logo-text.svg" alt="paw image" width={56} height={24}/>
    </Link>
}

export default Logo;