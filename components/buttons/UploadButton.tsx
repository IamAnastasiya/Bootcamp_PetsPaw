import styles from './UploadButton.module.scss'
import { useDispatch } from 'react-redux';
import  { modalActions }  from '../../store/modal-slice';

const UploadButton = () => {

    const dispatch = useDispatch();

    const handleModal = () => {     
        dispatch(modalActions.toggleVisibility());
    }

    return <button className={styles.upload} onClick={handleModal}>UPLOAD</button>
}

export default UploadButton;