import styles from './BreedInfo.module.scss';


const BreedInfo = () => {


    return <div className={styles.wrapper}>
        <p className={styles.title}>Basenji</p>
        <p className={styles.mission}>Family companion cat</p>
        <div className={styles.details}>
            <div className={styles['details-column']}>
                <div className={styles['category-title']}>Temperament:</div>
                <div>Active, Energetic, Independent, Intelligent, Gentle</div>
            </div>
            <div className={styles['details-column']}>
                <div><span className={styles['category-title']}>Origin: </span>United States</div>
                <div><span className={styles['category-title']}>Weight: </span>3 - 5 kg</div>
                <div><span className={styles['category-title']}>Life span: </span>14 - 15 years</div>
            </div>
        </div>

    </div>

}


export default BreedInfo;