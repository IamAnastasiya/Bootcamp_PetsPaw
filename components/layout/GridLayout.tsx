import styles from './GridLayout.module.scss';
import Link from "next/link";
import Image from '../../models/Image';
import { useRouter } from 'next/router';

interface gridConfig {
    images?: Image[]; 
    limit: number | 100; 
    coverMode?: "breed" | "fav"; 
    onFavoriteUpdate?: (id: string) => void,
}

const GridLayout:React.FC< gridConfig > = (props) => {


    const limitedImages = props.images ? props.images!.slice(0, props.limit) : [];

       return <div className={styles["grid-layout"]}>
        {limitedImages.map((item, index) => {
           return (
            <div key={item.image_id} className={styles["grid-item"]}>
              {props.coverMode === "breed" ? (
                <Link href={`breeds/${item.breeds!.breedId}`}>
                    <img src={item.image.url} alt={`Image ${index}`} />
                    <div className={styles["grid-cover"]}>
                        <p className={styles["cover-content"]}>{item.breeds!.name}</p>
                    </div>
                </Link>
              ) : (
                <>
                  <img src={item.image.url} alt={`Image ${index}`} />
                  {props.coverMode && <div className={styles["grid-cover"]}>
                    <div 
                      className={`${styles["cover-content"]} ${styles.fav} ${item.isFav ? styles['is-favorite'] : ''}`} 
                      onClick={() => props.onFavoriteUpdate!(item.image_id)}
                    ></div>
                    
                  </div>}
                </>
              )}
            </div>
          );
        })}
      </div>
};


export default GridLayout;
