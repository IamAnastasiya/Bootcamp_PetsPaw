import styles from './BreedInfo.module.scss';
import BreedData from '@/models/BreedData';


const BreedInfo:React.FC<{info: BreedData}> = ({info}) => {


    return <div className={styles.wrapper}>
        <span className={styles.title}>{info.name}</span>
        <p className={styles.mission}>{info.description}</p>
        <div className={styles.details}>
            <div className={styles['details-column']}>
                <div className={styles['category-title']}>Temperament:</div>
                <div>{info.temperament}</div>
            </div>
            <div className={styles['details-column']}>
                <div><span className={styles['category-title']}>Origin: </span>{info.origin}</div>
                <div><span className={styles['category-title']}>Weight: </span>{info.weight.metric} kg</div>
                <div><span className={styles['category-title']}>Life span: </span>{info.life_span} years</div>
            </div>
        </div>

    </div>

}


export default BreedInfo;