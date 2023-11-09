import styles from './ModalContent.module.scss';
import Link from "next/link";

import LoaderSpinner from "@/components/loader/LoaderSpinner";
import { sendNewImage } from '../../services/gallery-api';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice'; 
import ModalLog from './ModalLog';


const ModalContent = () => {

    const dispatch = useDispatch();
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
            if (!fileName.includes('.png') && !fileName.includes('.jpg')) {
                setUploadStatus('wrong-format');
                return;
            }

            try {sendNewImage(file, userId).then(data => {
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
            <button className={styles.cross} onClick={cancelModalHandler}></button>
            <h2 className={styles.title}>Upload a .jpg or .png Cat Image</h2>
            <p className={styles.text}>Any uploads must comply with the 
                <Link href='https://thecatapi.com/privacy' target="_blank"> upload guidelines </Link>
            or face deletion.</p>

            {(uploadStatus === "new" || uploadStatus === "success") && <form className={`${styles['drag-area']} `}>
                <label className={styles.text}><span>Drag here</span> your file or <span>Click here</span> to upload</label>
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={onFileSelect} 
                    onClick={() => (setUploadStatus('new'))}/>
            </form>}


            {(uploadStatus === "upload" || uploadStatus === "error" || uploadStatus === "wrong-format") && imageSrc &&
                    <div className={`${styles['img-area']} ${(uploadStatus === "error" || uploadStatus === "wrong-format") ? styles.rejected : ''}`}>
                    <Image src={imageSrc} alt="" priority width={640} height={320}/>
            </div>}

            {(uploadStatus === "new" || uploadStatus === "success") && <p className={styles.text}>No file selected</p>}
            {uploadStatus === "upload" && <p className={styles.text}>Image File Name: {fileName}</p>}

            {uploadStatus === "upload" && <button className={styles['upload-btn']} 
                onClick={onUploadHandler}>
                {isLoading && <LoaderSpinner small/>}
                UPLOAD PHOTO
            </button>}
            
            <ModalLog result={uploadStatus}/>
        </>)
}

export default ModalContent;