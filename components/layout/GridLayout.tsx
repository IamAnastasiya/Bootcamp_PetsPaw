import styles from './GridLayout.module.scss';
import Link from "next/link";
import ImageData from '../../models/ImageData';
import GridItem from './GridItem';

interface gridConfig {
    images: ImageData[]; 
    limit: number | 100; 
    coverMode?: "breed" | "fav"; 
    onFavoriteUpdate?: (id: string) => void,
}

const GridLayout:React.FC< gridConfig > = ({images, limit, coverMode, onFavoriteUpdate}) => {
    const limitedImages = images ? images!.slice(0, limit) : [];

       return <div className={styles["grid-layout"]}>
            {limitedImages.map((item, index) => {
            return (
                <div key={item.image_id} className={styles["grid-item"]}>
                {coverMode === "breed" ? (
                    <Link href={`breeds/${item.breeds!.breedId}`} className={styles["grid-link"]}>
                        <GridItem index={index} coverMode={coverMode} item={item} onFavoriteUpdate={onFavoriteUpdate}/>
                    </Link>
                ) : (
                    <GridItem index={index} coverMode={coverMode || ''} item={item} onFavoriteUpdate={onFavoriteUpdate}/>
                )}
                </div>
            );
        })}
      </div>
};


export default GridLayout;
