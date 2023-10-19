import styles from './UploadButton.module.scss'
import  { RootState }  from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import  { modalActions }  from '../../store/modal-slice';

const UploadButton = () => {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const handleModal = () => {     
        dispatch(modalActions.toggleVisibility());
    }


    return <button className={styles.upload} onClick={handleModal}>UPLOAD</button>
}

export default UploadButton;