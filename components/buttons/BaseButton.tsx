import Link from "next/link";
import { ReactNode } from 'react';
import styles from "./BaseButton.module.scss";

interface ButtonConfig {
    link?: boolean; 
    mode: string; 
    href?: string, 
    icon?: string; 
    children?: ReactNode; 
    active?: boolean;
    onClick?: () => void;
}


const BaseButton:React.FC<ButtonConfig> = (props) => {
    const classes = `${styles[`${props.mode}`]} ${props.icon ? styles[`${props.icon}`] : ''} ${props.active ? styles.active : ''}`.trim();
    
    return <>
        {!props.link && <button className={classes} onClick={props.onClick}>{props.children}</button>}
        {props.link &&<Link href={props.href || ''} className={classes}>{props.children}</Link>}
    </>
}

export default BaseButton;