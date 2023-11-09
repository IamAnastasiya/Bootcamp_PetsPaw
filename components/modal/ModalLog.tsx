import styles from './ModalLog.module.scss';


const ModalLog:React.FC<{result: string}> = (props) => {


return <>
    {props.result === "success" && <div className={styles['success-text']}>Thanks for the Upload - Cat found!</div>}
    {props.result === "error" && <div className={styles['error-text']}>No cat found - try a different one</div>}
    {props.result === "wrong-format" && <div className={styles['error-text']}>Only .jpg or .png files are accepted</div>}
    </>
}

export default ModalLog;