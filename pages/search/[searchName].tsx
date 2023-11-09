// import ActionsHeader from "@/components/ui/ActionsHeader";
// import GridLayout from "@/components/layout/GridLayout";
// import LoaderSpinner from "@/components/ui/LoaderSpinner";
// import styles from './SearchPage.module.scss';
// import BackButton from "@/components/ui/BackButton";

// import Image from '../../models/Image';
// import { useRouter} from 'next/router';
// import  { RootState }  from '../../store/index';
// import { useSelector } from 'react-redux';
// import { getSetOfImages } from "@/services/api";
// import { useEffect, useState, useRef } from 'react';


// const SearchPage:React.FC<{searchBreed: string}> = (props) => {
//     const [images, setImages] = useState<Image[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     const router = useRouter();
//     const serachInput = router.query.searchName as string;

//     console.log(serachInput);

//     // const userId = useSelector((state: RootState) => state.userId);
//     const shoudGetCategoryCounts = useRef(true);      // to prevent duplicated useEffect running for the initial render

//     // useEffect(() => {
//     //     if (shoudGetCategoryCounts.current) { 
//     //         shoudGetCategoryCounts.current = false;
//             // getAllVotes(userId.id).then(data => {
//             //     data.forEach((item: Image) => {
//             //         item.value === 1 && setImages((prevState) => [...prevState, item]);      
//             //         setIsLoading(false);
//             // })
//     //    })
//     // }
//     // }, [])

//     return <section className={styles['search-section']}>
//         <ActionsHeader></ActionsHeader>
//         <div className={styles['search-container']}>
//                 <div className={styles['title-wrapper']}>
//                     <BackButton></BackButton>
//                     <div className={styles['section-title']}>SEARCH</div>
//                 </div>  
//                 <p className={styles['result-text']}>Search results for: "{props.searchBreed}"</p>              
//                 {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
//                 {images.length !== 0 && <GridLayout limit={1} images={images}></GridLayout>}
//                 <div className={styles['empty-text']}>No item found</div>
//             </div>
//     </section>
// }

// export default SearchPage;