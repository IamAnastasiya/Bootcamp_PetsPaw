import styles from './LoaderSpinner.module.scss';


const LoaderSpinner = () => {
    return  <div className={styles['loader-container']}>
    <div className={styles.loader}></div>
  </div>
}



export default LoaderSpinner;