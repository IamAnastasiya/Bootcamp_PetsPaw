import Image from 'next/image';
import styles from './GridItem.module.scss';
import ImageData from '../../models/ImageData';

const GridItem:React.FC<{item: ImageData, index: number, coverMode?: string, onFavoriteUpdate?: (id: string) => void}> = (props) => {
       return <div className={styles.wrapper}>
            <Image 
                className={styles.image}
                src={props.item.image.url} 
                alt={`Image ${props.index}`} 
                priority 
                fill 
                sizes="(max-width: 420px) 100%"
            />

            {props.coverMode === "breed" && <div className={styles["grid-cover"]}>
                <p className={styles["cover-content"]}>{props.item.breeds!.name}</p>
            </div>}

            {props.coverMode === "fav" && <div className={styles["grid-cover"]}>
                <div 
                    className={`${styles["cover-content"]} ${styles.fav} ${props.item.isFav ? styles['is-favorite'] : ''}`} 
                    onClick={() => props.onFavoriteUpdate!(props.item.image_id)}>
                </div>
            </div>}
      </div>
};


export default GridItem;