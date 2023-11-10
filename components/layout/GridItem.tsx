import Image from 'next/image';
import styles from './GridItem.module.scss';
import ImageData from '../../models/ImageData';

interface GridItemConfig {
    item: ImageData, 
    index: number, 
    coverMode?: string, 
    onFavoriteUpdate?: (id: string) => void
}

const GridItem:React.FC<GridItemConfig> = ({item, index, coverMode, onFavoriteUpdate}) => {
       return <div className={styles.wrapper}>
            <Image 
                className={styles.image}
                src={item.image.url} 
                alt={`Image ${index}`} 
                priority 
                fill 
                sizes="(max-width: 420px) 100%"
            />

            {coverMode === "breed" && <div className={styles["grid-cover"]}>
                <p className={styles["cover-content"]}>{item.breeds!.name}</p>
            </div>}

            {coverMode === "fav" && <div className={styles["grid-cover"]}>
                <div 
                    className={`${styles["cover-content"]} ${styles.fav} ${item.isFav ? styles['is-favorite'] : ''}`} 
                    onClick={() => onFavoriteUpdate!(item.image_id)}>
                </div>
            </div>}
      </div>
};


export default GridItem;