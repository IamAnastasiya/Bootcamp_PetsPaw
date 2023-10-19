import styles from './ModalContainer.module.scss';
import Link from "next/link";

import LoaderSpinner from "@/components/loader/LoaderSpinner";
import { sendNewImage } from '../../services/gallery-api';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice'; 


const ModalContainer = () => {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);
    const userId = useSelector((state: RootState) => state.userId);
    
    
    const [uploadStatus, setUploadStatus] = useState('new');
    const [file, setFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState('');
    const [fileName, setFileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();

        const selectedFile = event.target.files && event.target.files[0];
        if (!selectedFile) return;

        if (selectedFile.type && selectedFile.type.indexOf('image') === -1) {
            console.log('File is not an image.');
            return;
        }

        setUploadStatus('upload');

        const fileReader = new FileReader();
        fileReader.addEventListener("load", (event) => {
            if (event.target) {
                setFileName(selectedFile.name);
                setFile(selectedFile);
                setImageSrc(event.target.result as string);
            }
        });

        fileReader.readAsDataURL(selectedFile); 
    }


    const onUploadHandler = () => {
        setIsLoading(true);
        if (file) {
            console.log(file);
            try {sendNewImage(file, userId.id).then(data => {
                if (data.ok) {
                    setUploadStatus('success');
                } else {
                    const errorResponse = data.json();
                    setUploadStatus('error');
                    console.error('Network Error:', errorResponse);
                }
                setIsLoading(false);
            })
            
            } catch(error) {
                setUploadStatus('error');
                console.error('Network Error:', error);
                setIsLoading(false);
            }
        }
    }

    const cancelModalHandler = () => {
        dispatch(modalActions.toggleVisibility());
    }

    return (<>
            <div className={`${styles.backdrop} ${modal.isVisible && styles.visible}`} onClick={cancelModalHandler}></div>
            <div className={`${styles.modal} ${modal.isVisible && styles.visible}`} id="open-modal">    
                <button className={styles.cross} onClick={cancelModalHandler}></button>
                <h2 className={styles.title}>Upload a .jpg or .png Cat Image</h2>
                <p className={styles['guidelines-text']}>Any uploads must comply with the 
                    <Link href='https://thecatapi.com/privacy' target="_blank"> upload guidelines </Link> or face deletion.</p>
                {(uploadStatus === "new" || uploadStatus === "success") && <form className={`${styles['drag-area']} `}>
                    <label className={styles['modal-text']}><span>Drag here</span> your file or <span>Click here</span> to upload</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        onChange={onFileSelect} 
                        onClick={() => (setUploadStatus('new'))}/>
                      
                </form>}
                {(uploadStatus === "new" || uploadStatus === "success") && <p className={styles['modal-text']}>No file selected</p>}

                {(uploadStatus === "upload" || uploadStatus === "error") &&
                     <div className={`${styles['img-area']} ${uploadStatus === "error" ? styles.rejected : ''}`}>
                        <img src={imageSrc} alt="" />
                </div>}
                {uploadStatus === "upload" && <p className={styles['modal-text']}>Image File Name: {fileName}</p>}

                {uploadStatus === "upload" && <button className={styles['upload-btn']} onClick={onUploadHandler}>UPLOAD PHOTO</button>}
                {isLoading && <div className={styles['loader-wrapper']}><LoaderSpinner /></div>}
                {uploadStatus === "success" && <p className={styles['success-text']}>Thanks for the Upload - Cat found!</p>}
                {uploadStatus === "error" && <p className={styles['error-text']}>No cat found - try a different one</p>}
            </div>
        </>)
}

export default ModalContainer;