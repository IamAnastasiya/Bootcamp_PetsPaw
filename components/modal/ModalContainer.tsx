import styles from './ModalContainer.module.scss';
import Link from "next/link";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice';

const ModalContainer = () => {

    const [uploadStatus, setUploadStatus] = useState('new');
    // const [file, setFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState('');
    const [fileName, setFileName] = useState('');

    // useEffect(() => {
    //     const fileReader = new FileReader();
    //     fileReader.addEventListener('load', (event) => {
    //         setImageSrc(event.target.result);
    //       });
    //       fileReader.readAsDataURL(file);
    //   }, [file]);

    const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const selectedFile = event.target.files && event.target.files[0];
        if (selectedFile) {
            console.log(selectedFile);
            if (selectedFile.type && selectedFile.type.indexOf('image') === -1) {
                console.log('File is not an image.');
                return;
            }
    
            setUploadStatus('upload');

            const fileReader = new FileReader();
            fileReader.addEventListener('load', (event) => {
              if (event.target) {
                  setFileName(selectedFile.name);
                  setImageSrc(event.target.result as string);
                }
            });
            fileReader.readAsDataURL(selectedFile);
          }

         
    }

    
    // const dispatch = useDispatch();
    // const modal = useSelector((state: RootState) => state.modal);

    const cancelModalHandler = () => {
        // dispatch(modalActions.toggleVisibility());
    }

    return (
        <>
            {/* <div className={`${styles.backdrop} ${modal.isVisible && styles.visible}`} onClick={cancelModalHandler}></div>
            <div className={`${styles.modal} ${modal.isVisible && styles.visible}`} id="open-modal">     */}

            {/* <div className={`${styles.backdrop} ${styles.visible}`} onClick={cancelModalHandler}></div>
            <div className={`${styles.modal} ${styles.visible}`} id="open-modal">     */}

            <div className={`${styles.backdrop}`} onClick={cancelModalHandler}></div>
            <div className={`${styles.modal}`} id="open-modal">  
                <button className={styles.cross}></button>
                <h2 className={styles.title}>Upload a .jpg or .png Cat Image</h2>
                <p className={styles['guidelines-text']}>Any uploads must comply with the 
                    <Link href='https://thecatapi.com/privacy' target="_blank"> upload guidelines </Link>
                 or face deletion.</p>
                <form className={styles['drag-area']} style={{ display: uploadStatus === 'new' ? 'block' : 'none' }}>
                    <label className={styles['modal-text']}><span>Drag here</span> your file or <span>Click here</span> to upload</label>
                    <input type="file" accept="image/*" onChange={onFileSelect}/>
                </form>
                {uploadStatus === "new" && <p className={styles['modal-text']}>No file selected</p>}
                {uploadStatus === "upload" && <div className={styles['img-area']}><img src={imageSrc} alt="" /></div>}
                {uploadStatus === "upload" && <p className={styles['modal-text']}>Image File Name: {fileName}</p>}

                {uploadStatus === "upload" && <button className={styles['upload-btn']}>UPLOAD PHOTO</button>}

            </div>
        </>
    )
}

export default ModalContainer;