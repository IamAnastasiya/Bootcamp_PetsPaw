import Link from "next/link";
import { ReactNode } from 'react';
import styles from "./BaseButton.module.scss";


const BaseButton:React.FC<{link?: boolean; mode: string; href: string, icon?: string; children?: ReactNode; active?: boolean}> = (props) => {
    const classes = `${styles[`${props.mode}`]} ${props.icon ? styles[`${props.icon}`] : ''} ${props.active ? styles.active : ''}`.trim();
    
    return <>
        {!props.link && <button className={classes}>{props.children}</button>}
        {props.link &&<Link href={props.href || ''} className={classes}>{props.children}</Link>}
    </>
}

export default BaseButton;