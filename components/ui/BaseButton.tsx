import Link from "next/link";
import { ReactNode } from 'react';
import styles from "./BaseButton.module.scss";

const BaseButton:React.FC<{link?: boolean; mode: string; href?: string, children: ReactNode;}> = (props) => {

    
    return <>
        {!props.link && <button className={styles[`${props.mode}`]}>{props.children}</button>}
        {props.link &&<Link href={props.href || ''} className={styles[`${props.mode}`]}>{props.children}</Link>}
    </>
}

export default BaseButton;