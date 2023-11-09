import styles from './LoaderSpinner.module.scss';


const LoaderSpinner:React.FC<{small?: boolean}> = (props) => {
    return  <div className={styles['loader-container']}>
        <div className={`${styles.loader} ${props.small ? styles.small : ''}`}></div>
    </div>
}


export default LoaderSpinner;