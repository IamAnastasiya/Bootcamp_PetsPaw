import styles from './ModalContainer.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import  { RootState }  from '../../store/index';
import  { modalActions }  from '../../store/modal-slice'; 

type Props = {
    children: React.ReactNode
  };


const ModalContainer:React.FC<Props> = ({children}) => {

    const dispatch = useDispatch();
    const modal = useSelector((state: RootState) => state.modal);

    const cancelModalHandler = () => {
        dispatch(modalActions.toggleVisibility());
    }

    return (<>
            <div className={`${styles.backdrop} ${modal.isVisible && styles.visible}`} onClick={cancelModalHandler}></div>
            <div className={`${styles.modal} ${modal.isVisible && styles.visible}`} id="open-modal">  
                {children}  
            </div>
        </>)
}

export default ModalContainer;