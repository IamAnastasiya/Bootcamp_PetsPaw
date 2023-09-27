import styles from './GridLayout.module.scss';
import Link from "next/link";
import { useRouter } from 'next/router'


const GridLayout:React.FC<{images?: {url: string, id: string}[]; limit: number | 100; coverMode?: "breed" | "fav"; isFav?: boolean; deleteFromFav: (id: string) => {}}> = (props) => {

    // function showDetails() {
    //   const router = useRouter();
      // router.push('/' + props.id)
    // }


    const limitedImages = props.images ? props.images!.slice(0, props.limit) : [];
    const isFavorite = props.isFav ? styles['is-favorite'] : '';


    const removeFromFavorites = (id: string) => {
      props.deleteFromFav(id);
      console.log(`Removing image with id ${id}`);
    }

       return <div className={styles["grid-layout"]}>
        {limitedImages.map((image, index) => {
           return (
            <div key={index} className={styles["grid-item"]}>
              {props.coverMode === "breed" ? (
                <Link href="breeds/id">
                    <img src={image.url} alt={`Image ${index}`} />
                    <div className={styles["grid-cover"]}>
                        <p className={styles["cover-content"]}>Abyssinian</p>
                    </div>
                </Link>
              ) : (
                <>
                  <img src={image.url} alt={`Image ${index}`} />
                  {props.coverMode && <div className={styles["grid-cover"]}>
                    <div className={`${styles["cover-content"]} ${styles.fav} ${isFavorite}`} onClick={() => removeFromFavorites(image.id)}></div>
                  </div>}
                </>
              )}
            </div>
          );
        })}
      </div>
};


export default GridLayout;





// <Link href="breeds/id" key={index} className={styles["grid-item"]}>
// <img src={image.url} alt={`Image ${index}`} />
// <div className={styles["grid-cover"]}>
//   {props.coverMode === "breed" && <p className={styles["cover-content"]}>Abyssinian</p>}
//   {props.coverMode === "fav" && <div className={` ${styles["cover-content"]} ${styles.fav}`}></div>}
// </div>
// </Link>






















      {/* {limitedImages.length > 10 && (
        <div className={styles["grid-layout"]}>
          {limitedImages.slice(10).map((image, index) => (
            <div key={index} className={styles["grid-item"]}>
              <img src={image.url} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
      )} */}
