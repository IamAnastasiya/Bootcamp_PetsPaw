import styles from './VotingLog.module.scss';
import {getCurrentTime, capitalize} from '../../helpers/helpers';


const VotingLog:React.FC<{id: string; action: string; category: string}> = (props) => {

const actionTime = getCurrentTime();    
const logActionText = ` was ${props.action === 'add' ? 'added to' : 'removed from'} ${capitalize(props.category)}`;
const iconPath = `/icons/${props.category}-20-icon.svg`;


return <div className={styles['log-wrapper']}>
        <span className={styles['log-time']}>{actionTime}</span>
        <span className={styles['log-name']}>Image ID: <span className={styles.bold}>{props.id}</span>{logActionText}</span>
        {/* {props.action === 'add' && <span className={styles.icon}><img src={iconPath} alt={`${props.category} icon`} /></span>} */}
        {props.action === 'add' && <img className={styles.icon} src={iconPath} alt={`${props.category} icon`} />}
</div>

}

export default VotingLog;