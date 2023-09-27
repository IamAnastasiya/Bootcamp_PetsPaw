import styles from './UploadButton.module.scss'


const UploadButton = () => {

    const handleModal = () => {
        // dispatch(modalActions.toggleVisibility());
    }


    return <button className={styles.upload} onClick={handleModal}>UPLOAD</button>
}

export default UploadButton;