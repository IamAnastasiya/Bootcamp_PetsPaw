import styles from './BreedInfo.module.scss';
import BreedData from '@/models/BreedData';


const BreedInfo:React.FC<{info: BreedData}> = (props) => {


    return <div className={styles.wrapper}>
        <span className={styles.title}>{props.info.name}</span>
        <p className={styles.mission}>{props.info.description}</p>
        <div className={styles.details}>
            <div className={styles['details-column']}>
                <div className={styles['category-title']}>Temperament:</div>
                <div>{props.info.temperament}</div>
            </div>
            <div className={styles['details-column']}>
                <div><span className={styles['category-title']}>Origin: </span>{props.info.origin}</div>
                <div><span className={styles['category-title']}>Weight: </span>{props.info.weight.metric} kg</div>
                <div><span className={styles['category-title']}>Life span: </span>{props.info.life_span} years</div>
            </div>
        </div>

    </div>

}


export default BreedInfo;